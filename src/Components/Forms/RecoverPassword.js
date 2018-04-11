import React, {Component} from "react";
import firebase from 'firebase';
import {Link} from 'react-router-dom';
import {Snackbar} from 'react-mdl';

class RecoverPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            user_token: '',
            isSnackbarActive: false,
            snackbarText: ''
        };
        this.handleShowSnackbar = this.handleShowSnackbar.bind(this);
        this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
    }

    renderButton = () => {
        return (
            <button
                className="formButton"
                onClick={(e) => {
                    e.preventDefault();
                    this.emailPasswordReset(e)
                }}>
                <span className='buttonText'>
                    RECOVER
                </span>
            </button>
        );
    };

    renderSnackbar = () => {
        return (
            <Snackbar className='snackbar' active={this.state.isSnackbarActive} timeout={2000}
                      onTimeout={this.handleTimeoutSnackbar}>{this.state.snackbarText}
            </Snackbar>
        )
    };

    handleShowSnackbar() {
        this.setState({isSnackbarActive: true});
    }

    handleTimeoutSnackbar() {
        this.setState({isSnackbarActive: false});
    }

    handleInputTextChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    emailPasswordReset = () => {
        let emailAddress = this.state.email;
        this.setState({snackbarText: ''});

        if (this.state.email === '') {
            this.setState({snackbarText: 'Please input email address'});
            this.handleShowSnackbar();
            return;
        }
        firebase.auth().sendPasswordResetEmail(emailAddress)
            .then(() => {
                this.setState({snackbarText: 'Email sent'});
                this.handleShowSnackbar();
            })
            .catch((error) => {
                this.setState({snackbarText: error.message});
                this.handleShowSnackbar();
            });
    };

    render() {
        return (
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
                            autoComplete='off'
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
                    <Link to='/' className='forgotLinks'>
                        RETURN TO LOGIN
                    </Link>
                </div>
                {this.renderSnackbar()}
            </form>
        );
    }
}

export default RecoverPassword;
