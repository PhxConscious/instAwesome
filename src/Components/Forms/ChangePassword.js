import React, {Component} from "react";
import '../../Styles/FormsStyles.css';
import firebase from 'firebase';
import {Grid, Cell} from 'react-mdl'

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verifyPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            error: '',
            loading: false
        };
    }

    createNewPassword() {
        const {newPassword, confirmNewPassword} = this.state;
        let user = firebase.auth().currentUser;
        let newerPassword = newPassword;

        if (newPassword === '' || confirmNewPassword === '') {
            return alert('Must fill in all fields')
        } else if (newPassword !== confirmNewPassword) {
            return alert('Passwords do not match');
        } else if (newPassword.length < 6) {
            return alert('password must be at least 6 characters long')
        }
        return (
            user.updatePassword(newerPassword).then(function () {
                alert('password changed');
            }).catch(function (error) {
                alert(error)
            })
        )
    }

    onButtonPress() {
        // this.reAuthUser();
        this.createNewPassword();
        this.setState({error: '', loading: true});
        console.log('button works and displays loading...')
    }

    renderButton() {
        if (this.state.loading) {
            return (
                <p id='loadingText' className=""></p>
            )
        }
        return (
            <button
                className="formButton"
                onClick={() => this.onButtonPress()}>
                <span className='buttonText'>
                    UPDATE
                </span>
            </button>
        );
    }

    handleInputTextChange = e => {
        this.setState({[e.target.name]: e.target.value});
        // console.log(`this is the current state ${this.state}`)
    };

    render() {
        return (
            <div>
                <Grid>
                    <Cell col={8} offsetDesktop={2} tablet={12} phone={12}>
                        <form className="formCont" action="#">
                            <div className='inputCont'>
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>CHOOSE NEW PASSWORD</p>
                                    </div>
                                    <input
                                        name='newPassword'
                                        className="formInput"
                                        type="password"
                                        onChange={this.handleInputTextChange}
                                        placeholder=''
                                        value={this.state.newPassword}>
                                    </input>
                                </div>
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>CONFIRM NEW PASSWORD</p>
                                    </div>
                                    <input
                                        name='confirmNewPassword'
                                        className="formInput"
                                        type="password"
                                        onChange={this.handleInputTextChange}
                                        placeholder=''
                                        value={this.state.confirmNewPassword}>
                                    </input>
                                </div>
                            </div>
                            <br/>
                            {this.renderButton()}
                        </form>
                    </Cell>
                </Grid>
            </div>
        );
    }
}

export default ChangePassword;