import React from 'react';
import { connect } from 'react-redux';
import { getAllFeedback, getFeedbackByParentId, postFeedback } from '../../redux/actions/feedback';
import moment from 'moment';
import '../../Styles/CommentFeed.css'

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
    this.props.getFeedbackByParentId(parent_id);
  }

  postComment(fb_id, commentObj){
    console.log("postComment", fb_id, commentObj)
  }

  render(){

    let { allComments, userInfo, childGroups } = this.props;

    let theComments;

    if(allComments){
      theComments = allComments.map((comment, i) => {
        let time = moment(comment.created_at).fromNow();
        if(childGroups && !childGroups[comment.feedback_id]){
          this.getChildComments(comment.feedback_id)
        }
        return <div
            key={i}    
          > <div className="parentContainer">
            <div><strong>{comment.comment}</strong></div>
            <div>
              <span>-{comment.first_name} {comment.last_name}</span>
              <span
                style={{float:"right", marginRight: "1.5em"}}
              >
                {time}
              </span>
            </div>
            </div>
            <div className="childrenContainer">
            {!childGroups[comment.feedback_id]? "" : childGroups[comment.feedback_id].map(com => {
              let time = moment(comment.created_at).fromNow();
              return <div className="childComment">
                <div>
                  <strong>{com.comment}</strong>
                </div>
                <div>
                  <span>-{com.first_name} {com.last_name}</span>
                  <span
                    style={{float:"right"}}
                  >
                    {time}
                  </span>
                  <hr/>
                </div>
              </div>

            })

            }
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
