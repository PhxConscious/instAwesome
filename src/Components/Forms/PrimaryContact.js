import React, {Component} from "react";
import '../../Styles/FormsStyles.css';
import {connect} from 'react-redux';
import {updateCompanyInfo} from "../../redux/actions/companyInfo";
import {Grid, Cell, Snackbar} from 'react-mdl';

class PrimaryContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            primary_contact_full_name: '',
            primary_contact_phone_number: '',
            primary_contact_email: '',
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
                primary_contact_full_name: companyInfo.companyList[0].primary_contact_full_name,
                primary_contact_phone_number: companyInfo.companyList[0].primary_contact_phone_number,
                primary_contact_email: companyInfo.companyList[0].primary_contact_email
            })
        }
    }


    onButtonPress() {
        const {primary_contact_full_name, primary_contact_phone_number, primary_contact_email} = this.state;
        this.setState({snackbarText: ''});

        if (primary_contact_full_name === '' || primary_contact_phone_number === '' || primary_contact_email === '') {
            this.setState({snackbarText: 'Must fill in all fields'});
            this.handleShowSnackbar();
            return;
        }
        if (!this.ValidateEmail(primary_contact_email)) {
            this.setState({snackbarText: 'Invalid email format'});
            this.handleShowSnackbar();
            return;
        }
        this.props.addCompanyInfo(this.props.companyInfo.companyList && this.props.companyInfo.companyList[0].company_id, this.state);
        if (this.props.companyInfo.status !== 200) {
            return alert('update failed')
        } else {
            this.setState({snackbarText: 'Update Successful'});
            this.handleShowSnackbar();
        }
    }


    renderButton() {
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
        return (false)
    };


    handleInputTextChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };


    render() {
        return (
            <Grid>
                <Cell col={8} offsetDesktop={2} tablet={12} phone={12}>
                    <form className="formCont" action="#">
                        <div className='inputCont'>
                            {/*<div className='formTitleCont'>*/}
                            {/*<p className="formTitle">PRIMARY CONTACT</p>*/}
                            {/*</div>*/}
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
                        {this.renderSnackbar()}
                    </form>
                </Cell>
            </Grid>
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
