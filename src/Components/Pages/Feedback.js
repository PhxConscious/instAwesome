import React from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import { postFeedback } from '../../redux/actions/feedback';
import { Button } from 'react-mdl';

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
    } else {
      alert("Please enter a comment before submitting")
    }
  }

  render(){
    const { userInfo } = this.props;

    if (typeof(userInfo.currentUser)===undefined) {
      console.log("undefined?", userInfo.currentUser)
      return <Redirect to='/'/>
    }

    return (
      <div style={{width: "50vw", margin: "0 auto", marginTop: "100px"}}>
        <label htmlFor="form"><h3>Comments</h3></label>
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
            rows={24}
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
