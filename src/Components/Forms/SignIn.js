import React, {Component} from "react";
import firebase from 'firebase';
import {Redirect, Link} from 'react-router-dom';
import Styles from '../../Styles/FormsStyles.css';
import {connect} from 'react-redux';
import {setCurrentValue} from "../../redux/actions/currentValues";
import {getUserProgress} from '../../redux/actions/userProgress';
import {getCompanyList} from '../../redux/actions/companyInfo';
import {getLmsContent} from '../../redux/actions/lmsContent';
import {instanceOf} from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';
import {Spinner} from 'react-mdl';

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
            loading: false
        };
        this.pullInUserValues = this.pullInUserValues.bind(this);
        this.loginRefresh = this.loginRefresh.bind(this);
    }

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    handleInputTextChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    loginRefresh(){
      const {cookies} = this.props;
      cookies.remove('hash');
      window.location.reload();
      alert("Sorry you're having technical difficulties! Please bear with us as continue improving as quickly as we can. Clicking this link will ensure your login info is reset - try logging in again.")
    }

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


    pullInUserValues(fb_id) {
        let {setCurrentUserFbId, fetchUserInfo, getCompanyList, getLmsContent} = this.props;

        // WARNING: this should not be called multiple times - it will result in duplicate events firing
        // currently pullInUserValues is called from render and from onLoginSuccess
        // consider only calling it once from 'mounted' and have it read fb_id from state
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setCurrentUserFbId("currentFbId", fb_id)
                fetchUserInfo(fb_id);
                getCompanyList(fb_id);
                getLmsContent();
            } else {
                console.log('theres no user - THIS IS SOMETHING WEIRD WITH FIREBASE, investigate')
            }
        });
    }

    onLoginSuccess = () => {
        this.setState({
            email: '',
            password: '',
            loginError: '',
            user_token: firebase.auth().currentUser.uid,
        });

        setTimeout(() => {
            this.setState({
                redirect: true
            })
        },2000);

        // set a cookie upon login with fb_id
        const {cookies} = this.props;

        cookies.set('hash', firebase.auth().currentUser.uid, {path: '/', maxAge: 1000000});

        this.pullInUserValues(firebase.auth().currentUser.uid)

    };

    onLoginFail = () => {
        this.setState({
            loginError: 'Authentication Failed',
            loading: false
        });
        console.log(`this is the login error: ${this.state.loginError}`);
    };

    renderButton = () => {
        if(!this.state.loading){
            return (
                <button
                    className="signInFormButton"
                    onClick={this.onButtonPress}
                    color='orange'>
                <span className='buttonText'>
                    LOGIN
                </span>
                </button>
            );
        }
        return(
            <Spinner />
        )
    };


    onButtonPress = (e) => {
        e.preventDefault();
        const {email, password, loading} = this.state;
        console.log(" current email and password", email, password)
        this.setState({
            error: '',
            loading: true
        });
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess)
            .then(this.setState({email: '', password: ''}))
            .catch(this.onLoginFail)
    };

    render() {
        const {cookies} = this.props;

        // keeps user logged in
        let userCookie = cookies.get('hash')
        if (userCookie) {
            // WARNING: this should not be called in a render function
            this.pullInUserValues(userCookie);
            return (
                <Redirect to={'/splash'}/>
            )
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
                    {/*<div>*/}
                        {/*<p className='or'>OR SIGN IN WITH</p>*/}
                        {/*<button className='socialMediaLoginButton' onClick={this.signInWithGoogle}>*/}
                            {/*<i className="fab fa-google"> </i>*/}
                        {/*</button>*/}
                        {/*<button className='socialMediaLoginButton'>*/}
                            {/*<i className="fab fa-facebook-f"> </i>*/}
                        {/*</button>*/}
                        {/*<button className='socialMediaLoginButton'>*/}
                            {/*<i className="fab fa-linkedin-in"> </i>*/}
                        {/*</button>*/}
                    {/*</div>*/}
                    <div className='forgotLinksCont'>
                        {/*<Link to='/forgotusername' className='forgotLinks' href='#'>FORGOT USERNAME? </Link>*/}
                        <Link to='/signup' className='forgotLinks' href='#'>CREATE AN ACCOUNT? </Link>
                        <Link to='/forgotpassword' className='forgotLinks' href='#'>FORGOT PASSWORD? </Link>
                        <div
                          className="loginTrouble"
                          onClick={this.loginRefresh}
                        >
                          <p className="forgotLinks">TROUBLE LOGGING IN?</p>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentValues: state.currentValues,
    userFbId: state.currentValues.currentFbId,
    companyInfo: state.companyInfo,
});

const mapDispatchToProps = dispatch => {
    return {
        setCurrentUserFbId: (key, value) => {
            dispatch(setCurrentValue(key, value))
        },
        fetchUserInfo: (fb_id) => {
            dispatch(getUserProgress(fb_id))
        },
        getCompanyList: (fb_id) => {
            dispatch(getCompanyList(fb_id))
        },
        getLmsContent: () => {
            dispatch(getLmsContent())
        },
    }
};

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(LoginForm))
