import React from 'react';
import { connect } from 'react-redux';
import { postFeedback } from '../../redux/actions/feedback'

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

    return (
      <div style={{width: "50vw", margin: "0 auto", marginTop: "100px"}}>
        <label for="form">Comment Section</label>
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
            placeholder="put your comment here"
            rows={12}
            autofocus
          />
          <button
            type="submit"
          >submit your comment
          </button>
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
