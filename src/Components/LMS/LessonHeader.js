import React from 'react';
import ReactPlayer from 'react-player';

class LessonHeader extends React.Component {

  render(){
    let { unit } = this.props;
    return(
      <div>
        <div>
          {unit.title}
        </div>
        <div>
          {unit.description}
        </div>
        <div>
        <ReactPlayer
          url={unit.video}
          controls={true}
          width="500px"
          height="280px"
          playing={true}
        />
        </div>
        lesson header
      </div>
    )
  }
}
export default LessonHeader;
