import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {postFeedback} from '../../redux/actions/feedback';
import {getUsersOfExpert} from '../../redux/actions/userExpertJoin';
import {getUserCompanyJoinInfo} from '../../redux/actions/userCompanyJoin';
import {getCompletedLessons, getCompletedQuestionStatus} from "../../utils/helper";
import Gradient from "../Reusable/Gradient";

class ExpertDashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {userObj: {}}
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
        const {user, userInfo, userExpertJoin, userCompanyJoin} = this.props;
        let {userObj} = this.state;
        console.log("userCompanyJoin", userCompanyJoin);
        console.log('&&&&&&&&&&&&&&&&&&&&!!!!!!!!!!&&&&&&&&&&&&&&&&&&&&', this.state.userObj);
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

          if(userInfo.isExpert){
            return (
                <div style={{width: "80vw", margin: "0 auto", marginTop: "100px"}}>
                    <div>
                        <div className="fullPanelContainer">

                            <div className="leftPanelSelector">
                                <strong>User List</strong>
                                {userList}
                            </div>

                            <div className="rightPanelDetail">
                                <p>name: {userObj.first_name} {userObj.last_name}</p>
                                <p>email: {userObj.user_email}</p>
                                <p>phone: {userObj.user_phone}</p>
                                <p>completed lessons: {userCompanyJoin.companyInfo ? <ul>{getCompletedLessons(userObj.user_progress).map(lesson => <li>{lesson}</li>)}</ul> : ''}</p>
                                <p>user's LMS progress: {userCompanyJoin.companyInfo ? getCompletedQuestionStatus(userObj.user_progress) : ''}%</p>
                                <hr/>
                                <p>company: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.company_name : ''}</p>
                                <p>company
                                    website: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.company_website : ''}</p>
                                <p>content
                                    creator: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.company_content_creator : ''}</p>

                                <p>storage
                                    locale: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.cloudbased_storage_locale : ''}</p>

                                <p>company
                                    phone: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.company_phone : ''}</p>
                                <p>company primary
                                    goals: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.company_primary_goal : ''}</p>
                                <hr/>
                                <p>instagram
                                    username: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.instagram_username : ''}</p>
                                <p>instagram goal
                                    #1: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.insta_goal1 : ''}</p>
                                <p>instagram goal
                                    #2: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.insta_goal2 : ''}</p>
                                <p>instagram goal
                                    #3: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.insta_goal3 : ''}</p>
                                <p>instagram
                                    bio: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.instagram_bio : ''}</p>
                                <p>instagram
                                    goals: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.instagram_goals : ''}
                                    <strong> isnt this redundant?</strong></p>
                                <hr/>
                                <p>facebook
                                    url: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.facebook_page_url : ''}</p>
                                <p>facebook
                                    goals: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.facebook_goals : ''}</p>
                                <hr/>
                                <p>google business
                                    profile: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.google_business_profile : ''}</p>
                                <p>google plus
                                    goals: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.google_plus_goals : ''}</p>
                                <p>google plus
                                    profile: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.google_plus_profile_url : ''}</p>
                                <p>google search
                                    goals: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.google_search_goals : ''}</p>
                                <hr/>
                                <p>linkedIn
                                    goals: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.linkedin_goals : ''}</p>
                                <p>linkedIn
                                    profile: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.linkedin_profile : ''}</p>
                                <hr/>
                                <p>pinterest
                                    goals: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.pinterest_goals : ''}</p>
                                <p>pinterest
                                    profile: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.pinterest_profile : ''}</p>
                                <hr/>
                                <p>twitter
                                    username: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.twitter_username : ''}</p>
                                <p>twitter
                                    goals: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.twitter_goals : ''}</p>
                                <hr/>
                                <p>yelp business
                                    profile: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.yelp_business_profile : ''}</p>
                                <p>yelp
                                    goals: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.yelp_goals : ''}</p>
                                <hr/>
                                <p>BBB
                                    profile: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.better_business_bureau_profile : ''}</p>
                                <p>BBB
                                    goals: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.better_business_bureau_goals : ''}</p>
                                <hr/>
                                <p>youtube
                                    profile: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.youtube_url : ''}</p>
                                <p>vimeo
                                    profile: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.vimeo_url : ''}</p>
                                <p>youtube & vimeo
                                    goals: {userCompanyJoin.companyInfo ? userCompanyJoin.companyInfo.youtube_vimeo_goals : ''}</p>
                            </div>
                        </div>

                    </div>
                </div>
            )
          } else {
            return <div style={{marginTop: "10vh", display: "flex", justifyContent: "center", alignItems: "center"}} ><h3 style={{width: "75vw"}}>Please log into your account or request expert permissions if you are not authorized to view the expert panel</h3></div>
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
}
const mapDispatchToProps = dispatch => {
    return {
        getUsersOfExpert: (expert_id) => {
            dispatch(getUsersOfExpert(expert_id))
        },
        getCompanyOfUser: (fb_id) => {
            dispatch(getUserCompanyJoinInfo(fb_id))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpertDashboard);
