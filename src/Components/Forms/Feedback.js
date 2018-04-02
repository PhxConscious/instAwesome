import React from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import { postFeedback } from '../../redux/actions/feedback';
import { Button } from 'react-mdl';
import '../../Styles/CommentFeed.css';

class Feedback extends React.Component {
  constructor(props){
    super(props)
    this.state = { textArea: ''}
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    if(this.state.textArea.length > 0){
      this.props.postFeedback(this.props.userInfo.firebase_id, {
        comment: this.state.textArea
      })
      this.setState({textArea:''})
    } else {
      alert("Please enter a comment before submitting")
    }
  }

  render(){
    const { userInfo } = this.props;

    if(userInfo.firebase_id){
      return (
        <div style={{width: "85vw", margin: "0 auto", marginTop: "2em"}}>
          <form
            id="form"
            onSubmit={e => {
              e.preventDefault()
              this.handleSubmit()
            }}
          >
            <textarea
              value={this.state.textArea}
              onChange={e => this.setState({textArea: e.target.value})}
              placeholder="write us a comment"
              rows={4}
              style={{width: "100%"}}
              autoFocus
            />
          <div>
            <Button
                raised colored ripple
                type="submit"
              >submit your comment
            </Button>
          </div>

          </form>
        </div>
      )
    } else {
      return <div className='pleaseLoginText'>
          <h4>Please log in to post comments</h4>
      </div>
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
