import React from 'react';
import { IconButton, Menu, MenuItem } from 'react-mdl';
import { connect } from 'react-redux';
import { getAllExperts } from '../../redux/actions/userProgress';

class UserOverview extends React.Component {
  constructor(props){
    super(props)
    this.state={}
    this.getCompletedLessons = this.getCompletedLessons.bind(this);
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


  render(){
    let { expertList } = this.props.users;
    let theExperts;
    console.log("suser", this.props.users)
    if(this.props.users.expertList){
      theExperts = expertList.map(expert => {
        return (
          <MenuItem>
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
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserOverview);
