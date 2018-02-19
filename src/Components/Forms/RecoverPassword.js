import React, {Component} from "react";
import firebase from 'firebase';

class RecoverPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            error: '',
            loading: false,
            user_token: ''
        };
    }

    renderButton() {
        if (this.state.loading) {
            return <h4>Loading...</h4>
        }
        return (
            <button
                id='signInFormButton'
                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                onClick={() => console.log('button works')}>
                RECOVER
            </button>
        );
    }

    handleEmailTextChange = (event) => {
        this.setState({email: event.target.value})
        console.log(this.state.email)
    };

    render() {
        return (
            <div>
                <form className="basicForm" action="#">
                    <div className='inputCont'>
                        <div className='formTitleCont'>
                            <p className="formTitle">RECOVER PASSWORD</p>
                        </div>
                        <div className="formInputCont">
                            <p className='inputLabel'>USERNAME</p>
                            <input
                                className="formInput"
                                type="text"
                                onChange={this.handleEmailTextChange}
                                placeholder=''
                                value={this.state.email}>
                            </input>
                            <p className='passwordRequirementText'>WE'LL SEND YOU AN EMAIL WITH PASSWORD RESET
                                INSTRUCTIONS</p>
                        </div>
                    </div>
                    <div>
                        {this.renderButton()}
                    </div>
                    <div className='forgotLinksCont'>
                        <a className='forgotLinks' href='#'>RECOVER USERNAME </a>
                        <a className='forgotLinks' href='#'>RETURN TO LOGIN </a>
                    </div>
                </form>
            </div>
        );
    }
}

export default RecoverPassword;