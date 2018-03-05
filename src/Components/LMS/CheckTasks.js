import React from "react";
import { connect } from 'react-redux';
import { nextQuestion } from '../../redux/actions/userProgress';

class CheckTasks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      checked: false,
      nextButtonDisabled: false,
    }
    this.isNextQ = this.isNextQ.bind(this);
  }

  componentWillUpdate(nextProps, nextState){
    if(nextProps.currentQuestion !== this.props.currentQuestion){
      console.log('updating bc of props')
      this.isNextQ(nextProps.currentLessonObj, nextProps.currentQuestion)
    }
  }

  isNextQ(obj, i) {
    console.log(obj, i)
    if(obj.questions.length > parseInt(i,10)+1){
      this.setState({nextButtonDisabled: false})
    } else {
      this.setState({nextButtonDisabled: true})
    }

  }

  render(){
    let { checked } = this.state;
    let { lesson, nextLesson, prevLesson, currentUnit, currentUnitName, currentUnitId, currentLesson, noOfLessons, currentLessonObj, currentQuestion, currentQuestionObj, nextQuestion, prevQuestion, userProgress } = this.props;

    let unitProg = userProgress.currentUser.user_progress[currentUnitId];

    let lessonProg = unitProg.lessons[currentLessonObj.id]

    let questProg = lessonProg.questions[currentQuestionObj.id]
    console.log("prog", questProg, lessonProg, unitProg)
    console.log("SEE THIS", currentLessonObj.questions.length, parseInt(currentQuestion,10)+1)






    if(currentLessonObj){
      return(
        <div>
          <h6>{currentLessonObj.title}</h6>

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
              >nextLesson</button>
            </span>

          </div>

          <h5>current question: {parseInt(currentQuestion, 10)+1}</h5>
          <div>question: {currentQuestionObj.title}</div>
          <button
            onClick={prevQuestion}
            value="nextQuestion"
          >prevQuestion</button>
          <button
            onClick={nextQuestion}
            value="nextQuestion"
            disabled={this.state.nextButtonDisabled}
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

const mapStateToProps = state => ({
  userProgress: state.userProgress
});

const mapDispatchToProps = dispatch => {
    return {
      putNextQuestion : (fb_id, data) => {
        dispatch(nextQuestion(fb_id, data ))
      }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckTasks);
