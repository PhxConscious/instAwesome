import React from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import { postFeedback } from '../../redux/actions/feedback';
import { getFreeUsers } from '../../redux/actions/userExpertJoin';
import UserListItem from '../Admin/UserListItem';

class ExpertDashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {userName: ''}
    this.selectUser = this.selectUser.bind(this);
  }
  componentWillMount(){
    this.props.getFreeUsers()
  }

  selectUser(user){
    console.log("inselectuser", user)
    this.setState({userName: user})
  }

  render(){
    const { userInfo, userExpertJoin } = this.props;

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
          expert panel
          current state: {this.state.userName}
          {unhitchedUsers}
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
    postFeedback: (fb_id, commentObj) => {
      dispatch(postFeedback(fb_id, commentObj))
    },
    getFreeUsers: () => {
      dispatch(getFreeUsers())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpertDashboard);
