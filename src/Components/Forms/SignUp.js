import React, {Component} from "react";
import starterObj from '../../config/starterUserProgressObject';
import '../../Styles/FormsStyles.css';
import {Spinner, Snackbar} from 'react-mdl';
import PropTypes from 'prop-types';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            userPhone: '',
            loading: false,
            isSnackbarActive: false,
            snackbarText: ''
        };
        if (this.isFullSignup()) {
            this.state.email = '';
            this.state.password = '';
            this.state.verifyPassword = '';
        }
        this.handleShowSnackbar = this.handleShowSnackbar.bind(this);
        this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
    }

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        signupType: PropTypes.oneOf(['full', 'partial'])
    };

    static defaultProps = {
        signupType: 'full'
    };

    isFullSignup = () => this.props.signupType === 'full';

    onSubmitSignin = (e) => {
        e.preventDefault();
        const {email, password, verifyPassword, firstName, lastName, userPhone} = this.state;
        this.setState({loading: true, snackbarText: ''});
        if (firstName === '' || lastName === '' || userPhone === '' ||
            this.isFullSignup() && (email === '' || password === '' || verifyPassword === '')
        ) {
            this.setState({loading: false, snackbarText: 'Must fill in all fields'});
            this.handleShowSnackbar();
            return;
        }
        if (this.isFullSignup()) {
            if (password !== verifyPassword) {
                this.setState({loading: false, snackbarText: 'Passwords do not match'});
                this.handleShowSnackbar();
                return;
            } else if (password.length < 6) {
                this.setState({loading: false, snackbarText: 'Password must be at least 6 characters long'});
                this.handleShowSnackbar();
                return;
            }
        }
        this.props.onSubmit({email, password, verifyPassword, firstName, lastName, userPhone, starterObj})
            .then(this.onSuccess)
            .catch(this.onFailure);
    };

    onSuccess = () => {
        this.setState({snackbarText: 'Success'});
        this.handleShowSnackbar();
    };

    onFailure = (error) => {
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
                    onClick={ e => {
                        e.preventDefault();
                        this.onSubmitSignin(e)
                    }}>
                    <span className='buttonText'>
                        Submit
                    </span>
                </button>
            )
        }
        return <Spinner/>
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

    handleInputTextChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    // only render these fields if isFullSignup()
    renderEmailAndPassword = () => this.isFullSignup() ? (
        <div>
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
    ) : null

    render() {
        return (
            <form className="blueFormCont" action="#">
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
                    {this.renderEmailAndPassword()}
                </div>
                <br/>
                <div className='formButtonContainer'>
                    {this.renderButton()}
                </div>
                {this.renderSnackbar()}
            </form>
        );
    }
}

export default SignUpForm;
