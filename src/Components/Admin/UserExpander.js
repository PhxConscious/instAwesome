import React from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import { postFeedback } from '../../redux/actions/feedback'

class UserExpander extends React.Component {
  constructor(props){
    super(props)
  }


  render(){
    const { userInfo } = this.props;

    // if (typeof(userInfo.currentUser)===undefined) {
    //   console.log("undefined?", userInfo.currentUser)
    //   return <Redirect to='/'/>
    // }

    return (
      <div>
        
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userProgress.currentUser
  }
}
const mapDispatchToProps = dispatch => {
  return {
    postFeedback: (fb_id, commentObj) => {
      dispatch(postFeedback(fb_id, commentObj))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserExpander);
