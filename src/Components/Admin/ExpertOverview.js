import React from 'react';
import { IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button } from 'react-mdl';
import { connect } from 'react-redux';
import { getUserProgress } from '../../redux/actions/userProgress';
import { getUsersOfExpert } from '../../redux/actions/userExpertJoin';
import { getCompletedQuestionStatus } from '../../utils/helper';
import '../../Styles/AdminDashboardStyles.css';

class ExpertOverview extends React.Component {
  constructor(props){
    super(props)
    this.state={
      selectedExpert: '',
      openModal: false
    }
  }

  // get the relevant user list upon first click
  componentDidMount(){
    this.props.getUsersOfExpert(this.props.expert.firebase_id)
  }

  // get the relevant user list upon subsequent clicks
  componentDidUpdate(prevProps, prevState){
    if(this.props.expert !== prevProps.expert){
      this.props.getUsersOfExpert(this.props.expert.firebase_id)
    }
  }



  render(){
    let { expert, userExpertJoin } = this.props;
    let { usersOfExpert } = userExpertJoin;

    let usersList;
    if(usersOfExpert){
      usersList = usersOfExpert.map((user, i) => {
        return (
          <div key={i}>
          <span>{user.first_name} {user.last_name}</span>
          <span style={{float:"right"}}>{getCompletedQuestionStatus(user.user_progress)}</span>

          </div>
        )
      })
    }

    return(
      <div>
        <strong>{expert.first_name}{"'s"} Current Clients</strong>
        {usersList}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userExpertJoin: state.userExpertJoin
})

const mapDispatchToProps = dispatch => {
  return {
    getUsersOfExpert: (fb_id) => {
      dispatch(getUsersOfExpert(fb_id))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ExpertOverview);
