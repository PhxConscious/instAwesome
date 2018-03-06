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
      nextButtonDisabled: false,
      prevButtonDisabled: false,
    }
    this.isNextQ = this.isNextQ.bind(this);
    this.isPrevQ = this.isPrevQ.bind(this);
    this.isChecked = this.isChecked.bind(this);
  }

  componentDidMount(){
    this.isChecked();
  }

  componentWillUpdate(nextProps, nextState){
    if(nextProps.currentQuestion !== this.props.currentQuestion){
      this.isNextQ(nextProps.currentLessonObj, nextProps.currentQuestion);
      this.isPrevQ(nextProps.currentLessonObj, nextProps.currentQuestion);
      this.isChecked();
    }
  }

  isChecked() {
    if(this.props.userProgress.currentUser.user_progress[this.props.currentUnitId].lessons[this.props.currentLessonObj.id].questions[this.props.currentQuestionObj.id]){
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

  isNextQ(obj, i) {
    console.log('in isNextQ', this.state.nextButtonDisabled, obj, parseInt(i,10)+1)
    if(obj.questions.length = parseInt(i,10)+1){
      this.setState({nextButtonDisabled: false})
    } else {
      this.setState({nextButtonDisabled: true})
    }
  }

  isPrevQ(obj, i) {
    if(parseInt(i) === 0){
      this.setState({prevButtonDisabled: true})
    } else {
      this.setState({prevButtonDisabled: false})
    }
  }

  render(){
    let { isChecked, prevButtonDisabled, nextButtonDisabled } = this.state;
    let { lesson, nextLesson, prevLesson, currentUnit, currentUnitName, currentUnitId, currentLesson, noOfLessons, currentLessonObj, currentQuestion, currentQuestionObj, nextQuestion, prevQuestion, userProgress } = this.props;

    let unitProg = userProgress.currentUser.user_progress[currentUnitId];

    let lessonProg = unitProg.lessons[currentLessonObj.id]

    let questProg = lessonProg.questions[currentQuestionObj.id]

    let nextQuestClickHandler = () => {
      nextQuestion();
      this.setState({
        nextButtonDisabled: false
      })
    }

    let prevQuestClickHandler = () => {
      prevQuestion();
      this.setState({
        prevButtonDisabled: false
      })
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
            className={prevButtonDisabled ? "" : "hidden"}
            onClick={prevLesson}
            value="next"
          >prevLesson</button>
          <button
            className={!prevButtonDisabled ? "" : "hidden"}
            onClick={prevQuestClickHandler}
            value="nextQuestion"
            disabled={this.state.prevButtonDisabled}
          >prevQuestion</button>

          <button
            className={nextButtonDisabled ? "" : "hidden"}
            onClick={nextLesson}
            value="next"
          >nextLesson</button>
          <button
            className={!nextButtonDisabled ? "" : "hidden"}
            onClick={nextQuestClickHandler}
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
