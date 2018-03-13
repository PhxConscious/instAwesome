import React, {Component} from "react";
import '../../Styles/FormsStyles.css';
import {connect} from 'react-redux';
import {addCompanyInfo} from "../../redux/actions/companyInfo";
import {postUserCompanyJoinInfo} from "../../redux/actions/userCompanyJoin";
import axios from 'axios';

class Company extends Component {
    componentDidMount() {
        this.props.currentValues
    }

    constructor(props) {
        super(props);
        this.state = {
            form: {
              company_name: ''
            },
            styleGuide: '',
            primaryGoal: '',
            error: '',
            loading: false
        };
        this.addNewCompany = this.addNewCompany.bind(this);
        this.onButtonPress = this.onButtonPress.bind(this);
    }


    renderButton() {
        if (this.state.loading) {
            return <p id='prog1' className="mdl-spinner mdl-js-spinner mdl-spinner--single-color is-active"/>
        }
        return (
            <button
                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect formButton"
                onClick={(e) => this.onButtonPress(e)}>
                <span className='buttonText'>
                    UPDATE
                </span>
            </button>
        );
    }


    addNewCompany() {
      return new Promise((resolve) => {
        this.props.postUserCompanyJoinInfo(this.props.userFbId)
        setTimeout(()=>{
          resolve(this.props.userCompanyJoin.companyInfo.company_id)
        }, 1000)

      })
    }

    onButtonPress(e) {
      e.preventDefault();
      const {name, styleGuide, primaryGoal} = this.state;
      // if (name === '' || styleGuide === '' || primaryGoal === '') {
      //     return alert('Must fill in all fields')
      // }

      this.addNewCompany()
        .then(companyId => {
            this.props.createNewCompany(companyId, this.state.form)
            alert(`You created company:  ${this.state.form.company_name}`)
        })
    }



    render() {
        return (
            <div>
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
                                name='name'
                                className="formInput"
                                type="text"
                                onChange={e=>this.setState({form:{company_name:e.target.value}})}
                                placeholder='input company name'
                                value={this.state.form.company_name}>
                            </input>
                        </div>
                        {/*<div className="formInputCont">*/}
                        {/*<div>*/}
                        {/*<p className='inputLabel'>STYLE GUIDE</p>*/}
                        {/*</div>*/}
                        {/*<input*/}
                        {/*name='styleGuide'*/}
                        {/*className="formInput"*/}
                        {/*type="text"*/}
                        {/*onChange={this.handleInputTextChange}*/}
                        {/*placeholder='https://phxconscious.com'*/}
                        {/*value={this.state.styleGuide}>*/}
                        {/*</input>*/}
                        {/*</div>*/}
                        {/*<div className="formInputCont">*/}
                        {/*<div>*/}
                        {/*<p className='inputLabel'>PRIMARY GOAL</p>*/}
                        {/*</div>*/}
                        {/*<input*/}
                        {/*name='primaryGoal'*/}
                        {/*className="formInput"*/}
                        {/*type="text"*/}
                        {/*onChange={this.handleInputTextChange}*/}
                        {/*placeholder='Brand awareness'*/}
                        {/*value={this.state.primaryGoal}>*/}
                        {/*</input>*/}
                        {/*</div>*/}
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
        createNewCompany: (companyId, companyObj) => {
            dispatch(addCompanyInfo(companyId, companyObj))
        },
        postUserCompanyJoinInfo: (fb_id) => {
            dispatch(postUserCompanyJoinInfo(fb_id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Company);
