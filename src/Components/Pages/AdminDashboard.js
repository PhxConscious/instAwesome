import React from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import { postFeedback } from '../../redux/actions/feedback';
import { getFreeUsers, postNewUserExpertJoin } from '../../redux/actions/userExpertJoin';
import UserListItem from '../Admin/UserListItem';

class AdminDashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {userObj: {}}
    this.selectUser = this.selectUser.bind(this);
    this.claimUser = this.claimUser.bind(this);
  }
  componentWillMount(){
    this.props.getFreeUsers()
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
    const { userInfo, userExpertJoin } = this.props;
    let { userObj } = this.state;

    if (typeof(userInfo.currentUser)===undefined) {
      return <Redirect to='/'/>
    }

    let freeUsers;
    let unhitchedUsers
    if(userExpertJoin && userExpertJoin.freeUsers){
      freeUsers = userExpertJoin.freeUsers;
      unhitchedUsers = freeUsers.map((user, i) => {
        return <UserListItem
                  key={i}
                  user={user}
                  selectUser={this.selectUser}
                />
      })
    }

    if(userExpertJoin && userExpertJoin.freeUsers){
      return (
        <div style={{width: "50vw", margin: "0 auto", marginTop: "100px"}}>
          <div style={{display:"inline-block", width: "20vw", "backgroundColor": "yellow"}}>
            <h6>expert panel</h6>
            {unhitchedUsers}
          </div>
          <div style={{display:"inline-block", width: "30vw", "backgroundColor": "pink"}}>
            <p>name: {userObj.first_name} {userObj.last_name}</p>
            <p>email: {userObj.user_email}</p>
            <p>phone: {userObj.user_phone}</p>
            <button
              disabled={!userObj.first_name}
              onClick={e => this.claimUser(userObj)}
            >claim this user</button>
          </div>
        </div>
      )
    } else {
      return <div>loading expert panel...</div>
    }
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userProgress.currentUser,
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
