import React, {Component} from 'react';
import {Grid, Cell} from 'react-mdl';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";

import '../../App.css';
import '../../Styles/SplashPageStyles..css';
import BlueAppBg from "../Reusable/BlueAppBg";
import SignUpForm from "../Forms/SignUp";

import {createNewUser} from "../../redux/actions/userProgress";
import {dismissErrorType} from "../../redux/actions/loadStatus";

import firebase from 'firebase';

class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        };
    }

    completeSignup = ({firstName, lastName, userPhone, starterObj}) => {
        const user = firebase.auth().currentUser;
        return this.props.createNewUser({
            user_email: user.email,
            firebase_id: user.uid,
            first_name: firstName,
            last_name: lastName,
            user_phone: userPhone,
            user_progress: starterObj
        })
        .then(() => {
            dismissErrorType('GET_USER_PROGRESS');
            // This is weird... updating redux should be synchronous but it's not.
            setTimeout(() =>
                this.setState({redirect: '/splash'}), 30);
        })
    };

    render() {
        const {redirect} = this.state;
        if (redirect) {
            return <Redirect to={redirect}/>;
        }

        return (
            <div className="App">
                <BlueAppBg>
                    <Grid className='pageCont'>
                        <Cell col={8} offsetDesktop={2} tablet={12} phone={12}>
                            <div className="splashText">{"Thanks for signing in!  Let's get a little more info from you before we continue."}</div>
                            <SignUpForm onSubmit={this.completeSignup} signupType='partial' />
                        </Cell>
                    </Grid>
                </BlueAppBg>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // return the axios promise so that we can call .then
        createNewUser: (userObj) => {
            const action = createNewUser(userObj);
            dispatch(action);
            return action.payload;
        },
        dismissErrorType: (type) => {
            dispatch(dismissErrorType(type));
        }
    }
};

export default connect(null, mapDispatchToProps)(SignUpPage);
