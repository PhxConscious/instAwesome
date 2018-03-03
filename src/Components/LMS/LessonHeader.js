import React from 'react';
import ReactPlayer from 'react-player';

class LessonHeader extends React.Component {

  render(){
    let { unit } = this.props;
    return(
      <div>
        <div>
          <h4>{unit.title}</h4>
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
          playing={false}
        />
        </div>
      </div>
    )
  }
}
export default LessonHeader;
