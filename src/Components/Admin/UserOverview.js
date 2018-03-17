import React from 'react';
import { IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button } from 'react-mdl';
import { connect } from 'react-redux';
import { getAllExperts } from '../../redux/actions/userProgress';
import { postNewUserExpertJoin } from '../../redux/actions/userExpertJoin';

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
  }

  componentWillMount(){
    this.props.getAllExperts();
  }

  getCompletedLessons = (units) => {
    let result = [];
    for(let unit in units){
      for(let lesson in units[unit].lessons){
        if(units[unit].lessons[lesson].lessonCompleted === true){
          result.push(lesson)
        }
      }
    }
    return result;
  }

  handleSelect(expertId){
    this.setState({selectedExpert: expertId, openModal: true})
    console.log('in handleSelect')
  }

  connectUserAndExpert(){
    console.log('connect those shits', this.props.user.firebase_id, this.state.selectedExpert)
    // post here
    this.props.joinUserAndExpert({
      expert_id: this.state.selectedExpert,
      user_id: this.props.user.firebase_id
    })
    this.setState({selectedExpert: '', openModal: false})
  }

  render(){
    let { expertList } = this.props.users;
    let theExperts;

    if(this.props.users.expertList){
      theExperts = expertList.map(expert => {
        return (
          <MenuItem
            onClick={e => this.handleSelect(expert.firebase_id)}
          >
            {expert.first_name}
          </MenuItem>
        )
      })
    }

    let { user } = this.props;
    // console.log("user", user)
    return(
      <div>
        <p>{user.first_name} {user.last_name}</p>
        <p>{user.user_email}</p>
        <p>{user.user_phone}</p>
        <ul>{this.getCompletedLessons(user.user_progress).map(lesson => <li>lesson</li>)}</ul>
        <div style={{position: 'relative'}}>
          <IconButton name="more_vert" id="demo-menu-top-left" />
          <Menu target="demo-menu-top-left" valign="bottom" ripple>
              {theExperts}
          </Menu>
        </div>
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
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserOverview);
