import React from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import { postFeedback } from '../../redux/actions/feedback'

class ExpertDashboard extends React.Component {
  constructor(props){
    super(props)

  }


  render(){
    const { userInfo } = this.props;

    if (typeof(userInfo.currentUser)==='undefined') {
      return <Redirect to='/'/>
    }

    return (
      <div style={{width: "50vw", margin: "0 auto", marginTop: "100px"}}>

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

export default connect(mapStateToProps, mapDispatchToProps)(ExpertDashboard);
