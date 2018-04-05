import React from 'react';
import PropTypes from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';
import {Redirect} from 'react-router-dom';

class AuthRedirect extends React.Component {

    static propTypes = {
        // provided by react-cookie
        cookies: PropTypes.instanceOf(Cookies).isRequired,

        // provided by you
        ifLoggedIn: PropTypes.bool.isRequired,
        to: PropTypes.string.isRequired,
    };

    render() {
        const {cookies} = this.props;
        const firebase_id = cookies.get('firebase_id');
        const isLoggedIn = firebase_id != null;

        // if we're in an (un)desired state, then redirect
        if (isLoggedIn === this.props.ifLoggedIn) {
            return <Redirect to={this.props.to}/>
        }

        // otherwise render children
        else {
            // pass through any props we received to our children
            const children = React.Children.map(
                this.props.children, child => React.cloneElement(child, this.props)
            );
            return <div>{children}</div>
        }
    }
}

export default withCookies(AuthRedirect);