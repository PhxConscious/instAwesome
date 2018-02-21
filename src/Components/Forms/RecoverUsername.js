import React, {Component} from "react";
import firebase from 'firebase';

class RecoverUsername extends Component {
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
                <form className="formCont" action="#">
                    <div className='inputCont'>
                        <div className='formTitleCont'>
                            <p className="formTitle">RECOVER USERNAME</p>
                        </div>
                        <div className='recoverUsernameSmallTextCont'>
                            <p className='recoverUsernameSmallText'>WE'VE SENT A CODE TO YOUR MOBILE PHONE.</p>
                            <p className='recoverUsernameSmallText'>ENTER THE CODE BELOW TO RECOVER YOUR USERNAME AND
                                LOGIN.
                            </p>
                        </div>
                        <div className="formInputCont">
                            <input
                                className="formInput"
                                type="text"
                                onChange={this.handleEmailTextChange}
                                placeholder=''
                                value={this.state.email}>
                            </input>
                        </div>
                    </div>
                    <div>
                        {this.renderButton()}
                    </div>
                </form>
            </div>
        );
    }
}

export default RecoverUsername;
