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
            return <p className=""></p>
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
                <form className="formCont" action="#">
                    <div className='inputCont'>
                        <div className='formTitleCont'>
                            <p className="formTitle">CONTACT INFORMATION</p>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>CONTACT NAME</p>
                            </div>
                            <input
                                name='contactName'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder='Jeremy Chevallier'
                                value={this.state.contactName}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>CONTACT NUMBER</p>
                            </div>
                            <input
                                name='contactNumber'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder='480-268-5305'
                                value={this.state.contactNumber}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>CONTACT EMAIL</p>
                            </div>
                            <input
                                name='contactEmail'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
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
