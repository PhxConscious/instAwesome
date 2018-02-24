import React, {Component} from "react";
import '../../Styles/FormsStyles.css';

class OnTheWeb extends Component {
    constructor(props) {
        super(props);
        this.state = {
            website: '',
            googleSearchGoals: '',
            googleBusinessProfile: '',
            instgramUserName: '',
            instagramGoals: '',
            facebookPageUrl: '',
            facebookGoals: '',
            twitterUsername: '',
            twitterGoals: '',
            linkedinProfileUrl: '',
            linkedinGoals: '',
            googlePlusUrl: '',
            googlePlusGoals: '',
            youtubeUrl: '',
            vimeoUrl: '',
            youtubeVimeoGoals: '',
            pinterestProfile: '',
            pinterestGoals: '',
            yelpBusinessProfile: '',
            yelpGoals: '',
            bbbProfile: '',
            bbbGoals: '',
            error: '',
            loading: false
        };
    }

    onButtonPress() {
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
                <div>UPDATE</div>
            </button>
        );
    }

    handleFullNameTextChange = (event) => {
        this.setState({fullName: event.target.value});
        console.log(this.state.fullName)
    };

    handlePhoneNumberTextChange = (event) => {
        this.setState({phoneNumber: event.target.value});
        console.log(this.state.phoneNumber)
    };

    handleEmailAddressTextChange = (event) => {
        this.setState({emailAddress: event.target.value});
        console.log(this.state.emailAddress)
    };

    render() {
        return (
            <div>
                <form className="formCont" action="#">
                    <div className='inputCont'>
                        <div className='formTitleCont'>
                            <p className="formTitle">CONTENT CREATOR</p>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>FULL NAME</p>
                            </div>
                            <input
                                className="formInput"
                                type="text"
                                onChange={this.handleFullNameTextChange}
                                placeholder='Jeremy Chevallier'
                                value={this.state.fullName}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>PHONE NUMBER</p>
                            </div>
                            <input
                                className="formInput"
                                type="text"
                                onChange={this.handlePhoneNumberTextChange}
                                placeholder='480-268-5305'
                                value={this.state.phoneNumber}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>EMAIL</p>
                            </div>
                            <input
                                className="formInput"
                                type="text"
                                onChange={this.handleEmailAddressTextChange}
                                placeholder='Jeremy@phxconscious.com'
                                value={this.state.emailAddress}>
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

export default OnTheWeb;
