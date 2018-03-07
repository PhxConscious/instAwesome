import React from "react";
import { connect } from 'react-redux';
import { nextQuestion } from '../../redux/actions/userProgress';
import ReactPlayer from 'react-player';
import '../../Styles/CheckTasks.css';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent } from 'react-mdl';

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
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
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

    if(lengthOfQuestArr !== parseInt(currentQuestion,10)+1){
      this.setState({
        // ...this.state,
        openDialog: false,
      })
    }
  }

  isPrevQ() {
    let { currentQuestion } = this.props.currentValues;

    // if(parseInt(currentQuestion,10) === 0){
    //   this.setState({
    //     ...this.state,
    //     prevButtonHidden: true
    //   })
    // }
    // if(parseInt(currentQuestion,10) !== 0){
    //   this.setState({
    //     prevButtonHidden: false
    //   })
    // }
  }

  handleOpenDialog() {
    this.setState({
      openDialog: true
    });
  }

  handleCloseDialog() {
    this.setState({
      openDialog: false
    });
  }

  render(){


    let { isChecked, nextButtonHidden, prevButtonHidden } = this.state;

    let { lesson, nextLesson, prevLesson, noOfLessons, nextQuestion, prevQuestion, userProgress, book } = this.props;

    let { currentUnit, currentUnitObj, currentLesson, currentLessonObj, currentQuestion, currentQuestionObj } = this.props.currentValues

    let nextQuestClickHandler = () => {
      let lengthOfQuestArr = book[currentUnit].lessons[currentLesson].questions.length

      let lengthOfLessonArr = book[currentUnit].lessons.length

      if(lengthOfQuestArr === parseInt(currentQuestion,10)+1 && lengthOfLessonArr === parseInt(currentLesson,10)+1){
        console.log("END OF THE UNIT")
        // this.setState({
        //   ...this.state,
        //   openDialog: true,
        //   dialogTitle: "You finished the Lesson",
        //   dialogText: "onto the next lesson?",
        //   dialogButton1: "continue",
        //   dialogButton2: "stay here"
        // })
      } else if (lengthOfQuestArr === parseInt(currentQuestion,10)+1){
        this.setState({
          ...this.state,
          openDialog: true,
          dialogTitle: "You finished the Lesson",
          dialogText: "onto the next lesson?",
          dialogButton1: "continue",
          dialogButton2: "stay here"
        })
      } else {
        nextQuestion();
      }
    }

    let prevQuestClickHandler = () => {
      console.log("prevQuestClickHandler", currentQuestion)
      if("0" === currentQuestion){
        this.setState({
          ...this.state,
          openDialog: true,
          dialogTitle: `You're still on lesson ${parseInt(currentLesson)+1}`,
          dialogText: "go back to previous lesson?",
          dialogButton1: "go back",
          dialogButton2: "stay here"
        })
      } else {
        prevQuestion();
      }
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

          <Dialog open={this.state.openDialog}>
            <DialogTitle>{this.state.dialogTitle}</DialogTitle>
            <DialogContent>
              <p>{this.state.dialogText}</p>
            </DialogContent>
            <DialogActions>
              <Button
                type='button'
                onClick={nextLesson}
              >{this.state.dialogButton1}
              </Button>
              <Button
                type='button'
                onClick={this.handleCloseDialog}
              >{this.state.dialogButton2}
            </Button>
            </DialogActions>
          </Dialog>

          <button
            className={prevButtonHidden ? 'hidden' : ""}
            onClick={prevQuestClickHandler}
            value="nextQuestion"
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
            onClick={nextQuestClickHandler}
            value="nextQuestion"
            disabled={!isChecked}
          >nextQuestion</button>

        <div>current lesson: {parseInt(currentLesson, 10)+1} of {noOfLessons}</div>
        <div>progress: {parseInt(currentQuestion, 10)+1} of {currentLessonObj.questions.length}</div>

          {currentQuestion === "0" ? "please begin the lesson" : ''}

          {parseInt(currentQuestion, 10)+1 === noOfLessons? "You finished the unit" : ''}

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
