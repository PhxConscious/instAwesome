import React from 'react';
import PropTypes from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';
import firebase from 'firebase';
import _ from 'lodash';
import {Spinner} from 'react-mdl';

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
    constructor(props) {
        super(props);
        this.props.load.forEach(actionName => {
            if (!actions[actionName]) throw new Error('DataProvider was provided an invalid action: ' + actionName)
        })
        this.state = {
            allLoaded: false,
            unsubscribe: null,
        };
    }

    // has all the redux data we're looking for been populated?
    allLoaded = () => {
        const state = this.context.store.getState();
        const waitFor = this.props.waitFor;

        // check all the keys in state to see if there's data there
        console.log({waitFor, state})
        for (let key of waitFor) {
            const val = _.get(state, key, undefined);
            console.log(key + ': ', val);
            if (_.isEmpty(val)) return false;
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

    fetchData = () => {
        const store = this.context.store;

        const firebase_id = this.props.cookies.get('firebase_id');
        const facebook_token = this.props.cookies.get('facebook_token');
        const redux_state = store.getState();
        const props = this.props;

        // These are the args that will be passed to every action which is called by the DataProvider.
        // These should be most args that an action would need to determine its behavior.  If you
        // need something not provided here, consider just passing it into the provider via props.
        const args = {firebase_id, facebook_token, redux_state, props};

        // dispatch all actions requested by 'load' property
        this.props.load.forEach(
            actionName => {
                console.log(actionName)
                store.dispatch(actions[actionName](args))
            }
        );
    };

    subscribeToChanges = () => {
        // whenever state changes, check to see if all data we're concerned with has been loaded
        console.log('subscribing to store changes')
        const unsubscribe = this.context.store.subscribe(
            () => {
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
    };

    static contextTypes = {
        // The react-redux Provider component provides 'store' via context.
        // If you change the name of the store in Provider props you will also need to change this.
        store: PropTypes.object
    }

    render() {
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
