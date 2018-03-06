import React from 'react';
import ReactPlayer from 'react-player';

class LessonHeader extends React.Component {

  render(){
    let { unit, currentLessonObj } = this.props;
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
  }
}
export default LessonHeader;
