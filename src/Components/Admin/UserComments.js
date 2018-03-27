import React from 'react';
import { connect } from 'react-redux';

class UserComments extends React.Component {
  constructor(props){
    super(props)
    this.state = {};

  }
  render(){
    let { user } = this.props;

    return (
      <div>
      UserComments
      {user.first_name}
      </div>
    )
  }
}
// const mapStateToProps = state => ({
//
// })

// const mapDispatchToProps = dispatch => {
//   return {
//
//   }
// }

export default connect(null, null)(UserComments);
