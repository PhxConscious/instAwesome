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
    let { lesson, nextLesson, prevLesson, currentUnit, currentLesson, noOfLessons, currentLessonObj, currentQuestion, currentQuestionObj, nextQuestion, prevQuestion } = this.props;
    console.log('lesson', currentQuestionObj)

    if(currentLessonObj && currentLessonObj.title){
      return(
        <div>
          <h4>{currentLessonObj.title}</h4>

          <div>lesson: {currentLessonObj.description}</div>



          <div>
            <input
              type="checkbox"
              checked={checked}
              onChange={e => this.setState({checked: !checked})}
            />
          </div>

          <div>
            <span className={currentLesson === "0" ? "" : ""}>
              <button
                onClick={prevLesson}
                value="next"
              >prevLesson</button>
            </span>

            <span className={parseInt(currentLesson, 10)+1 === parseInt(noOfLessons, 10) ? "" : ""}>
              <button
                onClick={nextLesson}
                value="next"
                disabled={!checked}
              >nextLesson</button>
            </span>

          </div>

          <h5>current question: {parseInt(currentQuestion, 10)+1}</h5>
          <div>question: {currentQuestionObj.title}</div>
          <button
            onClick={prevQuestion}
            value="next"
            disabled={!checked}
          >prevQuestion</button>
          <button
            onClick={nextQuestion}
            value="next"
            disabled={!checked}
          >nextQuestion</button>


        <div>unit: {parseInt(currentUnit, 10)+1}  current lesson: {parseInt(currentLesson, 10)+1} of {noOfLessons}  </div>

          {currentLesson === "0" ? "please begin the lesson" : ''}

          {parseInt(currentLesson, 10)+1 === noOfLessons? "You finished the unit" : ''}

        </div>
      )
    }
    return <div>loadin...</div>
  }
}
export default CheckTasks;
