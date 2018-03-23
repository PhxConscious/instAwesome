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

    componentDidMount(){
        let { companyInfo } = this.props;
        if(companyInfo && companyInfo.companyList && companyInfo.companyList[0]){
            this.setState({
                company_content_creator: companyInfo.companyList[0].company_content_creator,
                company_brand_id: companyInfo.companyList[0].company_brand_id,
                company_primary_goal: companyInfo.companyList[0].company_primary_goal,
                company_style_guide: companyInfo.companyList[0].company_style_guide,
                company_website: companyInfo.companyList[0].company_website,
                google_search_goals: companyInfo.companyList[0].google_search_goals,
                google_business_profile: companyInfo.companyList[0].google_business_profile,
                instagram_username: companyInfo.companyList[0].instagram_username,
                instagram_goals: companyInfo.companyList[0].instagram_goals,
                instagram_bio: companyInfo.companyList[0].instagram_bio,
                insta_goal1: companyInfo.companyList[0].insta_goal1,
                insta_goal2: companyInfo.companyList[0].insta_goal2,
                insta_goal3: companyInfo.companyList[0].insta_goal3,
                cloudbased_storage_locale: companyInfo.companyList[0].cloudbased_storage_locale,
                facebook_page_url: companyInfo.companyList[0].facebook_page_url,
                facebook_goals: companyInfo.companyList[0].facebook_goals,
                twitter_username: companyInfo.companyList[0].twitter_username,
                twitter_goals: companyInfo.companyList[0].twitter_goals,
                linkedin_profile_url: companyInfo.companyList[0].linkedin_profile_url,
                linkedin_goals: companyInfo.companyList[0].linkedin_goals,
                google_plus_url: companyInfo.companyList[0].google_plus_url,
                google_plus_goals: companyInfo.companyList[0].google_plus_goals,
                youtube_url: companyInfo.companyList[0].youtube_url,
                vimeo_url: companyInfo.companyList[0].vimeo_url,
                youtube_vimeo_goals: companyInfo.companyList[0].youtube_vimeo_goals,
                pinterest_profile: companyInfo.companyList[0].pinterest_profile,
                pinterest_goals: companyInfo.companyList[0].pinterest_goals,
                yelp_business_profile: companyInfo.companyList[0].yelp_business_profile,
                yelp_goals: companyInfo.companyList[0].yelp_goals,
                better_business_bureau_profile: companyInfo.companyList[0].better_business_bureau_profile,
                better_business_bureau_goals: companyInfo.companyList[0].better_business_bureau_goals
            })
        }

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
