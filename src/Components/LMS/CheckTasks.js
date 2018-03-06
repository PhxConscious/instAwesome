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
    }
    this.isNextQ = this.isNextQ.bind(this);
    this.isPrevQ = this.isPrevQ.bind(this);
    this.isChecked = this.isChecked.bind(this);
  }

  componentDidMount(){
    this.isChecked();
  }

  componentWillUpdate(nextProps, nextState){
  //
    // if(nextProps.currentQuestion !== this.props.currentQuestion){
    //
    //   this.isNextQ(nextProps.currentLessonObj, nextProps.currentQuestion);
    //   this.isPrevQ(nextProps.currentLessonObj, nextProps.currentQuestion);
    //
    // }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.currentQuestion !== this.props.currentQuestion){

      this.isNextQ(this.props.currentLessonObj, prevProps.currentQuestion);
      this.isPrevQ(this.props.currentLessonObj, prevProps.currentQuestion);

    }



    if(prevProps.currentQuestion !== this.props.currentQuestion){
      this.isChecked();
    }
  }

  isChecked(curQuestObjId) {
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
    let lengthOfQuestArr = this.props.book[this.props.currentUnit].lessons[this.props.currentLesson].questions.length

    // console.log("isNext", lengthOfQuestArr, parseInt(i,10)+2)

    if(lengthOfQuestArr === parseInt(i,10)+2){
      console.log("yes the same")
      this.setState({
        ...this.state,
        nextButtonDisabled: true,
      })
    }

    // if(lengthOfQuestArr !== parseInt(i,10)+2){
    //   console.log("not the same")
    //   this.setState({
    //     ...this.state,
    //     nextButtonDisabled: false,
    //   })
    // }

    // if(parseInt(i,10)===0) {
    //   this.setState({
    //     ...this.state,
    //     nextButtonDisabled: false
    //   })
    // }
    this.forceUpdate();
  }

  isPrevQ(obj, i) {
    if(parseInt(i,10) === 0){
      this.setState({
        ...this.state,
        prevButtonDisabled: true
      })
    }
    if(parseInt(i,10) !== 0){
      this.setState({
        ...this.state,
        prevButtonDisabled: false
      })
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
        // nextButtonDisabled: false
      })
    }

    let prevQuestClickHandler = () => {
      prevQuestion();
      this.setState({
        // prevButtonDisabled: false
      })
    }

    if(currentLessonObj){
      console.log("disabled?", this.state.nextButtonDisabled)
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
          >nextllllllllLesson</button>
          <button
            className={!nextButtonDisabled ? "" : "hidden"}
            onClick={nextQuestion}
            value="nextQuestion"
            disabled={nextButtonDisabled}
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
