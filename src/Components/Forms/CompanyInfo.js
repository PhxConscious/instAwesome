import React, {Component} from "react";
import '../../Styles/FormsStyles.css';
import {connect} from 'react-redux';
import {updateCompanyInfo} from "../../redux/actions/companyInfo";
import {Grid, Cell, Snackbar} from 'react-mdl';

class CompanyInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company_name: '',
            company_email: '',
            company_phone: '',
            primary_contact_email: '',
            primary_contact_full_name: '',
            primary_contact_phone_number: '',
            error: '',
            loading: false,
            isSnackbarActive: false,
            snackbarText: ''
        };
        this.handleShowSnackbar = this.handleShowSnackbar.bind(this);
        this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
    }


    componentDidMount() {
        let {companyInfo} = this.props;
        if (companyInfo && companyInfo.companyList && companyInfo.companyList[0]) {
            this.setState({
                company_name: companyInfo.companyList[0].company_name,
                company_email: companyInfo.companyList[0].company_email,
                company_phone: companyInfo.companyList[0].company_phone,
                primary_contact_email: companyInfo.companyList[0].primary_contact_email,
                primary_contact_full_name: companyInfo.companyList[0].primary_contact_full_name,
                primary_contact_phone_number: companyInfo.companyList[0].primary_contact_phone_number
            })
        }
    }


    renderButton() {
        if (this.state.loading) {
            return <p className=""/>
        }
        return (
            <button
                className="onTheWebFormButton"
                onClick={(e) => {
                    e.preventDefault();
                    this.onButtonPress(e)
                }}>
                <span className='buttonText'>
                    UPDATE
                </span>
            </button>
        );
    }


    onButtonPress() {
        const {company_name, company_email, company_phone, primary_contact_full_name, primary_contact_email, primary_contact_phone_number} = this.state;
        if (company_name === '' || company_email === '' || company_phone === '' || primary_contact_email === '' || primary_contact_full_name === '' || primary_contact_phone_number === '') {
            this.setState({snackbarText: 'Must fill in all fields'});
            this.handleShowSnackbar();
            return;
        }
        if (!this.ValidateEmail(company_email)) {
            this.setState({snackbarText: 'Invalid email format'});
            this.handleShowSnackbar();
            return;
        }
        this.props.addCompanyInfo(this.props.companyInfo.companyList && this.props.companyInfo.companyList[0].company_id, this.state);
        if (this.props.companyInfo.status !== 200) {
            this.setState({snackbarText: 'Update Failed'});
            this.handleShowSnackbar();
        } else {
            this.setState({snackbarText: 'Update Successful'});
            this.handleShowSnackbar();
        }
    }


    renderSnackbar = () => {
        return (
            <Snackbar className='snackbar' active={this.state.isSnackbarActive} timeout={2000}
                      onTimeout={this.handleTimeoutSnackbar}>{this.state.snackbarText}</Snackbar>
        )
    };


    handleShowSnackbar() {
        this.setState({isSnackbarActive: true});
    }


    handleTimeoutSnackbar() {
        this.setState({isSnackbarActive: false});
    }

    ValidateEmail = (mail) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        // alert("You have entered an invalid email address!");
        return (false)
    };

    handleInputTextChange = e => {
        this.setState({[e.target.name]: e.target.value});
        // console.log(`this is the current state ${this.state}`)
    };

    render() {
        return (
            <div>
                <Grid>
                    <Cell col={8} offsetDesktop={2} tablet={12} phone={12}>
                        {/*<h5><span className='consciousBlueColor'>Edit Your Company Info</span></h5>*/}
                        <form className="blueFormCont" action="#">
                            <div className='inputCont'>
                                {/*<div className='formTitleCont'>*/}
                                {/*<p className="formTitle">COMPANY</p>*/}
                                {/*</div>*/}
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>COMPANY NAME</p>
                                    </div>
                                    <input
                                        name='company_name'
                                        className="formInput"
                                        type="text"
                                        onChange={this.handleInputTextChange}
                                        placeholder="input your company's name"
                                        value={this.state.company_name}>
                                    </input>
                                </div>
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>COMPANY EMAIL</p>
                                    </div>
                                    <input
                                        name='company_email'
                                        className="formInput"
                                        type="text"
                                        onChange={this.handleInputTextChange}
                                        placeholder="input your company's email"
                                        value={this.state.company_email}>
                                    </input>
                                </div>
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>COMPANY PHONE</p>
                                    </div>
                                    <input
                                        name='company_phone'
                                        className="formInput"
                                        type="text"
                                        onChange={this.handleInputTextChange}
                                        placeholder="input your company's phone number"
                                        value={this.state.company_phone}>
                                    </input>
                                </div>
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>ACCOUNT MANAGER FULL NAME</p>
                                    </div>
                                    <input
                                        className="formInput"
                                        type="text"
                                        onChange={e => this.setState({primary_contact_full_name: e.target.value})}
                                        placeholder="Enter your account manager's full name"
                                        value={this.state.primary_contact_full_name}>
                                    </input>
                                </div>
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>ACCOUNT MANAGER PHONE NUMBER</p>
                                    </div>
                                    <input
                                        className="formInput"
                                        type="text"
                                        onChange={e => this.setState({primary_contact_phone_number: e.target.value})}
                                        placeholder="Enter your account manager's phone number"
                                        value={this.state.primary_contact_phone_number}>
                                    </input>
                                </div>
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>ACCOUNT MANAGER EMAIL ADDRESS</p>
                                    </div>
                                    <input
                                        className="formInput"
                                        type="text"
                                        onChange={e => this.setState({primary_contact_email: e.target.value})}
                                        placeholder="Enter your account manager's email"
                                        value={this.state.primary_contact_email}>
                                    </input>
                                </div>
                            </div>
                            <br/>
                            {this.renderSnackbar()}
                        </form>
                    </Cell>
                </Grid>
                <div className='onTheWebFormBtnCont'>
                    {this.renderButton()}
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    companyInfo: state.companyInfo,
    userCompanyJoin: state.userCompanyJoin,
    userFbId: state.currentValues.currentFbId
});


const mapDispatchToProps = dispatch => {
    return {
        addCompanyInfo: (companyId, companyObj) => {
            dispatch(updateCompanyInfo(companyId, companyObj))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyInfo);
