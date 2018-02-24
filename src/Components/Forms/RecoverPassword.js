import React, {Component} from "react";
import firebase from 'firebase';

class RecoverPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            error: '',
            loading: false,
            user_token: ''
        };
    }

    renderButton() {
        if (this.state.loading) {
            return <h4>Loading...</h4>
        }
        return (
            <button
                id='signInFormButton'
                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                onClick={() => this.emailPasswordReset()}>
                RECOVER
            </button>
        );
    }

    handleInputTextChange = e => {
        this.setState({[e.target.name]: e.target.value});
        // console.log(`this is the current state ${this.state}`)
    };

    emailPasswordReset = () => {
        let auth = firebase.auth();
        let emailAddress = this.state.email;

        auth.sendPasswordResetEmail(emailAddress).then(function () {
            alert('email sent');
        }).catch(function (error) {
            alert(error)
        });
    };

    render() {
        return (
            <div>
                <form className="formCont" action="#">
                    <div className='inputCont'>
                        <div className='formTitleCont'>
                            <p className="formTitle">RECOVER PASSWORD</p>
                        </div>
                        <div className="formInputCont">
                            <p className='inputLabel'>EMAIL</p>
                            <input
                                name='email'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder=''
                                value={this.state.email}>
                            </input>
                            <p className='passwordRequirementText'>WE'LL SEND YOU AN EMAIL WITH PASSWORD RESET
                                INSTRUCTIONS</p>
                        </div>
                    </div>
                    <div>
                        {this.renderButton()}
                    </div>
                    <div className='forgotLinksCont'>
                        <a className='forgotLinks' href='#'>RECOVER USERNAME </a>
                        <a className='forgotLinks' href='#'>RETURN TO LOGIN </a>
                    </div>
                </form>
            </div>
        );
    }
}

export default RecoverPassword;
