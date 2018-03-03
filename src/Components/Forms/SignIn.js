import React, {Component} from "react";
import firebase from 'firebase';
import {Redirect, Link} from 'react-router-dom';
import Styles from '../../Styles/FormsStyles.css';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            phone: '',
            error: '',
            user_token: '',
            redirect: false
        };
    }

    signInWithEmail() {
        const {email, password} = this.state;
        this.setState({error: '', loading: true});
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .then(() => this.setState({redirect: true}))
            .catch(this.onLoginFail.bind(this))
    }

    signInWithGoogle(e) {
        e.preventDefault();
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().useDeviceLanguage();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            console.log(`${firebase.auth().currentUser.email} has just signed in with Google Auth`)
        }).catch(function (error) {
            // Handle Errors
            let errorCode = error.code;
            let errorMessage = error.message;
            // The email of the user's account used.
            let email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            let credential = error.credential;
        });
    }

    onLoginFail() {
        this.setState({error: 'Authentication Failed', loading: false});
        console.log(this.state.error)
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: '',
            user_token: firebase.auth().currentUser.uid
        });
        console.log(`${firebase.auth().currentUser.email} has just signed in`)
    }

    renderButton() {
        return (
            <button
                id='signInFormButton'
                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                onClick={(e) => {
                    e.preventDefault()
                    this.signInWithEmail();
                }}>
                LOG IN
            </button>
        );
    }

    handleInputTextChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {

        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/learn/dashboard'/>;
        }

        return (
            <div>
                <form className='formCont' action="#">
                    <div className='inputCont'>
                        <div className='formTitleCont'>
                            <p className="formTitle">SIGN IN</p>
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
                                placeholder='Your Email'
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
                                placeholder='Your Password'
                                value={this.state.password}>
                            </input>
                        </div>
                        <p className='or'>OR</p>
                        <br/>
                    </div>
                    <div>
                        {this.renderButton()}
                    </div>
                    <div>
                        <button className='mdl-button mdl-js-button googleButton' onClick={this.signInWithGoogle}>SIGN
                            IN WITH GOOGLE
                        </button>
                    </div>
                    <div className='forgotLinksCont'>
                        <a className='forgotLinks' href='#'>FORGOT USERNAME? </a>
                        <a className='forgotLinks' href='#'>FORGOT PASSWORD? </a>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginForm;