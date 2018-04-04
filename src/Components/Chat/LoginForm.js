import React from 'react';
import { VERIFY_USER } from '../Events';

export default class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nickname: "",
      error: ""
    }
  }

  setUser = ({user, isUser}) => {
    if(isUser){
      this.setError("user name taken")
    } else {
      // we passed this method from parent
      this.props.setUser(user)
    }

  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { socket } = this.props;
    let { nickname } = this.state;
    socket.emit(VERIFY_USER, nickname, this.setUser)
  }

  setError = (error) => {
    this.setState({error})
  }

  render(){
    let { nickname, error } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="nickname">
            <h4>Got a nickname</h4>
          </label>
          <input
            type="text"
            ref={(input)=>{this.textInput = input}}
            id="nickname"
            value={nickname}
            onChange={e=>this.setState({nickname: e.target.value})}
          />
        </form>
      </div>
    )
  }
}
