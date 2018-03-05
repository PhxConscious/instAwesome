import React, {Component} from "react";
import firebase from 'firebase';
import axios from 'axios';

import Styles from '../../Styles/FormsStyles.css';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            userPhone: '',
            email: '',
            password: '',
            verifyPassword: ''
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3000/users')
            .then(res => {
                console.log(res.data[0]);
            });
    }

    onButtonPress() {
        const {email, password, verifyPassword, firstName, lastName, userPhone} = this.state;
        if (email === '' || password === '') {
            return alert('Must fill in all fields')
        } else if (password !== verifyPassword) {
            return alert('Passwords do not match');
        } else if (password.length < 6) {
            return alert('password must be at least 6 characters long')
        }
        return (
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => axios.post('http://localhost:3000/users/new', {
                    user_email: email,
                    firebase_id: firebase.auth().currentUser.uid,
                    first_name: firstName,
                    last_name: lastName,
                    user_phone: userPhone
                })))
    }

    handleInputTextChange = e => {
        this.setState({[e.target.name]: e.target.value});
        // console.log(`this is the current state ${this.state}`)
    };

    render() {
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
                            onChange={this.handleFirstNameTextChange}
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
                            onChange={this.handleLastNameTextChange}
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
                            onChange={this.handleUserPhoneTextChange}
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
                            onChange={this.handleEmailTextChange}
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
                            onChange={this.handlePassTextChange}
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
                            onChange={this.handleVerifyPassTextChange}
                            placeholder=''
                            value={this.state.verifyPassword}>
                        </input>
                    </div>
                </div>
                <br/>
                <button
                    id='signInFormButton'
                    className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                    onClick={() => this.onButtonPress()}>
                    <span className='buttonText'>
                        UPDATE
                    </span>
                </button>
            </form>
        );
    }
}

export default SignUpForm;
