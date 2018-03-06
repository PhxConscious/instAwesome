import React, {Component} from "react";
import '../../Styles/FormsStyles.css';

class OnTheWeb extends Component {
    constructor(props) {
        super(props);
        this.state = {
            website: '',
            googleSearchGoals: '',
            googleBusinessProfile: '',
            instgramUserName: '',
            instagramGoals: '',
            facebookPageUrl: '',
            facebookGoals: '',
            twitterUsername: '',
            twitterGoals: '',
            linkedinProfileUrl: '',
            linkedinGoals: '',
            googlePlusUrl: '',
            googlePlusGoals: '',
            youtubeUrl: '',
            vimeoUrl: '',
            youtubeVimeoGoals: '',
            pinterestProfile: '',
            pinterestGoals: '',
            yelpBusinessProfile: '',
            yelpGoals: '',
            bbbProfile: '',
            bbbGoals: '',
            error: '',
            loading: false
        };
    }

    onButtonPress() {
        this.setState({error: '', loading: true});
        console.log('button works and displays loading...')
    }

    renderButton() {
        if (this.state.loading) {
            return <p id='prog1' className="mdl-spinner mdl-js-spinner mdl-spinner--single-color is-active"></p>
        }
        return (
            <button
                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect formButton"
                onClick={() => this.onButtonPress()}>
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
                            <p className="formTitle">ON THE WEB</p>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>WEBSITE</p>
                            </div>
                            <input
                                name='website'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder='https://phxconscious.com'
                                value={this.state.website}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>GOOGLE SEARCH GOALS</p>
                            </div>
                            <input
                                name='googleSearchGoals'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder="top result for 'conscious creative' and 'creative startup studio'"
                                value={this.state.googleSearchGoals}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>GOOGLE BUSINESS PROFILE</p>
                            </div>
                            <input
                                name='googleBusinessProfile'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder='https://google.com/maps/place/...'
                                value={this.state.googleBusinessProfile}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>INSTAGRAM USERNAME</p>
                            </div>
                            <input
                                name='instgramUserName'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder='@phxconscious'
                                value={this.state.instgramUserName}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>INSTAGRAM GOALS</p>
                            </div>
                            <input
                                name='instagramGoals'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder='brand awareness, community recruiting'
                                value={this.state.instagramGoals}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>FACEBOOK PAGE URL</p>
                            </div>
                            <input
                                name='facebookPageUrl'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder='https://facebook.com/phxconscious'
                                value={this.state.facebookPageUrl}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>FACEBOOK GOALS</p>
                            </div>
                            <input
                                name='facebookGoals'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder='messenger funnel into website'
                                value={this.state.facebookGoals}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>TWITTER USERNAME</p>
                            </div>
                            <input
                                name='twitterUsername'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder='@phxconscious'
                                value={this.state.twitterUsername}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>TWITTER GOALS</p>
                            </div>
                            <input
                                name='twitterGoals'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder='brand awareness, community recruiting'
                                value={this.state.twitterGoals}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>LINKEDIN PROFILE URL</p>
                            </div>
                            <input
                                name='linkedinProfileUrl'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder='https://linkedin.com/company/phxconscious/'
                                value={this.state.linkedinProfileUrl}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>LINKEDIN GOALS</p>
                            </div>
                            <input
                                name='linkedinGoals'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder='building credibility, community recruiting, forming partnerships'
                                value={this.state.linkedinGoals}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>GOOGLE+ URL</p>
                            </div>
                            <input
                                name='googlePlusUrl'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder='https://phxconscious.com'
                                value={this.state.googlePlusUrl}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>GOOGLE PLUS GOALS</p>
                            </div>
                            <input
                                name='googlePlusGoals'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder='general brand awareness, SEO'
                                value={this.state.googlePlusGoals}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>YOUTUBE URL</p>
                            </div>
                            <input
                                name='youtubeUrl'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder='https://www.youtube.com/channel/UCxBENO8Q1MdIgMBqEupL7hQ'
                                value={this.state.youtubeUrl}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>VIMEO URL</p>
                            </div>
                            <input
                                name='vimeoUrl'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder='https://vimeo.com/phxconsious'
                                value={this.state.vimeoUrl}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>YOUTUBE/VIMEO GOALS</p>
                            </div>
                            <input
                                name='youtubeVimeoGoals'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder='exposing content, building credibility, recruiting talent'
                                value={this.state.youtubeVimeoGoals}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>PINTEREST PROFILE</p>
                            </div>
                            <input
                                name='pinterestProfile'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder=''
                                value={this.state.pinterestProfile}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>PINTEREST GOALS</p>
                            </div>
                            <input
                                name='pinterestGoals'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder=''
                                value={this.state.pinterestGoals}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>YELP BUSINESS PROFILE</p>
                            </div>
                            <input
                                name='yelpBusinessProfile'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder=''
                                value={this.state.yelpBusinessProfile}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>YELP GOALS</p>
                            </div>
                            <input
                                name='yelpGoals'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder=''
                                value={this.state.yelpGoals}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>BETTER BUSINESS BUREAU PROFILE</p>
                            </div>
                            <input
                                name='bbbProfile'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder=''
                                value={this.state.bbbProfile}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>BETTER BUSINESS BUREAU GOALS</p>
                            </div>
                            <input
                                name='bbbGoals'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder=''
                                value={this.state.bbbGoals}>
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

export default OnTheWeb;
