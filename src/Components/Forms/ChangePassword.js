import React, {Component} from "react";
import '../../Styles/FormsStyles.css';
import firebase from 'firebase';

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

    //***************************** Reauth not working ******************************
    //     reAuthUser() {
    //         const {verifyPassword} = this.state;
    //         var user = firebase.auth().currentUser;
    //         var credential = verifyPassword;
    //
    // // Prompt the user to re-provide their sign-in credentials
    //         user.reauthenticateWithCredential(credential).then(function () {
    //             alert('user re-authenticated')
    //         }).catch(function (error) {
    //             alert(error)
    //         });
    //     }

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
            return <p id='loadingText' className="mdl-spinner mdl-js-spinner mdl-spinner--single-color is-active"></p>
        }
        return (
            <button
                id='formButton'
                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                onClick={() => this.onButtonPress()}>
                <div>Update</div>
            </button>
        );
    }

    handleVerifyPasswordTextChange = (event) => {
        this.setState({verifyPassword: event.target.value});
        console.log(this.state.verifyPassword)
    };

    handleNewPasswordTextChange = (event) => {
        this.setState({newPassword: event.target.value});
        console.log(this.state.newPassword)
    };

    handleConfirmPasswordTextChange = (event) => {
        this.setState({confirmNewPassword: event.target.value});
        console.log(this.state.confirmNewPassword)
    };

    render() {
        return (
            <div>
                <form className="formCont" action="#">
                    <div className='inputCont'>
                        <div className='formTitleCont'>
                            <p className="formTitle">CHANGE PASSWORD</p>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>VERFIY CURRENT PASSWORD</p>
                            </div>
                            <input
                                className="formInput"
                                type="password"
                                onChange={this.handleVerifyPasswordTextChange}
                                placeholder=''
                                value={this.state.verifyPassword}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>CHOOSE NEW PASSWORD</p>
                            </div>
                            <input
                                className="formInput"
                                type="password"
                                onChange={this.handleNewPasswordTextChange}
                                placeholder=''
                                value={this.state.newPassword}>
                            </input>
                        </div>
                        <div className='passwordRequirements'>
                            <p className='finePrintTop'>
                                MUST BE AT LEAST 7 CHARACTERS LONG, WITH AT LEAST ONE OF EACH:
                            </p>
                            <ul>
                                <li className='passwordRequirementText'>UPPERCASE CHARACTER</li>
                                <li className='passwordRequirementText'>LOWERCASE CHARACTER</li>
                                <li className='passwordRequirementText'>NUMBER 0-9</li>
                                <li className='passwordRequirementText'>SYMBOL</li>
                            </ul>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>CONFIRM NEW PASSWORD</p>
                            </div>
                            <input
                                className="formInput"
                                type="password"
                                onChange={this.handleConfirmPasswordTextChange}
                                placeholder=''
                                value={this.state.confirmNewPassword}>
                            </input>
                        </div>
                    </div>
                    <br/>
                    {this.renderButton()}
                </form>
            </div>
        );
    }
}

export default ChangePassword;
