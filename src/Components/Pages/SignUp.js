import React, {Component} from 'react';
import '../../App.css';
import {Grid, Cell} from 'react-mdl';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";

import Gradient from "../Reusable/Gradient";
import BlueAppBg from "../Reusable/BlueAppBg";
import SignUpForm from "../Forms/SignUp";

import {createNewUser} from "../../redux/actions/userProgress";
import {setUserCookie} from '../../utils/authHelper';

import firebase from 'firebase';

class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        };
    }

    signUpNewUser = ({email, password, verifyPassword, firstName, lastName, userPhone, starterObj}) => {
        var newUser = null;
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                newUser = user;
                this.props.createNewUser({
                    user_email: email,
                    firebase_id: firebase.auth().currentUser.uid,
                    first_name: firstName,
                    last_name: lastName,
                    user_phone: userPhone,
                    user_progress: starterObj
                })
            })
            .then(() => firebase.auth().currentUser.sendEmailVerification())
            .then(() => {
                setUserCookie(this.props.cookies, {user: newUser})
                this.setState({redirect: '/splash'})
            })
    }

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
                            <SignUpForm onSubmit={this.signUpNewUser}/>
                        </Cell>
                    </Grid>
                </BlueAppBg>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createNewUser: (userObj) => {
            dispatch(createNewUser(userObj))
        }
    }
};

export default connect(null, mapDispatchToProps)(SignUpPage);
