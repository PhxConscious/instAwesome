import React from 'react';
import { IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button } from 'react-mdl';
import { connect } from 'react-redux';
import { getAllExperts, selectAnExpert } from '../../redux/actions/userProgress';
import { postNewUserExpertJoin, deleteUserExpertJoin, getFreeUsers } from '../../redux/actions/userExpertJoin';

class UserOverview extends React.Component {
  constructor(props){
    super(props)
    this.state={
      selectedExpert: '',
      openModal: false
    }
    this.getCompletedLessons = this.getCompletedLessons.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.connectUserAndExpert = this.connectUserAndExpert.bind(this);
    this.getCompletedQuestionStatus = this.getCompletedQuestionStatus.bind(this);
    this.deleteUserExpertJoin = this.deleteUserExpertJoin.bind(this);
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

  // render the completed lessons on screen
  getCompletedLessons = (units) => {
    let result = [];
    for(let unit in units){
      for(let lesson in units[unit].lessons){
        if(units[unit].lessons[lesson].lessonCompleted === true){
          result.push(lesson)
          console.log(lesson)
        }
      }
    }
    return result;
  }

  // return an percentage of answered questions
  getCompletedQuestionStatus = data => {
    let total = 0;
    let completed = 0;
    for(let unit in data){
      for(let key in data[unit]){
        if(key === "lessons"){
          for(let ky in data[unit][key]){
            for(let k in data[unit][key][ky].questions){
              if(data[unit][key][ky].questions[k]===true){
                completed ++;
              }
              total ++;
            }
          }
        }
      }
    }
    return Math.round((completed / total)*100)
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
      console.log('selectedExpert', selectedExpert)
      assignedExpert = selectedExpert.first_name;
    }
    console.log('user', user)

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
        <p>{user.first_name} {user.last_name}</p>
        <p>{user.user_email}</p>
        <p>{user.user_phone}</p>

        <ul>{this.getCompletedLessons(user.user_progress).map(lesson => <li>{lesson}</li>)}</ul>

        <p>percentage of questions completed: {this.getCompletedQuestionStatus(user.user_progress)}%</p>
        {user.expert_id ? <div>{assignedExpert} <button onClick={this.deleteUserExpertJoin}>unpair</button></div>: <div style={{position: 'relative'}}>
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
            <Button type='button' onClick={e=>this.setState({openModal:false})}>Wait, not sure</Button>
            <Button type='button' onClick={this.connectUserAndExpert}>Lets do it</Button>
          </DialogActions>
        </Dialog>
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
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserOverview);
