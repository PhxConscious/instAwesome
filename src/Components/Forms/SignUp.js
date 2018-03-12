import React, { Component } from "react";
import firebase from 'firebase';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import starterObj from '../../config/starterUserProgressObject';
import Styles from '../../Styles/FormsStyles.css';
import { nextQuestion, createNewUser } from "../../redux/actions/userProgress";

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            userPhone: '',
            email: '',
            password: '',
            verifyPassword: '',
            redirect: false
        };
    }

    onButtonPress = () => {
        const { email, password, verifyPassword, firstName, lastName, userPhone } = this.state;
        if (email === '' || password === '') {
            return alert('Must fill in all fields')
        } else if (password !== verifyPassword) {
            return alert('Passwords do not match');
        } else if (password.length < 6) {
            return alert('password must be at least 6 characters long')
        }
        return (

            firebase.auth().createUserWithEmailAndPassword(email, password)
                // call action with the correct user object
                .then(user => {
                  this.props.createNewUser({
                  user_email: email,
                  firebase_id: firebase.auth().currentUser.uid,
                  first_name: firstName,
                  last_name: lastName,
                  user_phone: userPhone,
                  user_progress: starterObj
                  })
                })
                .then(this.setState({redirect: true}))
        )
    };

    handleInputTextChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/'/>;
        }

        return (
            <form className="formCont" action="#">
                <div className='inputCont'>
                    <div className='formTitleCont'>
                        <p className="formTitle">SIGN UP</p>
                    </div>
                    <div className="formInputCont">
                        <div>
                            <p className='inputLabel'>FIRST NAME</p>
                        </div>
                        <input
                            name='firstName'
                            className="formInput"
                            type="text"
                            onChange={this.handleInputTextChange}
                            placeholder=''
                            value={this.state.firstName}>
                        </input>
                    </div>
                    <div className="formInputCont">
                        <div>
                            <p className='inputLabel'>LAST NAME</p>
                        </div>
                        <input
                            name='lastName'
                            className="formInput"
                            type="text"
                            onChange={this.handleInputTextChange}
                            placeholder=''
                            value={this.state.lastName}>
                        </input>
                    </div>
                    <div className="formInputCont">
                        <div>
                            <p className='inputLabel'>PHONE NUMBER</p>
                        </div>
                        <input
                            name='userPhone'
                            className="formInput"
                            type="text"
                            onChange={this.handleInputTextChange}
                            placeholder=''
                            value={this.state.userPhone}>
                        </input>
                    </div>
                    <div className="formInputCont">
                        <div>
                            <p className='inputLabel'>EMAIL</p>
                        </div>
                        <input
                            name='email'
                            className="formInput"
                            type="text"
                            onChange={this.handleInputTextChange}
                            placeholder=''
                            value={this.state.email}>
                        </input>
                    </div>
                    <div className="formInputCont">
                        <div>
                            <p className='inputLabel'>PASSWORD</p>
                        </div>
                        <input
                            name='password'
                            className="formInput"
                            type="password"
                            onChange={this.handleInputTextChange}
                            placeholder=''
                            value={this.state.password}>
                        </input>
                    </div>
                    <div className="formInputCont">
                        <div>
                            <p className='inputLabel'>VERIFY PASSWORD</p>
                        </div>
                        <input
                            name='verifyPassword'
                            className="formInput"
                            type="password"
                            onChange={this.handleInputTextChange}
                            placeholder=''
                            value={this.state.verifyPassword}>
                        </input>
                    </div>
                </div>
                <br/>
                <button
                    className="mdl-button mdl-js-button mdl-button--raised signInFormButton"
                    onClick={(e) => {
                        e.preventDefault();
                        this.onButtonPress()
                    }
                    }>
                    <span className='buttonText'>
                        Submit
                    </span>
                </button>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    currentValues: state.currentValues
});

const mapDispatchToProps = dispatch => {
    return {
        putNextQuestion : (fb_id, data) => {
            dispatch(nextQuestion(fb_id, data ))
        },
        createNewUser : (userObj) => {
          dispatch(createNewUser(userObj))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
