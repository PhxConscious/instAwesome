import React from 'react';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  constructor(props){
    super(props)
  }

  render(){

    return (
      <div>
        feedback
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {

  }
}
const mapDispatchToProps = dispatch => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
