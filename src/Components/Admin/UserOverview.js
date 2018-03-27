import React from 'react';
import { IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button } from 'react-mdl';
import { connect } from 'react-redux';
import { getAllExperts, selectAnExpert, updateNonCurrentUser, deleteUser } from '../../redux/actions/userProgress';
import { postNewUserExpertJoin, deleteUserExpertJoin, getFreeUsers } from '../../redux/actions/userExpertJoin';
import { getCompletedQuestionStatus, getCompletedLessonTitles } from '../../utils/helper';
import '../../Styles/AdminDashboardStyles.css';

class UserOverview extends React.Component {
  constructor(props){
    super(props)
    this.state={
      selectedExpert: '',
      openModal: false
    }
    this.handleSelect = this.handleSelect.bind(this);
    this.connectUserAndExpert = this.connectUserAndExpert.bind(this);
    this.deleteUserExpertJoin = this.deleteUserExpertJoin.bind(this);
    this.makeAdmin = this.makeAdmin.bind(this);
    this.makeExpert = this.makeExpert.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentWillMount(){
    this.props.getAllExperts();
  }

  // get the relevant expert upon first click
  componentDidMount(){
    if(this.props.user.expert_id){
      this.props.selectAnExpert(this.props.user.expert_id);
    }
  }

  // get the relevant expert upon subsequent clicks
  componentDidUpdate(prevProps, prevState){
    if(this.props.user.expert_id !== prevProps.user.expert_id){
      this.props.selectAnExpert(this.props.user.expert_id);
    }
  }

  deleteUserExpertJoin(){
    this.props.deleteUserExpertJoin(this.props.user.firebase_id)
    this.props.getFreeUsers()
    this.props.selectAnExpert('invalidToResetRedux');
  }

  makeAdmin(){
    this.props.updateUser(this.props.user.firebase_id, {isAdmin: true})
  }

  makeExpert(){
    this.props.updateUser(this.props.user.firebase_id, {isExpert: true})
  }

  deleteUser(){
    this.props.deleteUser(this.props.user.firebase_id);
  }

  handleSelect(expertId){
    this.setState({selectedExpert: expertId, openModal: true})
  }

  connectUserAndExpert(){
    this.props.joinUserAndExpert({
      expert_id: this.state.selectedExpert,
      user_id: this.props.user.firebase_id
    })
    this.setState({selectedExpert: '', openModal: false})
  }

  render(){
    let { expertList, selectedExpert } = this.props.users;
    let { user } = this.props;
    let theExperts;
    let assignedExpert = "pair with expert";
    if(selectedExpert){
      assignedExpert = selectedExpert.first_name;
    }

    if(this.props.users.expertList){
      theExperts = expertList.map((expert, i) => {
        return (
          <MenuItem
            key={i}
            onClick={e => this.handleSelect(expert.firebase_id)}
          >
            {expert.first_name}
          </MenuItem>
        )
      })
    }

    return(
      <div>
        <strong>User Details</strong>
        <div>name: {user.first_name} {user.last_name}</div>
        <div>email: {user.user_email}</div>
        <div>phone: {user.user_phone}</div>

        <div id="lessonProgressContainer">
          Completed Lessons:
          <ul>{getCompletedLessonTitles(user.user_progress).map((lesson, i) => <li key={i}>{lesson}</li>)}</ul>
        </div>

        <p>User's LMS Progress: {getCompletedQuestionStatus(user.user_progress)}%</p>

        {user.expert_id ? <div>Expert: {assignedExpert} <Button
          raised accent ripple
         onClick={this.deleteUserExpertJoin}>unpair</Button></div>: <div style={{position: 'relative'}}>
          <IconButton name="more_vert" id="demo-menu-top-left" /> Pair with expert
          <Menu target="demo-menu-top-left" valign="bottom" ripple>
              {theExperts}
          </Menu>
        </div>
      }
        <Dialog open={this.state.openModal}>
          <DialogTitle>Connect this user with this expert</DialogTitle>
          <DialogContent>
            <p>Be sure, we cannot change it yet</p>
          </DialogContent>
          <DialogActions>
            <Button
              raised colored ripple
              type='button'
              onClick={e=>this.setState({openModal:false})}>Wait, not sure
            </Button>
            <Button
              raised accent ripple
              type='button'
              onClick={this.connectUserAndExpert}>Lets do it
            </Button>
          </DialogActions>
        </Dialog>
        <Button
          style={{margin: "10px 3px 0px 3px"}}
          raised colored ripple
          onClick={this.makeAdmin}>make admin
        </Button>
        <Button
          style={{margin: "10px 3px 0px 3px"}}
          raised colored ripple
          onClick={this.makeExpert}>make expert
        </Button>
        <Button
          style={{margin: "10px 3px 0px 3px"}}
          raised accent ripple
          onClick={this.deleteUser}>delete user
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.userProgress
})

const mapDispatchToProps = dispatch => {
  return {
    getAllExperts: () => {
      dispatch(getAllExperts())
    },
    joinUserAndExpert: (obj) => {
      dispatch(postNewUserExpertJoin(obj))
    },
    selectAnExpert: (fb_id) => {
      dispatch(selectAnExpert(fb_id))
    },
    deleteUserExpertJoin: (user_id) => {
      dispatch(deleteUserExpertJoin(user_id))
    },
    getFreeUsers: () => {
      dispatch(getFreeUsers())
    },
    updateUser: (fb_id, userObj) => {
      dispatch(updateNonCurrentUser(fb_id, userObj))
    },
    deleteUser: (fb_id) => {
      dispatch(deleteUser(fb_id))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserOverview);
