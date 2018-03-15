import React from 'react';
import { connect } from 'react-redux';

class Splash extends React.Component {

  render(){
    let { userInfo, companyInfo } = this.props;

    if(!userInfo.user_email){
      return (
        <div>
          Login flow
        </div>
      )
    } else {
      return (
        <div>
          splash page content
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
