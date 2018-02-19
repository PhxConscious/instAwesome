import React, {Component} from "react";
import '../../Styles/FormsStyles.css';

class ContactInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactName: '',
            contactNumber: '',
            contactEmail: '',
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

    handleContactNameTextChange = (event) => {
        this.setState({contactName: event.target.value});
        console.log(this.state.contactName)
    };

    handleContactNumberTextChange = (event) => {
        this.setState({contactNumber: event.target.value});
        console.log(this.state.contactNumber)
    };

    handleContactEmailTextChange = (event) => {
        this.setState({contactEmail: event.target.value});
        console.log(this.state.contactEmail)
    };

    render() {
        return (
            <div>
                <form className="basicForm" action="#">
                    <div className='inputCont'>
                        <div className='formTitleCont'>
                            <p className="formTitle">CONTACT INFORMATION</p>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>CONTACT NAME</p>
                            </div>
                            <input
                                className="formInput"
                                type="text"
                                onChange={this.handleContactNameTextChange}
                                placeholder='Jeremy Chevallier'
                                value={this.state.contactName}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>CONTACT NUMBER</p>
                            </div>
                            <input
                                className="formInput"
                                type="text"
                                onChange={this.handleContactNumberTextChange}
                                placeholder='480-268-5305'
                                value={this.state.contactNumber}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>CONTACT EMAIL</p>
                            </div>
                            <input
                                className="formInput"
                                type="text"
                                onChange={this.handleContactEmailTextChange}
                                placeholder='jeremy@phxconscious.com'
                                value={this.state.contactEmail}>
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

export default ContactInfo;
