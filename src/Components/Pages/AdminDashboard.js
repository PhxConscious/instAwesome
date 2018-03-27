import React from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import { getFreeUsers, postNewUserExpertJoin } from '../../redux/actions/userExpertJoin';
import { getAllUsers, getAllExperts, deleteUser, updateNonCurrentUser } from '../../redux/actions/userProgress';
import UserListItem from '../Admin/UserListItem';
import UserOverview from '../Admin/UserOverview';
import ExpertOverview from '../Admin/ExpertOverview';
import { Tab, Tabs, Button } from 'react-mdl';
import '../../Styles/AdminDashboardStyles.css'

class AdminDashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {userObj: {}, activeTab: 0}
    this.selectUser = this.selectUser.bind(this);
    this.claimUser = this.claimUser.bind(this);
    this.removeExpert = this.removeExpert.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }
  componentWillMount(){
    this.props.getFreeUsers()
    this.props.getAllUsers()
    this.props.getAllExperts()
  }

  removeExpert(){
    console.log('expert', this.state.selectedExpert.firebase_id)
    this.props.updateUser(this.state.selectedExpert.firebase_id, {isExpert: false})
  }

  deleteUser(){
    this.props.deleteUser(this.state.selectedExpert.firebase_id);
  }

  selectUser(user){
    this.setState({userObj: user})
  }

  claimUser(user){
    let { userInfo } = this.props;
    this.props.postNewUserExpertJoin({
      user_id: user.firebase_id,
      expert_id: userInfo.firebase_id})
      this.setState({
        userObj:{}
      })
  }

  render(){
    const { userInfo, allUsers, allExperts, userExpertJoin } = this.props;

    if (typeof(userInfo.currentUser)===undefined) {
      return <Redirect to='/'/>
    }

    let freeUsers;
    // let unhitchedUsers
    // if(userExpertJoin && userExpertJoin.freeUsers){
    //   freeUsers = userExpertJoin.freeUsers;
    //   unhitchedUsers = freeUsers.map((user, i) => {
    //     return <UserListItem
    //               key={i}
    //               user={user}
    //               selectUser={this.selectUser}
    //             />
    //   })
    // }

    let userList;
    if(allUsers){
      userList = allUsers.map((user, i) => {
        return (
          <div
            id={this.state.index === i ? "selectedUserInList" : ''}
            index={i}
            key={i}
            onClick={e=>this.setState({selectedUser:user, index:i})}>
            {user.first_name}
          </div>
        )
      })
    }

    let expertsList;
    if(allExperts){
      expertsList = allExperts.map((expert, i) => {
        return (
          <div
            id={this.state.index === i ? "selectedUserInList" : ''}
            index={i}
            key={i}
            onClick={e=>this.setState({selectedExpert:expert, index:i})}>
            {expert.first_name}
          </div>
        )
      })
    }

    if(userExpertJoin && userExpertJoin.freeUsers && allUsers){

      if(userInfo.isAdmin){
        return (
          <div style={{width: "80vw", margin: "0 auto", marginTop: "100px"}}>
            <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
              <Tab>Users</Tab>
              <Tab>Experts</Tab>
              <Tab>Comments</Tab>
            </Tabs>
            <div>
              {this.state.activeTab === 0 ? <div
                className="fullPanelContainer">

                  <div className="leftPanelSelector">
                    <strong>User List</strong>
                      {userList}
                  </div>

                  <div className="rightPanelDetail">
                    {this.state.selectedUser ? <UserOverview user={this.state.selectedUser}/>:''}
                  </div>
                </div> : ''
              }
              {this.state.activeTab === 1 ? <div>
                <div className="fullPanelContainer">
                  <div className="leftPanelSelector">
                    <strong>Expert List</strong>
                      {expertsList}
                  </div>

                  <div className="rightPanelDetail">
                    {this.state.selectedExpert ? <ExpertOverview expert={this.state.selectedExpert}/>:''}
                    <div id="currentExpertButtons">

                      <Button raised accent ripple onClick={this.removeExpert}>remove expert permissions</Button>
                      <span style={{width: "1em"}}></span>
                      <Button raised accent ripple onClick={this.deleteUser}>delete account completely</Button>

                    </div>

                  </div>
                </div>
              </div> : ''
              }
              {this.state.activeTab === 2 ? <div>
                <div className="fullPanelContainer">
                  <div className="leftPanelSelector">
                    users
                  </div>

                  <div className="rightPanelDetail">

                    comments
                  </div>
                </div>
              </div> : ''
              }

            </div>

          </div>
        )
      } else {
        return <div style={{marginTop: "10vh", display: "flex", justifyContent: "center", alignItems: "center"}} ><h3 style={{width: "75vw"}}>Please login to view the Admin panel or request admin permissions if you're not currently authorized.</h3></div>
      }

    } else {
      return <div>loading expert panel...</div>
    }
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userProgress.currentUser,
    allUsers: state.userProgress.allUsers,
    allExperts: state.userProgress.expertList,
    userExpertJoin: state.userExpertJoin
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getFreeUsers: () => {
      dispatch(getFreeUsers())
    },
    postNewUserExpertJoin: (obj) => {
      dispatch(postNewUserExpertJoin(obj))
    },
    getAllUsers: () => {
      dispatch(getAllUsers())
    },
    getAllExperts: () => {
      dispatch(getAllExperts())
    },
    updateUser: (fb_id, userObj) => {
      dispatch(updateNonCurrentUser(fb_id, userObj))
    },
    deleteUser: (fb_id) => {
      dispatch(deleteUser(fb_id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
