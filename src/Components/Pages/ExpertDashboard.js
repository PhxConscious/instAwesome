import React from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import { postFeedback } from '../../redux/actions/feedback';
import { getUsersOfExpert } from '../../redux/actions/userExpertJoin';


class ExpertDashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {userObj: {}}
    this.selectUser = this.selectUser.bind(this);
    // this.select = this.select.bind(this);
  }
  componentWillMount(){
    this.props.getUsersOfExpert(this.props.userInfo.firebase_id)
  }

  selectUser(user){
    this.setState({userObj: user})
  }

  render(){
    const { userInfo, userExpertJoin } = this.props;
    let { userObj } = this.state;

    if (typeof(userInfo.currentUser)===undefined) {
      return <Redirect to='/'/>
    }

    let listOfUsersOfExpert;
    let userList;
    if(userExpertJoin && userExpertJoin.usersOfExpert){
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

    if(userExpertJoin && userExpertJoin.usersOfExpert){
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
                  <button
                    disabled={!userObj.first_name}
                    onClick={e => this.claimUser(userObj)}
                  >claim this user</button>
                </div>
              </div>

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
    getUsersOfExpert: (expert_id) => {
      dispatch(getUsersOfExpert(expert_id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpertDashboard);
