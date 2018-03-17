import React from 'react';

class UserOverview extends React.Component {
  constructor(props){
    super(props)
    this.state={}
    this.getCompletedLessons = this.getCompletedLessons.bind(this);
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
    let { user } = this.props;
    console.log("user", user)
    return(
      <div>
        <p>{user.first_name} {user.last_name}</p>
        <p>{user.user_email}</p>
        <p>{user.user_phone}</p>
        <ul>{this.getCompletedLessons(user.user_progress).map(lesson => <li>lesson</li>)}</ul>
      </div>
    )
  }
}
export default UserOverview;
