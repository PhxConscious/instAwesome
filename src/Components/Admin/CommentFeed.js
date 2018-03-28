import React from 'react';
import { connect } from 'react-redux';
import { getAllFeedback, getFeedbackByParentId, postFeedback } from '../../redux/actions/feedback';
import moment from 'moment';

class CommentFeed extends React.Component {
  constructor(props){
    super(props)
    this.state = {};
    this.getChildComments = this.getChildComments.bind(this);
    this.postComment = this.postComment.bind(this);
  }

  componentWillMount(){
    this.props.getAllFeedback()
  }

  getChildComments(parent_id){
    console.log("getChildComments", parent_id)
  }

  postComment(fb_id, commentObj){
    console.log("postComment", fb_id, commentObj)
  }

  render(){

    let { allComments } = this.props;

    let theComments;

    if(allComments){
      theComments = allComments.map((comment, i) => {
        let time = moment(comment.created_at).fromNow();
        return <div
            key={i}
          >
            <div><h5>{comment.comment}</h5></div>
            <div>
              <span>{comment.firebase_id}</span>
              <span
                style={{float:"right", fontSize:".8"}}
              >
                {time}
              </span>
              <hr/>
            </div>

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
    allComments: state.feedback.allComments,
    userInfo: state.userProgress.currentUser,

})

const mapDispatchToProps = dispatch => {
  return {
    getAllFeedback: () => {
      dispatch(getAllFeedback());
    },
    postFeedback: (fb_id, commentObj) => {
      dispatch(postFeedback(fb_id, commentObj))
    },
    getFeedbackByParentId: (parent_id) => {
      dispatch(getFeedbackByParentId(parent_id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentFeed);
