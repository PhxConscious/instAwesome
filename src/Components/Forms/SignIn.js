import React, {Component} from "react";
import firebase from 'firebase';
import {Redirect, Link} from 'react-router-dom';
import '../../Styles/FormsStyles.css';
import {connect} from 'react-redux';
import {instanceOf} from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';
import {Spinner, Snackbar} from 'react-mdl';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            phone: '',
            user_token: '',
            redirect: false,
            OAuthToken: '',
            loading: false,
            isSnackbarActive: false,
            snackbarText: ''
        };
        this.loginRefresh = this.loginRefresh.bind(this);
        this.handleShowSnackbar = this.handleShowSnackbar.bind(this);
        this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
    }


    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };


    handleInputTextChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };


    renderSnackbar = () => {
        return (
            <Snackbar className='snackbar' active={this.state.isSnackbarActive} timeout={2000}
                      onTimeout={this.handleTimeoutSnackbar}>{this.state.snackbarText}</Snackbar>
        )
    };


    handleShowSnackbar() {
        this.setState({isSnackbarActive: true});
    }


    handleTimeoutSnackbar() {
        this.setState({isSnackbarActive: false});
    }


    loginRefresh() {
        const {cookies} = this.props;
        cookies.remove('firebase_id');
        this.setState({
            isSnackbarActive: true,
            snackbarText: 'Sorry you\'re having technical difficulties! Please bear with us as continue improving as quickly as we can. Clicking this link will ensure your login info is reset - try logging in again.'
        });
        setTimeout(() => {
            window.location.reload();
        }, 4000)
    }


    onLoginSuccess = (result) => {
        this.setState({snackbarText: 'Success'});
        this.handleShowSnackbar()
        // set a cookie upon login with firebase_id
        const {cookies} = this.props;
        cookies.set('firebase_id', result.user.uid, {path: '/', maxAge: 1000000});
        if (result.credential) {
            cookies.set('facebook_token', result.credential.accessToken, {path: '/', maxAge: 1000000});
        }
        setTimeout(() => {
            this.setState({redirect: true})
        }, 2500)
    };


    onLoginFail = (error) => {
        this.setState({
            loading: false,
            snackbarText: error.message,
        });
        this.handleShowSnackbar();
    };


    renderButton = () => {
        if (!this.state.loading) {
            return (
                <button
                    className="signInFormButton"
                    onClick={(e) => {
                        e.preventDefault();
                        const {email, password} = this.state;
                        if (email === '' || password === '') {
                            this.setState({loading: false, snackbarText: 'Please input username and password'});
                            this.handleShowSnackbar();
                            return;
                        }
                        this.signInWithEmailAndPassword()
                    }}>
                <span className='buttonText'>
                    LOGIN
                </span>
                </button>
            );
        }
        return (
            <Spinner/>
        )
    };


    signInWithEmailAndPassword = () => {
        const {email, password} = this.state;
        console.log("current email and password", email, password);
        this.setState({
            loading: true
        });
        firebase.auth().signInWithEmailAndPassword(email, password)
        // onLoginSuccess is expecting a UserCredential object, so wrap our result
            .then(user => this.onLoginSuccess({user}))
            .catch(this.onLoginFail);
    };

    signInWithFacebook = (e) => {
        e.preventDefault();
        const provider = new firebase.auth.FacebookAuthProvider();
        provider.setCustomParameters({
            'display': 'popup'
        });

        firebase.auth().signInWithPopup(provider)
            .then(this.onLoginSuccess)
            .catch(this.onLoginFail);
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
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
                    <div className='formButtonContainer'>
                        {this.renderButton()}
                    </div>
                </form>
                <div className="altSignIn">
                    <p className='or'>OR SIGN IN WITH</p>
                    {/*<button className='socialMediaLoginButton' onClick={this.signInWithGoogle}>*/}
                    {/*<i className="fab fa-google"> </i>*/}
                    {/*</button>*/}
                    <button className='socialMediaLoginButton' onClick={this.signInWithFacebook}>
                        <i className="fab fa-facebook-f"/>
                    </button>
                    {/*<button className='socialMediaLoginButton'>*/}
                    {/*<i className="fab fa-linkedin-in"> </i>*/}
                    {/*</button>*/}
                </div>
                <div className='forgotLinksCont'>
                    {/*<Link to='/forgotusername' className='forgotLinks' href='#'>FORGOT USERNAME? </Link>*/}
                    <Link to='/signup' className='forgotLinks'>CREATE AN ACCOUNT? </Link>
                    <Link to='/forgotpassword' className='forgotLinks'>FORGOT PASSWORD? </Link>
                    <div
                        className="loginTrouble"
                        onClick={this.loginRefresh}
                    >
                        <p className="forgotLinks">TROUBLE LOGGING IN?</p>
                    </div>
                </div>
                {this.renderSnackbar()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentValues: state.currentValues,
    userFbId: state.currentValues.currentFbId,
    companyInfo: state.companyInfo,
});

export default withCookies(connect(mapStateToProps)(LoginForm))