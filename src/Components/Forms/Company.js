import React, {Component} from "react";
import '../../Styles/FormsStyles.css';
import {connect} from 'react-redux';
import {updateCompanyInfo} from "../../redux/actions/companyInfo";
import {postUserCompanyJoinInfo} from "../../redux/actions/userCompanyJoin";

class Company extends Component {
    componentDidMount() {
        this.props.currentValues
    }

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            styleGuide: '',
            primaryGoal: '',
            error: '',
            loading: false
        };
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

    onButtonPress(e) {
      e.preventDefault();
        const {name, styleGuide, primaryGoal} = this.state;
        // if (name === '' || styleGuide === '' || primaryGoal === '') {
        //     return alert('Must fill in all fields')
        // }

        this.props.postUserCompanyJoinInfo(this.props.userFbId)
        // .then((response) => {
        //   console.log("already sent postUserCompanyJoinInfo dispatch", response)
        //   this.props.updateCompanyInfo('testCompanyId', {
        //       company_name: name
        //       // style_guide: styleGuide,
        //       // primary_goal: primaryGoal
        //   })
        // })



            // .then(
            //     alert('you have successfully completed this form')
            // )
    }

    handleInputTextChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        // console.log('this is the current user fb id ', this.props.userFbId);
        console.log('this is the current company info ', this.props.companyInfo)
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
                                onChange={this.handleInputTextChange}
                                placeholder='input company name'
                                value={this.state.name}>
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
    userFbId: state.currentValues.currentFbId
});

const mapDispatchToProps = dispatch => {
    return {
        updateCompanyInfo: (companyObj) => {
            dispatch(updateCompanyInfo(companyObj))
        },
        postUserCompanyJoinInfo: (fb_id) => {
            dispatch(postUserCompanyJoinInfo(fb_id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Company);
