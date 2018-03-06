import React, {Component} from "react";
import '../../Styles/FormsStyles.css';

class CompanyInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instagramAccount: '',
            companyName: '',
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
                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect formButton"
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
                            <p className="formTitle">COMPANY INFORMATION</p>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>INSTAGRAM ACCOUNT</p>
                            </div>
                            <input
                                name='instagramAccount'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder='@phxconscious'
                                value={this.state.instagramAccount}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>COMPANY NAME</p>
                            </div>
                            <input
                                name='companyName'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder='Conscious Creative'
                                value={this.state.companyName}>
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

export default CompanyInfo;
