import React from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';

class LessonHeader extends React.Component {

  componentWillReceiveProps(nextProps){
    console.log('nextProps', nextProps.currentValues.currentLessonObj)
  }

  render(){
    let { currentLessonObj } = this.props.currentValues;
    if(currentLessonObj){
      return(
        <div>
          <div>
            <h4>{currentLessonObj.title}</h4>
          </div>
          <div>

          </div>
          <div>
            <ReactPlayer
              url={currentLessonObj.video}
              controls={true}
              width="500px"
              height="280px"
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
