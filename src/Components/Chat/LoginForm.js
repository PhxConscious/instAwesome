import React from 'react';
import { VERIFY_USER } from '../../Events';
import { connect } from 'react-redux';
import { Button } from 'react-mdl';

class LoginForm extends React.Component {
	constructor(props) {
	  super(props);

	  this.state = {
	  	nickname:"",
	  	error:""
	  };
	}

	setUser = ({user, isUser})=>{

		if(isUser){
			this.setError("User name taken")
		}else{
			this.setError("")
			this.props.setUser(user)
		}
	}

	handleSubmit = (e)=>{
		e.preventDefault()
		const { socket } = this.props
		const { nickname } = this.state
		socket.emit(VERIFY_USER, this.props.userInfo.firebase_id, this.setUser)
	}

	handleChange = (e)=>{
		this.setState({nickname:e.target.value})
	}

	setError = (error)=>{
		this.setState({error})
	}

	render() {

		const { nickname, error } = this.state
		return (
			<div className="login">
				<form onSubmit={this.handleSubmit} className="login-form" >

					<label htmlFor="nickname">
						<h2>Chat with your InstaExpert</h2>
					</label>
					<div>
						<Button
							raised
							colored
							ripple
						>Connect To Chat</Button>
					</div>


				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	userInfo: state.userProgress.currentUser,
})

export default connect(mapStateToProps, null)(LoginForm);
