import React from "react";

class CheckTasks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      checked: false,
    }
  }

  render(){
    let { checked } = this.state;
    let { lesson, nextLesson, prevLesson, currentUnit, currentLesson, noOfLessons } = this.props;

    if(lesson && lesson.title){
      return(
        <div>
          <h4>{lesson.title}</h4>

          <div>{lesson.description}</div>

          <div>
            <input
              type="checkbox"
              checked={checked}
              onChange={e => this.setState({checked: !checked})}
            />
          </div>

          <div>
            <span className={currentLesson === "0" ? "hidden" : ""}>
              <button
                onClick={prevLesson}
                value="next"
              >prev</button>
            </span>

            <span className={parseInt(currentLesson, 10)+1 === parseInt(noOfLessons, 10) ? "hidden" : ""}>
              <button
                onClick={nextLesson}
                value="next"
                disabled={!checked}
              >next</button>
            </span>

          </div>

          <div>unit: {parseInt(currentUnit, 10)+1}  current lesson: {parseInt(currentLesson, 10)+1} of {noOfLessons}</div>

          {currentLesson === "0" ? "please begin the lesson" : ''}

          {parseInt(currentLesson, 10)+1 === noOfLessons? "You finished the unit" : ''}

        </div>
      )
    }
    return <div>loadin...</div>
  }
}
export default CheckTasks;
