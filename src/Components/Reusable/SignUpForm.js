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
        }
        return (
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => axios.post('http://localhost:3000/users/new', {
                    email: email,
                    user_token: firebase.auth().currentUser.uid,
                }))
                .then(() => console.log('this works')))
    }

    render() {
        return (
            <form className="basicForm" action="#">
                <div className="mdl-textfield mdl-js-textfield">
                    <input className="mdl-textfield__input"
                           type="text"
                           onChange={(email) => {
                               this.setState({email});
                               console.log(this.state);
                            }
                           }
                           value={this.state.email}>
                    </input>
                    <label className="mdl-textfield__label">Email</label>
                </div>
                <br/>
                <div className="mdl-textfield mdl-js-textfield">
                    <input className="mdl-textfield__input"
                           type="password"
                           onChange={(password) => this.setState({password})}
                           value={this.state.password}>
                    </input>
                    <label className="mdl-textfield__label">Password</label>
                </div>
                <br/>
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                        onClick={() => this.onButtonPress()}>
                    Submit
                </button>
            </form>
        );
    }
}

export default SignUpForm;
