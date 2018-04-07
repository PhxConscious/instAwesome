import React, {Component} from 'react';
import {Grid, Cell} from 'react-mdl';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";

import '../../App.css';
import BlueAppBg from "../Reusable/BlueAppBg";
import SignUpForm from "../Forms/SignUp";

import {createNewUser} from "../../redux/actions/userProgress";

import firebase from 'firebase';

class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        };
    }

    completeSignup = ({firstName, lastName, userPhone, starterObj}) => {
        const user = firebase.auth().currentUser
        this.props.createNewUser({
            user_email: user.email,
            firebase_id: user.uid,
            first_name: firstName,
            last_name: lastName,
            user_phone: userPhone,
            user_progress: starterObj
        })
        .then(() => {
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
        createNewUser: (userObj) => {
            dispatch(createNewUser(userObj))
        }
    }
};

export default connect(null, mapDispatchToProps)(SignUpPage);
