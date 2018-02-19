import React, {Component} from "react";
import firebase from 'firebase';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            loading: false,
            user_token: ''
        };
    }

    onButtonPress() {
        const {email, password} = this.state;
        this.setState({error: '', loading: true});
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFail.bind(this))
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
        console.log(`this is the user token: ${firebase.auth().currentUser.uid}`)
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

    handleEmailTextChange = (event) => {
        this.setState({email: event.target.value})
        console.log(this.state.email)
    };

    handlePassTextChange = (event) => {
        this.setState({password: event.target.value})
        console.log(this.state.password)
    };

    render() {
        return (
            <div>
                <form className="basicForm" action="#">
                    <div className='inputCont'>
                        <div className='formTitleCont'>
                            <p className="formTitle">SIGN IN</p>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>EMAIL</p>
                            </div>
                            <input
                                className="formInput"
                                type="text"
                                onChange={this.handleEmailTextChange}
                                placeholder='Your Email'
                                value={this.state.email}>
                            </input>
                        </div>
                        <br/>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>PASSWORD</p>
                            </div>
                            <input
                                className="formInput"
                                type="password"
                                onChange={this.handlePassTextChange}
                                placeholder='Your Password'
                                value={this.state.password}>
                            </input>
                        </div>
                        <br/>
                    </div>
                    <br/>
                    <div>
                        {this.renderButton()}
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
