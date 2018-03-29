import React, {Component} from "react";
import firebase from 'firebase';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import starterObj from '../../config/starterUserProgressObject';
import '../../Styles/FormsStyles.css';
import {nextQuestion, createNewUser} from "../../redux/actions/userProgress";
import {Spinner, Snackbar} from 'react-mdl';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            userPhone: '',
            email: '',
            password: '',
            verifyPassword: '',
            redirect: false,
            loading: false,
            isSnackbarActive: false,
            error: ''
        };
        this.handleShowSnackbar = this.handleShowSnackbar.bind(this);
        this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
    }

    onButtonPress = () => {
        this.setState({loading: true});
        const {email, password, verifyPassword, firstName, lastName, userPhone} = this.state;
        if (firstName === '' || lastName === '' || email === '' || password === '' || userPhone === '') {
            this.setState({loading: false, error: 'Must fill in all fields'});
            return this.renderSnackbar;
        } else if (password !== verifyPassword) {
            this.setState({loading: false, error: 'Passwords do not match'});
            return this.renderSnackbar;
        } else if (password.length < 6) {
            this.setState({loading: false, error: 'Password must be at least 6 characters long'});
            return this.renderSnackbar;
        }
        return (
            firebase.auth().createUserWithEmailAndPassword(email, password)
            // call action with the correct user object
                .then(user => {
                    this.props.createNewUser({
                        user_email: email,
                        firebase_id: firebase.auth().currentUser.uid,
                        first_name: firstName,
                        last_name: lastName,
                        user_phone: userPhone,
                        user_progress: starterObj
                    })
                })
                .then(() => {
                    this.setState({redirect: true});
                    firebase.auth().currentUser.sendEmailVerification()
                })
        )
    };

    renderButton = () => {
        if (!this.state.loading) {
            return (
                <button
                    className="signInFormButton"
                    onClick={(e) => {
                        e.preventDefault();
                        this.handleShowSnackbar();
                        this.onButtonPress()
                    }
                    }>
                    <span className='buttonText'>
                        Submit
                    </span>
                </button>
            )
        }
        return <Spinner/>
    };

    renderSnackbar = (error) => {
        return(
            <Snackbar className='snackBar' active={this.state.isSnackbarActive} timeout={4000} onTimeout={this.handleTimeoutSnackbar}>{this.state.error}</Snackbar>
        )
    };

    handleShowSnackbar()  {
        this.setState({isSnackbarActive: true});
    }
    handleTimeoutSnackbar()  {
        this.setState({isSnackbarActive: false});
    }

    handleInputTextChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/'/>;
        }

        return (
            <form className="formCont" action="#">
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
                <br/>
                {this.renderButton()}
                {this.renderSnackbar()}
            </form>
        );
    }
}

const mapStateToProps = state => ({
    currentValues: state.currentValues
});

const mapDispatchToProps = dispatch => {
    return {
        putNextQuestion: (fb_id, data) => {
            dispatch(nextQuestion(fb_id, data))
        },
        createNewUser: (userObj) => {
            dispatch(createNewUser(userObj))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
