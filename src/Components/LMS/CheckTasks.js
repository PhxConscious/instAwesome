import React from "react";
import { connect } from 'react-redux';
import { nextQuestion } from '../../redux/actions/userProgress';
import ReactPlayer from 'react-player';
import '../../Styles/CheckTasks.css';

class CheckTasks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isChecked: false,
      test:false,
    }
    this.isNextQ = this.isNextQ.bind(this);
    this.isPrevQ = this.isPrevQ.bind(this);
    this.isChecked = this.isChecked.bind(this);
  }

  componentDidMount(){
    if(this.props.currentValues.currentQuestionObj){
      this.isChecked();
      this.isNextQ();
      this.isPrevQ();
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.currentValues !== this.props.currentValues){
      this.isChecked();
      this.isNextQ();
      this.isPrevQ();
    }
  }

  isChecked() {
    let userProg = this.props.userProgress.currentUser.user_progress;

    let{ currentUnitObj, currentLessonObj, currentQuestionObj } = this.props.currentValues;
    if(userProg[currentUnitObj.id].lessons[currentLessonObj.id].questions[currentQuestionObj.id]){
      this.setState({
        ...this.state,
        isChecked: true
      })
    } else {
      this.setState({
        ...this.state,
        isChecked: false
      })
    }
  }

  isNextQ() {
    let { book } = this.props;
    let { currentUnit, currentLesson, currentQuestion } = this.props.currentValues;

    let lengthOfQuestArr = book[currentUnit].lessons[currentLesson].questions.length

    if(lengthOfQuestArr === parseInt(currentQuestion,10)+1){
      this.setState({
        ...this.state,
        nextButtonHidden: true,
      })
    }

    if(lengthOfQuestArr !== parseInt(currentQuestion,10)+1){
      this.setState({
        // ...this.state,
        nextButtonHidden: false,
      })
    }
  }

  isPrevQ() {
    console.log("isPrev", currentQuestion)
    let { currentQuestion } = this.props.currentValues;

    if(parseInt(currentQuestion,10) === 0){
      this.setState({
        ...this.state,
        prevButtonHidden: true
      })
    }
    if(parseInt(currentQuestion,10) !== 0){
      this.setState({
        prevButtonHidden: false
      })
    }
  }

  render(){


    let { isChecked, prevButtonDisabled, nextButtonDisabled, nextButtonHidden, prevButtonHidden } = this.state;

    let { lesson, nextLesson, prevLesson, noOfLessons, nextQuestion, prevQuestion, userProgress } = this.props;

    let { currentUnit, currentUnitObj, currentLesson, currentLessonObj, currentQuestion, currentQuestionObj } = this.props.currentValues

    let nextQuestClickHandler = () => {
      nextQuestion();

    }

    let prevQuestClickHandler = () => {
      prevQuestion();
    }

    if(currentLessonObj){

      return(
        <div>
          <div>lesson: {currentLessonObj.description}</div>
          <h5>current question: {parseInt(currentQuestion, 10)+1}</h5>
          <div>question: {currentQuestionObj.title}</div>

          <div>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={e => this.setState({isChecked: !isChecked})}
            />
          </div>


          <button
            className={prevButtonHidden ? 'hidden' : ""}
            onClick={prevQuestClickHandler}
            value="nextQuestion"
            disabled={prevButtonDisabled}
          >prevQuestion</button>
          <button
            onClick={prevLesson}
            value="next"
          >prevvvvvvLesson</button>

          <button
            onClick={nextLesson}
            value="next"
          >nextllllllllLesson</button>
          <button
            className={nextButtonHidden ? 'hidden' : ""}
            onClick={nextQuestion}
            value="nextQuestion"
            disabled={nextButtonHidden}
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
  book: state.lmsContent.book,
  userProgress: state.userProgress,
  currentValues: state.currentValues,
});

const mapDispatchToProps = dispatch => {
    return {
      putNextQuestion : (fb_id, data) => {
        dispatch(nextQuestion(fb_id, data ))
      }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckTasks);
