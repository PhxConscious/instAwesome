import React, {Component} from "react";
import '../../Styles/FormsStyles.css';
import {connect} from 'react-redux';
import {addCompanyInfo} from "../../redux/actions/companyInfo";
import {postUserCompanyJoinInfo} from "../../redux/actions/userCompanyJoin";
import {Grid, Cell, Snackbar} from 'react-mdl'

class Company extends Component {
    componentDidMount() {
        this.props.currentValues
    }


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
        this.addNewCompany = this.addNewCompany.bind(this);
        this.onButtonPress = this.onButtonPress.bind(this);
        this.handleShowSnackbar = this.handleShowSnackbar.bind(this);
        this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
    }


    renderButton() {
        if (this.state.loading) {
            return <p className=""/>
        }
        return (
            <button
                className="formButton"
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


    addNewCompany() {
        const {company_name, company_email, company_phone, primary_contact_full_name, primary_contact_phone_number, primary_contact_email} = this.state;
        this.props.combineCallJoinAndCreateCompany(this.props.userFbId, company_name, company_email, company_phone, primary_contact_full_name, primary_contact_phone_number, primary_contact_email)
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
        setTimeout(() => {
            this.addNewCompany();
        }, 2000);
        if (this.props.companyInfo.status !== 200) {
            this.setState({snackbarText: 'Update Failed'});
            this.handleShowSnackbar();
        } else {
            this.setState({snackbarText: 'Congrats! You\'ve successfully added your company information!'});
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


    render() {
        return (
            <Grid>
                <Cell col={8} offsetDesktop={2} tablet={12} phone={12}>
                    {/*<h5>ADD YOUR COMPANY</h5>*/}
                    <form className="blueFormCont" action="#">
                        <div className='inputCont'>
                            {/*<div className='formTitleCont'>*/}
                            {/*<p className="formTitle">COMPANY</p>*/}
                            {/*</div>*/}

                            <div className="formInputCont">
                                <div>
                                    <p className='inputLabel'>NAME</p>
                                </div>
                                <input
                                    className="formInput"
                                    type="text"
                                    onChange={e => this.setState({company_name: e.target.value})}
                                    placeholder="input your company's name"
                                    value={this.state.company_name}>
                                </input>
                            </div>
                            <div className="formInputCont">
                                <div>
                                    <p className='inputLabel'>COMPANY EMAIL</p>
                                </div>
                                <input
                                    className="formInput"
                                    type="text"
                                    onChange={e => this.setState({company_email: e.target.value})}
                                    placeholder="input your company's email"
                                    value={this.state.company_email}>
                                </input>
                            </div>
                            <div className="formInputCont">
                                <div>
                                    <p className='inputLabel'>COMPANY PHONE</p>
                                </div>
                                <input
                                    className="formInput"
                                    type="text"
                                    onChange={e => this.setState({company_phone: e.target.value})}
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
                        {this.renderButton()}
                        {this.renderSnackbar()}
                    </form>
                </Cell>
            </Grid>
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
        combineCallJoinAndCreateCompany: (fb_id, co_name, co_email, co_phone, co_pri_con_full_name, co_pri_con_email, co_pri_con_phone) => {
            dispatch(postUserCompanyJoinInfo(fb_id))
                .then((companyId) => {
                    dispatch(addCompanyInfo(companyId.value.data[0].company_id, {
                            company_name: co_name,
                            company_email: co_email,
                            company_phone: co_phone,
                            primary_contact_full_name: co_pri_con_full_name,
                            primary_contact_email: co_pri_con_email,
                            primary_contact_phone_number: co_pri_con_phone
                        }
                    ))
                })
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Company);
