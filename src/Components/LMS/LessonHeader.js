import React from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import '../../Styles/LessonHeaderStyles.css'

class LessonHeader extends React.Component {


  render(){
    let { currentLessonObj } = this.props.currentValues;
    if(currentLessonObj){
      return(
        <div id="LessonHeaderContainer">
          <div id="titleContainer">
            <h4 id="title">{currentLessonObj.title}</h4>
          </div>

          <div id="reactPlayerContainer">
            <ReactPlayer
              id="reactPlayer"
              url={currentLessonObj.video}
              controls={true}
              width="100%"
              height="40vh"
              playing={false}
            />
          </div>
        </div>
      )
    } else {
      return <div>loading lesson info...</div>
    }

  }
}
const mapStateToProps = state => ({
  currentValues: state.currentValues,
})

// const mapDispatchToProps = dispatch => ({
//
// })

export default connect(mapStateToProps, null)(LessonHeader);
