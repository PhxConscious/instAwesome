import React from 'react';
import PropTypes from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';
import firebase from 'firebase';
import {Spinner} from 'react-mdl';

import {dismissError} from '../../redux/actions/loadStatus';

// This is to import the possible actions we have to select from.
// They won't actually be activated unless they're requested via the 'load' prop.
//
// You can add more actions here if you want to load them via the DataProvider.
// Make sure you 1) import them, 2) add them to the actions object.
import {setCurrentValue} from "../../redux/actions/currentValues";
import {getUserProgress} from '../../redux/actions/userProgress';
import {getCompanyList} from '../../redux/actions/companyInfo';
import {getLmsContent} from '../../redux/actions/lmsContent';

const actions = {
    setFirebaseId: ({firebase_id}) => setCurrentValue("currentFbId", firebase_id),
    getUserProgress, getCompanyList, getLmsContent
};


// DataProvider wraps UI components.
//
// Its job is to call and dispatch the list of action creators described by the 'load' prop,
// and wait until the list of redux states described by the 'wait' prop is present.
//
// DataProvider will render a loading spinner by default, and will only call the wrapped
// UI components once all data has been retrieved.  This means that you don't need to defensively
// check for presence of data within your UI components, you can always assume that it will be there.
//
// This could be written as a general, open source component.  It was written to be more specific to the IAW
// app so that it would be more convenient to use (single import statement and string-based config).
//
// For a more general component check out:
// https://github.com/vacuumlabs/data-provider
class DataProvider extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props.load.forEach(actionName => {
            if (!actions[actionName]) throw new Error('DataProvider was provided an invalid action: ' + actionName)
        })

        // get initial counts
        const initialCounts = {};
        const reduxState = context.store.getState();
        for (let key of this.fulfilled_keys()) {
            const count = reduxState.loadStatus.fulfilledCounts[key] || 0;
            initialCounts[key] = count;
        }

        console.log({initialCounts});
        this.state = {
            allLoaded: false,
            unsubscribe: null,
            startedAt: null,
            initialCounts,
            errors: [],
        };
    }

    fulfilled_keys = () => this.props.waitFor.map(w => w + '_FULFILLED');
    rejected_keys = () => this.props.waitFor.map(w => w + '_REJECTED');

    errorsEncountered = () => {
        const reduxState = this.context.store.getState();
        const reduxErrors = reduxState.loadStatus.loadErrors;
        console.log({reduxErrors});

        // check for errors that match our watch list
        return reduxErrors.filter(e => {
            for (let key of this.rejected_keys()) {
                if (e.type === key) return true;
            }
            return false;
        });
    }

    // have all the counters we're watching been incremented?
    allLoaded = () => {
        const reduxState = this.context.store.getState();
        const fulfilled_keys = this.fulfilled_keys();
        const reduxFulfilled = reduxState.loadStatus.fulfilledCounts

        // check each counter
        console.log({fulfilled_keys, reduxFulfilled})
        for (let key of fulfilled_keys) {
            const initialCount = this.state.initialCounts[key];
            const count = reduxFulfilled[key] || 0;
            if (count <= initialCount) return false;
        }
        return true;
    }

    componentDidMount = () => {
        this.fetchData();
        this.subscribeToChanges();

        // If the user changed, change the cookie and fetch new data.
        // If there's no user, then hopefully we're wrapped in a redirect that will
        // detect the cookie change and redirect to login.
        if (this.props.reloadOnUserChange) {
            // this code might work... needs testing
            throw new Error('reloadOnUserChange not implemented!')
            //firebase.auth().onAuthStateChanged((user) => {
                //const {cookie} = this.props

                //// if it's the same userid we already had then don't do anything
                //if (cookie.get('firebase_id') === user.uid) return

                //// otherwise update the cookie and re-fetch data
                //cookie.set('firebase_id', user.uid)
                //if (user.uid) {
                    //this.fetchData();
                //}
            //});
        }
    };

    componentWillUnmount = () => {
        const unsubscribe = this.state.unsubscribe;
        if (unsubscribe != null) unsubscribe();
    };

    // These are the args that will be passed to every action which is called by the DataProvider.
    // These should be most args that an action would need to determine its behavior.  If you
    // need something not provided here, consider just passing it into the provider via props.
    getActionArgs = () => {
        const store = this.context.store;
        const firebase_id = this.props.cookies.get('firebase_id');
        const facebook_token = this.props.cookies.get('facebook_token');
        const redux_state = store.getState();
        const props = this.props;

        return {firebase_id, facebook_token, redux_state, props};
    }

    // initiate fetches for all requested data
    fetchData = () => {
        const store = this.context.store;
        const args = this.getActionArgs();

        // dispatch all actions requested by 'load' property
        this.props.load.forEach(
            actionName => {
                console.log(actionName)
                store.dispatch(actions[actionName](args))
            }
        );
    };

    dismissError = (id) => {
        this.props.store.dispatch(dismissError(id))
    }

    // default used if we were not passed a `onFailure` prop
    defaultRenderErrors = (errors, dismissError) => (
        <div className="errors">
            {errors.map(e => <div>{e.message}</div>)}
        </div>
    )

    subscribeToChanges = () => {
        // whenever state changes, check to see if all data we're concerned with has been loaded
        console.log('subscribing to store changes')
        const unsubscribe = this.context.store.subscribe(
            () => {
                const errors = this.errorsEncountered();
                if (errors.length > 0) {
                    return this.setState({errors});
                }

                const allLoaded = this.allLoaded();
                console.log('all loaded?', allLoaded)
                if (allLoaded) {
                    unsubscribe();
                    this.setState({allLoaded, unsubscribe: null});
                };
            }
        )
        this.setState({unsubscribe});
    };

    static propTypes = {
        // provided by react-cookie
        cookies: PropTypes.instanceOf(Cookies).isRequired,

        // provided by you :-)
        load: PropTypes.arrayOf(PropTypes.string).isRequired,
        waitFor: PropTypes.arrayOf(PropTypes.string).isRequired,
        reloadOnUserChange: PropTypes.bool,
        onFailure: PropTypes.func,
    };

    static contextTypes = {
        // The react-redux Provider component provides 'store' via context.
        // If you change the name of the store in Provider props you will also need to change this.
        store: PropTypes.object
    }

    render() {
        // if we got errors, and the error handler returned a formatted display, then render it
        if (this.state.errors.length > 0) {
            const renderErrors = this.props.onFailure || this.defaultRenderErrors;

            // give the provided error renderer the errors, as well as an action call to dismiss them by ID
            return this.state.renderErrors(this.state.errors, this.dismissError);
        }

        // if we're loaded then render children, otherwise display a loading graphic
        if (this.state.allLoaded) {
            return <div>{this.props.children}</div>
        } else {
            console.log('DataProvider rendering loading...')
            // TODO: replace 'loading...' with a spinner gif or other graphic of your choice
            return <Spinner/>
        }
    }
}

export default withCookies(DataProvider);
