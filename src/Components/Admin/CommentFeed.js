import React from 'react';
import { connect } from 'react-redux';
import { getAllFeedback, getFeedbackByParentId, postFeedback } from '../../redux/actions/feedback';
import { Button, Textfield } from 'react-mdl';
import moment from 'moment';
import '../../Styles/CommentFeed.css';

class CommentFeed extends React.Component {
  constructor(props){
    super(props)
    this.state = {comments:{}};
    this.getChildComments = this.getChildComments.bind(this);
    this.postComment = this.postComment.bind(this);
  }

  componentWillMount(){
    this.props.getAllFeedback()
  }

  getChildComments(parent_id){
    this.props.getFeedbackByParentId(parent_id);
  }

  postComment(feedback_id, text){
    let commentObj = {
      comment: text,
      parent_id: feedback_id,
    }
    this.props.postFeedback(this.props.userInfo.firebase_id, commentObj)
    this.setState({comments:{}})
  }

  render(){

    let { allComments, userInfo, childGroups } = this.props;

    let theComments;

    if(allComments){
      let sortedComments = allComments.sort(function(a, b) {
        return (a.created_at > b.created_at) ? -1 : ((a.created_at < b.created_at) ? 1 : 0);
      });
      theComments = sortedComments.map((comment, i) => {
        let time = moment(comment.created_at).fromNow();
        if(childGroups && !childGroups[comment.feedback_id]){
          this.getChildComments(comment.feedback_id)
        }
        return <div
            key={i}
          > <div className="parentContainer">
            <div><strong>{comment.comment}</strong></div>
            <div>
              <span>- {comment.first_name} {comment.last_name}</span>
              <span
                style={{float:"right", marginRight: "1.5em"}}
              >
                {time}
              </span>
            </div>
            </div>
            <div className="childrenContainer">
            {/*
              1. if there are child comments, render
              2. sort the comments by timestamp
              3. map out comments
              */}
            {!childGroups[comment.feedback_id]? "" : childGroups[comment.feedback_id].sort(function(a, b) {
              return (a.created_at < b.created_at) ? -1 : ((a.created_at > b.created_at) ? 1 : 0);
            }).map(com => {
              let time = moment(com.created_at).fromNow();
              return <div className="childComment">
                <div>
                  <strong>{com.comment}</strong>
                </div>
                <div>
                  <span>- {com.first_name} {com.last_name}</span>
                  <span
                    style={{float:"right"}}
                  >
                    {time}
                  </span>
                </div>
              </div>
            })
            }
            <form
              className="formContainer"
              onSubmit={e=> {
                e.preventDefault();
                this.postComment(comment.feedback_id, this.state.comments[comment.feedback_id]);
              }}
            >
              <Textfield
                style={{marginLeft:"1em", width: "80%"}}
                className="textField"
                label="comment here"
                value={this.state.comments[comment.feedback_id] || ""}
                onChange={e=>this.setState({comments:{[comment.feedback_id]:e.target.value}})}
              />
              <Button
                style={{margin:"0 1em 0 1em", float:"right"}}
                raised colored ripple mini
              >SUBMIT</Button>
            </form>
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
    childGroups: state.feedback.parentId
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
