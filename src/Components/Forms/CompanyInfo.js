import React, {Component} from "react";
import '../../Styles/FormsStyles.css';
import {connect} from 'react-redux';
import {updateCompanyInfo} from "../../redux/actions/companyInfo";

class CompanyInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company_name: '',
            company_email: '',
            company_phone: '',
            error: '',
            loading: false
        };
    }

    componentDidMount() {
        let {companyInfo} = this.props;
        if (companyInfo && companyInfo.companyList && companyInfo.companyList[0]) {
            this.setState({
                company_name: companyInfo.companyList[0].company_name,
                company_email: companyInfo.companyList[0].company_email,
                company_phone: companyInfo.companyList[0].company_phone
            })
        }
    }

    renderButton() {
        if (this.state.loading) {
            return <p className=""/>
        }
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

    handleInputTextChange = e => {
        this.setState({[e.target.name]: e.target.value});
        // console.log(`this is the current state ${this.state}`)
    };


    render() {
        return (
            <div>
                <h5><span className='consciousBlueColor'>Edit Your Company Info</span></h5>
                <form className="formCont" action="#">
                    <div className='inputCont'>
                        <div className='formTitleCont'>
                            <p className="formTitle">COMPANY</p>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>NAME</p>
                            </div>
                            <input
                                name='company_name'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder='input company name'
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
                                placeholder='input company email'
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
                                placeholder='input company phone number'
                                value={this.state.company_phone}>
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