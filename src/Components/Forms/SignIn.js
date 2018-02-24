import React, {Component} from "react";
import firebase from 'firebase';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            phone: '',
            error: '',
            loading: false,
            user_token: ''
        };
    }

    signInWithEmail() {
        const {email, password} = this.state;
        this.setState({error: '', loading: true});
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFail.bind(this))
    }

    signInWithPhone() {

    }

    signInWithGoogle() {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().useDeviceLanguage();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            console.log(`${firebase.auth().currentUser.email} has just signed in with Google Auth`)
        }).catch(function (error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // The email of the user's account used.
            let email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            let credential = error.credential;
        });
    }

    onButtonPress() {
        if (this.state.phone === '') {
            return this.signInWithEmail()
        }
        this.signInWithPhone()
    }

    onLoginFail() {
        this.setState({error: 'Authentication Failed', loading: false})
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
        if (this.state.loading) {
            return <h4>Loading...</h4>
        }
        return (
            <button
                id='signInFormButton'
                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                onClick={() => this.onButtonPress()}>
                LOG IN
            </button>
        );
    }

    handleInputTextChange = e => {
        this.setState({[e.target.name]: e.target.value});
        // console.log(`this is the current state ${this.state}`)
    };

    render() {
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
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>PHONE NUMBER</p>
                            </div>
                            <input
                                name='phone'
                                className="formInput"
                                type="number"
                                onChange={this.handleInputTextChange}
                                placeholder='Phone Number'
                                value={this.state.phone}>
                            </input>
                        </div>
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
