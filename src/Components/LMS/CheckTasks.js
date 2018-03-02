import React from "react";

class CheckTasks extends React.Component {

  render(){
    let { lesson, nextLesson, prevLesson } = this.props;
    return(
      <div>
        <div>{lesson.title}</div>

        <div>{lesson.description}</div>

        <div>
          <button
            onClick={prevLesson}
            value="next"
          >prev</button>
          <button
            onClick={nextLesson}
            value="next"
          >next</button>
        </div>
      </div>
    )
  }
}
export default CheckTasks;
