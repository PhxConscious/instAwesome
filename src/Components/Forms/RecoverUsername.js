import React, {Component} from "react";
import {Link} from 'react-router-dom';

// import firebase from 'firebase';

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
                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect signInFormButton"
                onClick={() => console.log('button works')}>
                <span className='buttonText'>
                    RECOVER
                </span>
            </button>
        );
    }

    handleInputTextChange = e => {
        this.setState({[e.target.name]: e.target.value});
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
                                name='email'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder=''
                                value={this.state.email}>
                            </input>
                        </div>
                    </div>
                    <div>
                        {this.renderButton()}
                    </div>
                </form>
                <Link to='/' className='forgotLinks'>
                    RETURN TO LOGIN
                </Link>
            </div>
        );
    }
}

export default RecoverUsername;
