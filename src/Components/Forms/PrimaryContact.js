import React, {Component} from "react";
import '../../Styles/FormsStyles.css';
import {connect} from 'react-redux';
import {updateCompanyInfo} from "../../redux/actions/companyInfo";

class PrimaryContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            primary_contact_full_name: '',
            primary_contact_phone_number: '',
            primary_contact_email: '',
            error: '',
            loading: false
        };
    }

    onButtonPress(e) {
        e.preventDefault();
        this.setState({error: ''});
        console.log('button works and displays loading...')
        this.props.addCompanyInfo(this.props.companyInfo.companyList && this.props.companyInfo.companyList[0].company_id, this.state);
        if (this.props.companyInfo.status !== 200) {
            return alert('update failed')
        } else {
            return alert('update successful')
        }
    }

    renderButton() {
        return (
            <button
                className="formButton"
                onClick={(e) => this.onButtonPress(e)}>
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
                                name='primary_contact_full_name'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder='Jeremy Chevallier'
                                value={this.state.primary_contact_full_name}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>PHONE NUMBER</p>
                            </div>
                            <input
                                name='primary_contact_phone_number'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder='480-268-5305'
                                value={this.state.primary_contact_phone_number}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>EMAIL ADDRESS</p>
                            </div>
                            <input
                                name='primary_contact_email'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder='Jeremy@phxconscious.com'
                                value={this.state.primary_contact_email}>
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

const mapStateToProps = state => ({
    currentValues: state.currentValues,
    companyInfo: state.companyInfo
});

const mapDispatchToProps = dispatch => {
    return {
        addCompanyInfo: (companyId, companyObj) => {
            dispatch(updateCompanyInfo(companyId, companyObj))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryContact);
