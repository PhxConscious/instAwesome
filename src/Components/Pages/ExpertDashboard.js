import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {getUsersOfExpert} from '../../redux/actions/userExpertJoin';
import {getUserCompanyJoinInfo} from '../../redux/actions/userCompanyJoin';
import {getCompletedLessons, getCompletedQuestionStatus} from "../../utils/helper";
import '../../Styles/ExpertDashboardStyles.css';

class ExpertDashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {userObj: {}};
        this.selectUser = this.selectUser.bind(this);
        // this.select = this.select.bind(this);
    }


    componentWillMount() {
        this.props.getUsersOfExpert(this.props.userInfo.firebase_id)
    }


    selectUser(user) {
        this.setState({userObj: user})
        this.props.getCompanyOfUser(user.firebase_id);
    }


    render() {
        const {userInfo, userExpertJoin, userCompanyJoin} = this.props;
        let {userObj} = this.state;

        if (typeof(userInfo.currentUser) === undefined) {
            return <Redirect to='/'/>
        }

        let listOfUsersOfExpert;
        let userList;

        if (userExpertJoin && userExpertJoin.usersOfExpert) {
            listOfUsersOfExpert = userExpertJoin.usersOfExpert;
            userList = listOfUsersOfExpert.map((user, i) => {
                return <div
                    key={i}
                    user={user}
                    onClick={e => this.selectUser(user)}
                >
                    {user.first_name} {user.last_name}
                </div>
            })
        }


        if (userExpertJoin && userExpertJoin.usersOfExpert) {
            if (userInfo.isExpert) {
                return (
                    <div className="fullPanelContainer">
                        <div className="leftPanelSelector">
                            <div className='panelTitleCont'>
                                <p className='leftPanelTitle'>User List</p>
                            </div>
                            {userList}
                        </div>
                        <div className="rightPanelDetail">
                            <div className='panelTitleCont'>
                                <p className='rightPanelTitle'>User Details</p>
                            </div>
                            <p>name: {userObj.first_name} {userObj.last_name}</p>
                            <p>email: {userObj.user_email}</p>
                            <p>phone: {userObj.user_phone}</p>
                            <p>completed lessons: {userCompanyJoin.companyInfo ?
                                <ul>{getCompletedLessons(userObj.user_progress).map(lesson =>
                                    <li>{lesson}</li>)}</ul> : ''}</p>
                            <p>user's LMS progress: {userCompanyJoin.companyInfo ? getCompletedQuestionStatus(userObj.user_progress) : ''}%</p>
                            <hr/>

                            <p className='rightPanelSectionTitles'>Company Information</p>
                            <p>name: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.company_name : ''}</p>
                            <p>website: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.company_website : ''}</p>
                            <p>content creator: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.company_content_creator : ''}</p>
                            <p>storage locale: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.cloudbased_storage_locale : ''}</p>
                            <p>phone: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.company_phone : ''}</p>
                            <p>primary goals: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.company_primary_goal : ''}</p>
                            <hr/>

                            <p className='rightPanelSectionTitles'>Instagram</p>
                            <p>username: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.instagram_username : ''}</p>
                            <p>goal #1: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.insta_goal1 : ''}</p>
                            <p>goal #2: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.insta_goal2 : ''}</p>
                            <p>goal #3: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.insta_goal3 : ''}</p>
                            <p>
                                bio: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.instagram_bio : ''}</p>
                            {/*<p>goals: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.instagram_goals : ''}*/}
                                {/*<strong> isnt this redundant?</strong></p>*/}
                            <hr/>

                            <p className='rightPanelSectionTitles'>Facebook</p>
                            <p>url: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.facebook_page_url : ''}</p>
                            <p>goals: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.facebook_goals : ''}</p>
                            <hr/>

                            <p className='rightPanelSectionTitles'>Google Plus</p>
                            <p>business profile: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.google_business_profile : ''}</p>
                            <p>goals: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.google_plus_goals : ''}</p>
                            <p>profile: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.google_plus_profile_url : ''}</p>
                            <p>goals: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.google_search_goals : ''}</p>
                            <hr/>

                            <p className='rightPanelSectionTitles'>LinkedIn</p>
                            <p>goals: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.linkedin_goals : ''}</p>
                            <p>profile: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.linkedin_profile : ''}</p>
                            <hr/>

                            <p className='rightPanelSectionTitles'>Pinterest</p>
                            <p>goals: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.pinterest_goals : ''}</p>
                            <p>profile: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.pinterest_profile : ''}</p>
                            <hr/>

                            <p className='rightPanelSectionTitles'>Twitter</p>
                            <p>username: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.twitter_username : ''}</p>
                            <p>goals: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.twitter_goals : ''}</p>
                            <hr/>

                            <p className='rightPanelSectionTitles'>Yelp</p>
                            <p>business profile: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.yelp_business_profile : ''}</p>
                            <p>goals: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.yelp_goals : ''}</p>
                            <hr/>

                            <p className='rightPanelSectionTitles'>BBB</p>
                            <p>profile: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.better_business_bureau_profile : ''}</p>
                            <p>goals: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.better_business_bureau_goals : ''}</p>
                            <hr/>

                            <p className='rightPanelSectionTitles'>Youtube/Vimeo</p>
                            <p>youtube profile: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.youtube_url : ''}</p>
                            <p>vimeo profile: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.vimeo_url : ''}</p>
                            <p>youtube & vimeo goals: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.youtube_vimeo_goals : ''}</p>
                        </div>
                    </div>
                )
            } else {
                return <div
                    style={{marginTop: "10vh", display: "flex", justifyContent: "center", alignItems: "center"}}><h3
                    style={{width: "75vw"}}>Please log into your account or request expert permissions if you are not
                    authorized to view the expert panel</h3></div>
            }

        } else {
            return <div>loading expert panel...</div>
        }
    }
}


const mapStateToProps = state => {
    return {
        userInfo: state.userProgress.currentUser,
        userExpertJoin: state.userExpertJoin,
        userCompanyJoin: state.userCompanyJoin,
    }
};


const mapDispatchToProps = dispatch => {
    return {
        getUsersOfExpert: (expert_id) => {
            dispatch(getUsersOfExpert(expert_id))
        },
        getCompanyOfUser: (fb_id) => {
            dispatch(getUserCompanyJoinInfo(fb_id))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpertDashboard);
