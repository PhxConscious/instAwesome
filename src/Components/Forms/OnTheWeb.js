import React, {Component} from "react";
import '../../Styles/FormsStyles.css';
import {updateCompanyInfo, getCompanyList} from "../../redux/actions/companyInfo";
import {connect} from "react-redux";
import {Grid, Cell, Snackbar} from 'react-mdl';

class OnTheWeb extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company_content_creator: '',
            company_brand_id: '',
            company_primary_goal: '',
            company_style_guide: '',
            company_website: '',
            google_search_goals: '',
            google_business_profile: '',
            instagram_username: '',
            instagram_goals: '',
            instagram_bio: '',
            insta_goal1: '',
            insta_goal2: '',
            insta_goal3: '',
            cloudbased_storage_locale: '',
            facebook_page_url: '',
            facebook_goals: '',
            twitter_username: '',
            twitter_goals: '',
            linkedin_profile_url: '',
            linkedin_goals: '',
            google_plus_url: '',
            google_plus_goals: '',
            youtube_url: '',
            vimeo_url: '',
            youtube_vimeo_goals: '',
            pinterest_profile: '',
            pinterest_goals: '',
            yelp_business_profile: '',
            yelp_goals: '',
            better_business_bureau_profile: '',
            better_business_bureau_goals: '',
            errorWarnings: [],
            isError: false,
            snackBarActive:false,
        };
        // this.pullInUserValues = this.pullInUserValues.bind(this);
        this.validateFBUrl = this.validateFBUrl.bind(this);
        this.validateTwitterUsername = this.validateTwitterUsername.bind(this);
    }

    componentDidMount() {
        let {companyInfo} = this.props;
        if (companyInfo && companyInfo.companyList && companyInfo.companyList[0]) {
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
        this.setState({
          errorWarnings: [],
          snackBarActive:false,
        })
        this.validateFBUrl(this.state.facebook_page_url);
        this.validateTwitterUsername(this.state.twitter_username);
        let me = this;

        setTimeout(function(){
          if(me.state.errorWarnings.length === 0) {
            me.props.addCompanyInfo(me.props.companyInfo.companyList && me.props.companyInfo.companyList[0].company_id, me.state)
          } else {
            me.setState({snackBarActive:true})
          }
        }, 500)
    }

    renderButton() {
        if (!this.state.loading) {
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
    }

    handleInputTextChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    validateFBUrl = (fb) => {
      let base = "https://facebook.com/"

      // validates anything with correct base or empty string
      if((fb.substring(0,21) === base || fb.length === 0)){
        return true;
      }

      let warning = 'Your facebook url should look like this: https://facebook.com/yourUserName. \n Enter your facebook url or leave this field blank.'

      let newArr = this.state.errorWarnings;

      if(!this.state.errorWarnings.includes(warning)){
        newArr = this.state.errorWarnings.concat(warning);
      }
      this.setState({errorWarnings: newArr, isError: true})
    }

    validateTwitterUsername(twit){
      if((twit.substring(0,1)==="@" && twit.length >= 3 && !twit.includes(" ")) || twit.length === 0){
        return true;
      }

      let warning = "Your twitter user name should begin with '@' and have no spaces";
      let newArr = this.state.errorWarnings;

      if(!this.state.errorWarnings.includes(warning)){
        newArr = this.state.errorWarnings.concat(warning);
      }

      this.setState({errorWarnings: newArr, isError: true})
    }

    render() {
        return (
            <div>
                <Grid>

                    <Cell col={8} offsetDesktop={2} tablet={12} phone={12}>
                      <Snackbar
                        style={{width:"100%"}}
                        active={this.state.snackBarActive}
                        onClick={e=>this.setState({isError:false, errorWarnings:[], snackBarActive:false})}
                        onTimeout={e=>this.setState({snackBarActive: false})}
                        action="OK"
                      >
                        {this.state.errorWarnings.map((warning, i)=>{
                          return <div key={i}>* {warning}</div>
                        })}
                      </Snackbar>
                        <form className="formCont" action="#">
                            <div className='inputCont'>
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>WEBSITE</p>
                                    </div>
                                    <input
                                        name='company_website'
                                        className="formInput"
                                        type="text"
                                        onChange={this.handleInputTextChange}
                                        placeholder='https://phxconscious.com'
                                        value={this.state.company_website}>
                                    </input>
                                </div>
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>GOOGLE SEARCH GOALS</p>
                                    </div>
                                    <input
                                        name='google_search_goals'
                                        className="formInput"
                                        type="text"
                                        onChange={this.handleInputTextChange}
                                        placeholder="top result for 'conscious creative' and 'creative startup studio'"
                                        value={this.state.google_search_goals}>
                                    </input>
                                </div>
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>GOOGLE BUSINESS PROFILE</p>
                                    </div>
                                    <input
                                        name='google_business_profile'
                                        className="formInput"
                                        type="text"
                                        onChange={this.handleInputTextChange}
                                        placeholder='https://google.com/maps/place/...'
                                        value={this.state.google_business_profile}>
                                    </input>
                                </div>
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>INSTAGRAM USERNAME</p>
                                    </div>
                                    <input
                                        name='instagram_username'
                                        className="formInput"
                                        type="text"
                                        onChange={this.handleInputTextChange}
                                        placeholder='@phxconscious'
                                        value={this.state.instagram_username}>
                                    </input>
                                </div>
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>INSTAGRAM GOALS</p>
                                    </div>
                                    <input
                                        name='instagram_goals'
                                        className="formInput"
                                        type="text"
                                        onChange={this.handleInputTextChange}
                                        placeholder='brand awareness, community recruiting'
                                        value={this.state.instagram_goals}>
                                    </input>
                                </div>
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>FACEBOOK PAGE URL</p>
                                    </div>
                                    <input
                                        name='facebook_page_url'
                                        className="formInput"
                                        type="text"
                                        onChange={this.handleInputTextChange}
                                        placeholder='https://facebook.com/phxconscious'
                                        value={this.state.facebook_page_url}>
                                    </input>
                                </div>
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>FACEBOOK GOALS</p>
                                    </div>
                                    <input
                                        name='facebook_goals'
                                        className="formInput"
                                        type="text"
                                        onChange={this.handleInputTextChange}
                                        placeholder='messenger funnel into website'
                                        value={this.state.facebook_goals}>
                                    </input>
                                </div>
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>TWITTER USERNAME</p>
                                    </div>
                                    <input
                                        name='twitter_username'
                                        className="formInput"
                                        type="text"
                                        onChange={this.handleInputTextChange}
                                        placeholder='@phxconscious'
                                        value={this.state.twitter_username}>
                                    </input>
                                </div>
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>TWITTER GOALS</p>
                                    </div>
                                    <input
                                        name='twitter_goals'
                                        className="formInput"
                                        type="text"
                                        onChange={this.handleInputTextChange}
                                        placeholder='brand awareness, community recruiting'
                                        value={this.state.twitter_goals}>
                                    </input>
                                </div>
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>LINKEDIN PROFILE URL</p>
                                    </div>
                                    <input
                                        name='linkedin_profile_url'
                                        className="formInput"
                                        type="text"
                                        onChange={this.handleInputTextChange}
                                        placeholder='https://linkedin.com/company/phxconscious/'
                                        value={this.state.linkedin_profile_url}>
                                    </input>
                                </div>
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>LINKEDIN GOALS</p>
                                    </div>
                                    <input
                                        name='linkedin_goals'
                                        className="formInput"
                                        type="text"
                                        onChange={this.handleInputTextChange}
                                        placeholder='building credibility, community recruiting, forming partnerships'
                                        value={this.state.linkedin_goals}>
                                    </input>
                                </div>
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>GOOGLE+ URL</p>
                                    </div>
                                    <input
                                        name='google_plus_url'
                                        className="formInput"
                                        type="text"
                                        onChange={this.handleInputTextChange}
                                        placeholder='https://phxconscious.com'
                                        value={this.state.google_plus_url}>
                                    </input>
                                </div>
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>GOOGLE PLUS GOALS</p>
                                    </div>
                                    <input
                                        name='google_plus_goals'
                                        className="formInput"
                                        type="text"
                                        onChange={this.handleInputTextChange}
                                        placeholder='general brand awareness, SEO'
                                        value={this.state.google_plus_goals}>
                                    </input>
                                </div>
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>YOUTUBE URL</p>
                                    </div>
                                    <input
                                        name='youtube_url'
                                        className="formInput"
                                        type="text"
                                        onChange={this.handleInputTextChange}
                                        placeholder='https://www.youtube.com/channel/UCxBENO8Q1MdIgMBqEupL7hQ'
                                        value={this.state.youtube_url}>
                                    </input>
                                </div>
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>VIMEO URL</p>
                                    </div>
                                    <input
                                        name='vimeo_url'
                                        className="formInput"
                                        type="text"
                                        onChange={this.handleInputTextChange}
                                        placeholder='https://vimeo.com/phxconsious'
                                        value={this.state.vimeo_url}>
                                    </input>
                                </div>
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>YOUTUBE/VIMEO GOALS</p>
                                    </div>
                                    <input
                                        name='youtube_vimeo_goals'
                                        className="formInput"
                                        type="text"
                                        onChange={this.handleInputTextChange}
                                        placeholder='exposing content, building credibility, recruiting talent'
                                        value={this.state.youtube_vimeo_goals}>
                                    </input>
                                </div>
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>PINTEREST PROFILE</p>
                                    </div>
                                    <input
                                        name='pinterest_profile'
                                        className="formInput"
                                        type="text"
                                        onChange={this.handleInputTextChange}
                                        placeholder=''
                                        value={this.state.pinterest_profile}>
                                    </input>
                                </div>
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>PINTEREST GOALS</p>
                                    </div>
                                    <input
                                        name='pinterest_goals'
                                        className="formInput"
                                        type="text"
                                        onChange={this.handleInputTextChange}
                                        placeholder=''
                                        value={this.state.pinterest_goals}>
                                    </input>
                                </div>
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>YELP BUSINESS PROFILE</p>
                                    </div>
                                    <input
                                        name='yelp_business_profile'
                                        className="formInput"
                                        type="text"
                                        onChange={this.handleInputTextChange}
                                        placeholder=''
                                        value={this.state.yelp_business_profile}>
                                    </input>
                                </div>
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>YELP GOALS</p>
                                    </div>
                                    <input
                                        name='yelp_goals'
                                        className="formInput"
                                        type="text"
                                        onChange={this.handleInputTextChange}
                                        placeholder=''
                                        value={this.state.yelp_goals}>
                                    </input>
                                </div>
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>BETTER BUSINESS BUREAU PROFILE</p>
                                    </div>
                                    <input
                                        name='better_business_bureau_profile'
                                        className="formInput"
                                        type="text"
                                        onChange={this.handleInputTextChange}
                                        placeholder=''
                                        value={this.state.better_business_bureau_profile}>
                                    </input>
                                </div>
                                <div className="formInputCont">
                                    <div>
                                        <p className='inputLabel'>BETTER BUSINESS BUREAU GOALS</p>
                                    </div>
                                    <input
                                        name='better_business_bureau_goals'
                                        className="formInput"
                                        type="text"
                                        onChange={this.handleInputTextChange}
                                        placeholder=''
                                        value={this.state.better_business_bureau_goals}>
                                    </input>
                                </div>
                            </div>
                            <br/>
                            <div className='formBtnCont'>
                                {this.renderButton()}
                            </div>
                        </form>
                    </Cell>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentValues: state.currentValues,
    userFbId: state.currentValues.currentFbId,
    companyInfo: state.companyInfo,
});

const mapDispatchToProps = dispatch => {
    return {
        addCompanyInfo: (companyId, companyObj) => {
            dispatch(updateCompanyInfo(companyId, companyObj))
        },
        getCompanyList: (fb_id) => {
            dispatch(getCompanyList(fb_id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OnTheWeb)
