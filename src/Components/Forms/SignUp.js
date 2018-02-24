import React, {Component} from "react";
import firebase from 'firebase';
import axios from 'axios';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            verifyPassword: '',
            firstName: '',
            lastName: '',
            userPhone: '',
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

    handleEmailTextChange = (event) => {
        this.setState({email: event.target.value})
        console.log(this.state.email)
    };

    handlePassTextChange = (event) => {
        this.setState({password: event.target.value})
        console.log(this.state.password)
    };

    handleVerifyPassTextChange = (event) => {
        this.setState({verifyPassword: event.target.value})
        console.log(this.state.verifyPassword)
    };

    handleFirstNameTextChange = (event) => {
        this.setState({firstName: event.target.value})
        console.log(this.state.firstName)
    };

    handleLastNameTextChange = (event) => {
        this.setState({lastName: event.target.value})
        console.log(this.state.lastName)
    };

    handleUserPhoneTextChange = (event) => {
        this.setState({userPhone: event.target.value})
        console.log(this.state.userPhone)
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
                    Submit
                </button>
            </form>
        );
    }
}

export default SignUpForm;
