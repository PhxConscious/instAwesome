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
    // this.isPrevQ = this.isPrevQ.bind(this);
    this.isChecked = this.isChecked.bind(this);
  }

  componentDidMount(){
    if(this.props.currentValues.currentQuestionObj){
      this.isChecked();
      this.isNextQ();
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.currentValues !== this.props.currentValues){
      this.isChecked();
      this.isNextQ();
    }
  }

  componentWillUpdate(nextProps, nextState){

    // if(nextProps.currentQuestion !== this.props.currentQuestion){
    //
    //   this.isNextQ(nextProps.currentLessonObj, parseInt(nextProps.currentQuestion)-2);
    //   this.isPrevQ(nextProps.currentLessonObj, parseInt(nextProps.currentQuestion));
    //
    // }
  }

  // componentWillReceiveProps(prevProps){
  //   if(prevProps.currentQuestion !== this.props.currentQuestion){
  //
  //     this.isNextQ(this.props.currentLessonObj, this.props.currentQuestion);
  //     this.isPrevQ(this.props.currentLessonObj, this.props.currentQuestion);
  //
  //   }
  //
  //
  //
  //   if(prevProps.currentQuestion !== this.props.currentQuestion){
  //     this.isChecked();
  //   }
  // }

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

    console.log("isNext", lengthOfQuestArr, parseInt(currentQuestion ,10)+1)

    if(lengthOfQuestArr === parseInt(currentQuestion,10)+1){
      console.log("yes the same", parseInt(currentQuestion,10)+1, lengthOfQuestArr)
      this.setState({
        ...this.state,
        nextButtonHidden: true,
      })
    }

    if(lengthOfQuestArr !== parseInt(currentQuestion,10)+1){
      console.log("not the same", this.state)
      this.setState({
        // ...this.state,
        nextButtonHidden: false,
      })
    }
  }

  isPrevQ(obj, i) {
    // console.log("isPrev", i)
    if(parseInt(i,10) === 1){
      this.setState({
        ...this.state,
        prevButtonDisabled: true
      })
    }
    // if(parseInt(i,10) !== 1){
    //   this.setState({
    //     ...this.state,
    //     prevButtonDisabled: false
    //   })
    // }
  }

  render(){


    let { isChecked, prevButtonDisabled, nextButtonDisabled, nextButtonHidden } = this.state;

    let { lesson, nextLesson, prevLesson, noOfLessons, nextQuestion, prevQuestion, userProgress } = this.props;

    let { currentUnit, currentUnitObj, currentLesson, currentLessonObj, currentQuestion, currentQuestionObj } = this.props.currentValues

    // let unitProg = userProgress.currentUser.user_progress[currentUnitId];
    //
    // let lessonProg = unitProg.lessons[currentLessonObj.id]
    //
    // let questProg = lessonProg.questions[currentQuestionObj.id]

    let nextQuestClickHandler = () => {
      nextQuestion();
      // this.setState({
        // nextButtonHidden: false
      // })
    }

    let prevQuestClickHandler = () => {
      prevQuestion();
      // this.setState({
        // prevButtonDisabled: false
      // })
    }

    if(currentLessonObj){
      // console.log("disabled?", this.state.nextButtonHidden, this.state.prevButtonDisabled)
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
