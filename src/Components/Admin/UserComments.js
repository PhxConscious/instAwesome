import React from 'react';
import { connect } from 'react-redux';
import { getFeedbackByUserId } from '../../redux/actions/feedback';
import moment from 'moment';

class UserComments extends React.Component {
  constructor(props){
    super(props)
    this.state = {};
  }

  componentWillMount(){
    this.props.getFeedbackByUserId(this.props.user.firebase_id)
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.user !== this.props.user){
      this.props.getFeedbackByUserId(this.props.user.firebase_id)
    }

  }

  render(){
    let { user, userComments } = this.props;
    let theComments;
    if(userComments){

      theComments = userComments.map((comment, i) => {
        let time = moment(comment.created_at).fromNow();
        return <div
            key={i}
          >
            <span>{comment.comment}</span>
            <span style={{float:"right", fontSize:".8em"}}>{time}</span>
          </div>
      })
    }

    return (
      <div>
      {theComments}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  // if(feedback && feedback.allCommentsCurUser){
    userComments: state.feedback.allCommentsCurUser
  // }
})

const mapDispatchToProps = dispatch => {
  return {
    getFeedbackByUserId: (fb_id) => {
      dispatch(getFeedbackByUserId(fb_id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserComments);
