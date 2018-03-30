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
                    this.onButtonPress()
                }}>
                <span className='buttonText'>
                    UPDATE
                </span>
            </button>
        );
    }


    addNewCompany() {
        const {company_name, company_email, company_phone} = this.state;
        this.props.combineCallJoinAndCreateCompany(this.props.userFbId, company_name, company_email, company_phone)
    }


    onButtonPress() {
        const {company_name, company_email, company_phone} = this.state;
        if (company_name === '' || company_email === '' || company_phone === '') {
            this.setState({snackbarText: 'Must fill in all fields'});
            this.handleShowSnackbar();
            return;
        }
        if(!this.ValidateEmail(company_email)) {
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
            this.setState({snackbarText: 'Congrats! You\'ve successfully added your company!'});
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
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        {
            return (true)
        }
        // alert("You have entered an invalid email address!");
        return (false)
    };



    render() {
        const {company_email, company_name, company_phone} = this.state;
        return (
            <Grid>
                <Cell col={8} offsetDesktop={2} tablet={12} phone={12}>
                    {/*<h5>ADD YOUR COMPANY</h5>*/}
                    <form className="formCont" action="#">
                        <div className='inputCont'>
                            {/*<div className='formTitleCont'>*/}
                            {/*<p className="formTitle">COMPANY</p>*/}
                            {/*</div>*/}

                            <div className="formInputCont">
                                <div>
                                    <p className='inputLabel'>NAME</p>
                                </div>
                                <input
                                    name='name'
                                    className="formInput"
                                    type="text"
                                    onChange={e => this.setState({company_name: e.target.value})}
                                    placeholder='input company name'
                                    value={this.state.company_name}>
                                </input>
                            </div>
                            <div className="formInputCont">
                                <div>
                                    <p className='inputLabel'>COMPANY EMAIL</p>
                                </div>
                                <input
                                    name='email'
                                    className="formInput"
                                    type="text"
                                    onChange={e => this.setState({company_email: e.target.value})}
                                    placeholder='input company email'
                                    value={this.state.company_email}>
                                </input>
                            </div>
                            <div className="formInputCont">
                                <div>
                                    <p className='inputLabel'>COMPANY PHONE</p>
                                </div>
                                <input
                                    name='phone'
                                    className="formInput"
                                    type="text"
                                    onChange={e => this.setState({company_phone: e.target.value})}
                                    placeholder='input company phone number'
                                    value={this.state.company_phone}>
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
        combineCallJoinAndCreateCompany: (firebase_id, co_name, co_email, co_phone) => {
            dispatch(postUserCompanyJoinInfo(firebase_id))
                .then((companyId) => {
                    dispatch(addCompanyInfo(companyId.value.data[0].company_id, {
                            company_name: co_name,
                            company_email: co_email,
                            company_phone: co_phone
                        }
                    ))
                })
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Company);
