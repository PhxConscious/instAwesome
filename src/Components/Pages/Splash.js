import React from 'react';
import { connect } from 'react-redux';
class Splash extends React.Component {

  render(){
    let { userInfo, companyInfo } = this.props;

    return (
      <div>


      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userProgress,
  companyInfo: state.companyInfo
})
export default connect(mapStateToProps, null)(Splash);
