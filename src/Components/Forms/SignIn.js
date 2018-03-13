import React, {Component} from "react";
import firebase from 'firebase';
import {Redirect, Link} from 'react-router-dom';
import Styles from '../../Styles/FormsStyles.css';
import { connect } from 'react-redux';
import { setCurrentValue } from "../../redux/actions/currentValues";
import { getUserProgress } from '../../redux/actions/userProgress';

class LoginForm extends Component {

    constructor(props) {
      super(props);
      this.state = {
          email: '',
          password: '',
          phone: '',
          loginError: '',
          user_token: '',
          redirect: false,
          OAuthToken: '',
      };
      this.pullInUserValues = this.pullInUserValues.bind(this)
    }

    handleInputTextChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    signInWithGoogle = (e) => {
        e.preventDefault();
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().useDeviceLanguage();
        firebase.auth().signInWithPopup(provider)
            .then(function (result) {
                console.log(`${firebase.auth().currentUser.email} has just signed in with Google Auth`)
            })
            .then(this.onLoginSuccess)
            .then(() => {
                if (firebase.auth().currentUser) {
                    this.setState({redirect: true, email: '', password: ''})
                }
            })
            .catch(this.onLoginFail);
    };


    pullInUserValues(){
      this.props.setCurrentUserFbId("currentFbId", firebase.auth().currentUser.uid)
      this.props.fetchUserInfo(firebase.auth().currentUser.uid);
    }

    onLoginSuccess = () => {
      this.setState({
          email: '',
          password: '',
          loginError: '',
          user_token: firebase.auth().currentUser.uid,
          redirect: true
      });

      this.pullInUserValues()

      console.log(`${firebase.auth().currentUser.email} has just signed in`)
    };

    onLoginFail = () => {
        this.setState({loginError: 'Authentication Failed'});
        console.log(`this is the login error: ${this.state.loginError}`);
    };

    renderButton = () => {
        return (
            <button
                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect signInFormButton"
                onClick={this.onButtonPress}
                color='orange'>
                <span className='buttonText'>
                    LOGIN
                </span>
            </button>
        );
    };



    onButtonPress = (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        console.log(" current email and password", email, password)
        this.setState({error: ''});
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess)
            .then(this.setState({email: '', password: ''}))
            .catch(this.onLoginFail)
    };

    render() {
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/profile'/>;
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
                    </div>
                    <div className='errorMessage'>
                        {this.state.loginError}
                    </div>
                    <div>
                        {this.renderButton()}
                    </div>
                    <div>
                        <p className='or'>OR SIGN IN WITH</p>
                        <button className='mdl-button mdl-js-button googleButton' onClick={this.signInWithGoogle}>
                            <i className="fab fa-google"> </i>
                        </button>
                        <button className='mdl-button mdl-js-button googleButton'>
                            <i className="fab fa-facebook-f"> </i>
                        </button>
                        <button className='mdl-button mdl-js-button googleButton'>
                            <i className="fab fa-linkedin-in"> </i>
                        </button>
                    </div>
                    <div className='forgotLinksCont'>
                        <Link to='/forgotusername' className='forgotLinks' href='#'>FORGOT USERNAME? </Link>
                        <Link to='/forgotpassword' className='forgotLinks' href='#'>FORGOT PASSWORD? </Link>
                    </div>
                </form>
            </div>
        );
    }
}

// const mapStateToProps = state => ({
//     currentValues: state.currentValues
// });

const mapDispatchToProps = dispatch => {
    return {
        setCurrentUserFbId: (key, value) => {
            dispatch(setCurrentValue(key, value))
        },
        fetchUserInfo : (fb_id) => {
          dispatch(getUserProgress(fb_id))
        },
    }
};

export default connect(null, mapDispatchToProps)(LoginForm)
