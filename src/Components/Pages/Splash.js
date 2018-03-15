import React from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

class Splash extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      goBackThruLogin: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    this.setState({goBackThruLogin:true})
  }


  render(){
    let { userInfo, companyInfo } = this.props;
    let { goBackThruLogin } = this.state;

    if(goBackThruLogin){
      return <Redirect to={ '/'}/>
    }

    if(!userInfo.user_email){
      return (
        <div style={{width: "50vw", margin: "0 auto", marginTop: "100px"}}>
          <h6>Thanks for coming to see us. Please log back in</h6>
          <form
            onSubmit={e => {
              e.preventDefault()
              this.handleSubmit()
            }}
          >
          <button
            type="submit"
          >Login now</button>
          </form>
        </div>
      )
    } else {
      return (
        <div style={{width: "50vw", margin: "0 auto", marginTop: "100px"}}>
          Welcome back to instAwesome.
          This is the spash page where users gain an idea of what they can do on the site.
          We could also put up some kind of article feed - do we have content coming off of wordpress?
        </div>
      )
    }

  }
}

const mapStateToProps = state => ({
  userInfo: state.userProgress.currentUser,
  companyInfo: state.companyInfo
})
export default connect(mapStateToProps, null)(Splash);
