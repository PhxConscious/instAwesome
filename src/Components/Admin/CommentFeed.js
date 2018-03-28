import React from 'react';
import { connect } from 'react-redux';
import { getAllFeedback } from '../../redux/actions/feedback';
import moment from 'moment';

class CommentFeed extends React.Component {
  constructor(props){
    super(props)
    this.state = {};
  }

  componentWillMount(){
    this.props.getAllFeedback()
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
    allComments: state.feedback.allComments
})

const mapDispatchToProps = dispatch => {
  return {
    getAllFeedback: () => {
      dispatch(getAllFeedback());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentFeed);
