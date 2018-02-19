import React, {Component} from "react";
import '../../Styles/FormsStyles.css';

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

    onButtonPress() {
        // const {instagramAccount, companyName} = this.state;
        this.setState({error: '', loading: true});
        console.log('button works and displays loading...')
    }

    renderButton() {
        if (this.state.loading) {
            return <p id='prog1' className="mdl-spinner mdl-js-spinner mdl-spinner--single-color is-active"></p>
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
                <form className="basicForm" action="#">
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
