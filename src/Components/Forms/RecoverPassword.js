import React, {Component} from "react";
import firebase from 'firebase';
import {Link} from 'react-router-dom';

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

    renderButton = () => {
        if (this.state.loading) {
            return <h4>Loading...</h4>
        }
        return (
            <button
                className="formButton"
                onClick={() => this.emailPasswordReset()}>
                <span className='buttonText'>
                    RECOVER
                </span>
            </button>
        );
    };

    handleInputTextChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    emailPasswordReset = () => {
        let emailAddress = this.state.email;

        firebase.auth().sendPasswordResetEmail(emailAddress)
            .then(function () {
                alert('email sent');
            }).catch(function (error) {
            alert(error.message)
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
                            <p className='passwordRequirementText'>
                                WE'LL SEND YOU AN EMAIL WITH PASSWORD RESET INSTRUCTIONS
                            </p>
                        </div>
                    </div>
                    <div>
                        {this.renderButton()}
                    </div>
                    <div className='forgotLinksCont'>
                        <Link to='/forgotusername' className='forgotLinks'>
                            RECOVER USERNAME
                        </Link>
                        <Link to='/' className='forgotLinks'>
                            RETURN TO LOGIN
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default RecoverPassword;
