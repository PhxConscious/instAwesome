import React from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import { postFeedback } from '../../redux/actions/feedback';
import { getFreeUsers } from '../../redux/actions/userExpertJoin';

class ExpertDashboard extends React.Component {
  constructor(props){
    super(props)

  }
  componentWillMount(){
    this.props.getFreeUsers()
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
        return <div key={i}>
          {user.first_name}
        </div>
      })
    }

    console.log("freeUsers", freeUsers)
    if(userExpertJoin && userExpertJoin.freeUsers){
      return (
        <div style={{width: "50vw", margin: "0 auto", marginTop: "100px"}}>
          expert panel
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
