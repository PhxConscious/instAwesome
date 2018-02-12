import React, {Component} from "react";
import firebase from 'firebase';
import axios from 'axios';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    onButtonPress() {
        const {email, password} = this.state;

        if (email === '' || password === '') {
            return alert('Must fill in all fields')
        } else if (password.length < 6) {
            return alert('password must be at least 6 characters long')
        }
        return (
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => axios.post('http://localhost:3000/users/new', {
                    email: email,
                    user_token: firebase.auth().currentUser.uid,
                }))
                .then(() => <h1>Great!</h1>))

    }

    render() {
        return (
            <form className="basicForm" action="#">
                <div className="mdl-textfield mdl-js-textfield">
                    <input className="mdl-textfield__input" type="text" id="sample1"></input>
                    <label className="mdl-textfield__label">Username</label>
                </div>
                <br/>
                <div className="mdl-textfield mdl-js-textfield">
                    <input className="mdl-textfield__input" type="text" id="sample1"></input>
                    <label className="mdl-textfield__label">Password</label>
                </div>
                <br/>
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                    Submit
                </button>
            </form>
        );
    }
}

export default SignUpForm;
