import React, {Component} from "react";
import '../../Styles/FormsStyles.css';

class PrimaryContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            emailAddress: '',
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
                            <p className="formTitle">PRIMARY CONTACT</p>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>FULL NAME</p>
                            </div>
                            <input
                                name='fullName'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder='Jeremy Chevallier'
                                value={this.state.fullName}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>PHONE NUMBER</p>
                            </div>
                            <input
                                name='phoneNumber'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder='480-268-5305'
                                value={this.state.phoneNumber}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>EMAIL ADDRESS</p>
                            </div>
                            <input
                                name='emailAddress'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
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

export default PrimaryContact;
