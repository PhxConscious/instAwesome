import React from "react";
import { connect } from 'react-redux';
import { nextQuestion } from '../../redux/actions/userProgress';
import ReactPlayer from 'react-player';
import '../../Styles/ContentBodyStyles.css';
import { CheckBox, LessonIcon } from './Checkbox';
import TextInput from './TextInput';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, Textfield } from 'react-mdl';

class CheckTasks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isCheckMarked: false,
      test:false,
      textArea:'',
    }
    this.isNextQ = this.isNextQ.bind(this);
    this.isPrevQ = this.isPrevQ.bind(this);
    this.isChecked = this.isChecked.bind(this);
    this.checkBox = this.checkBox.bind(this);
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
        isCheckMarked: true
      })
    } else {
      this.setState({
        ...this.state,
        isCheckMarked: false
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
        openLessonDialog: false,
        openUnitDialog: false,
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

  checkBox(){
    this.setState({isCheckMarked: !this.state.isCheckMarked})
  }


  render(){


    let { isCheckMarked, nextButtonHidden, prevButtonHidden } = this.state;

    let { lesson, nextLesson, prevLesson, nextQuestion, prevQuestion, nextUnit, userProgress, book, currentValues, selectLessonOnClick } = this.props;

    let { currentUnit, currentUnitObj, currentLesson, currentLessonObj, currentQuestion, currentQuestionObj } = this.props.currentValues;

    let userProg = userProgress.currentUser.user_progress;

    let lessonIcons = null;
    if(currentLessonObj){
      lessonIcons = currentUnitObj.lessons.map((lesson, i) => (
        <LessonIcon
          key={i}
          i={i}
          lesson={lesson}
          userProg={userProg}
          currentValues={currentValues}
          selectLessonOnClick={selectLessonOnClick}
        />
      ))
    }

    let submitTextArea = () => {
      // @TODO
      // 1. post current text from state to company db
      // 2. invoke nextQuestClickHandler
      // 3. clear text from state
    }

    let nextQuestClickHandler = () => {
      let lengthOfQuestArr = book[currentUnit].lessons[currentLesson].questions.length

      let lengthOfLessonArr = book[currentUnit].lessons.length

      if(lengthOfQuestArr === parseInt(currentQuestion,10)+1 && lengthOfLessonArr === parseInt(currentLesson,10)+1){
        console.log("END OF THE UNIT")
        this.setState({
          ...this.state,
          openUnitDialog: true,
          unitDialogTitle: "Congrats! You finished the unit",
          unitDialogText: "onto the next unit?",
          unitDialogButton1: "continue",
          unitDialogButton2: "stay here"
        })
        nextQuestion();
      } else if (lengthOfQuestArr === parseInt(currentQuestion,10)+1){
        this.setState({
          ...this.state,
          openLessonDialog: true,
          lessonDialogTitle: "You finished the Lesson",
          lessonDialogText: "onto the next lesson?",
          lessonDialogButton1: "continue",
          lessonDialogButton2: "stay here"
        })
        nextQuestion();
      } else {
        nextQuestion();
      }
    }

    let prevQuestClickHandler = () => {
      console.log("prevQuestClickHandler", currentQuestion)
      if("0" === currentQuestion){
        this.setState({
          ...this.state,
          openLessonDialog: true,
          lessonDialogTitle: `You're still on lesson ${parseInt(currentLesson)+1}`,
          lessonDialogText: "go back to previous lesson?",
          lessonDialogButton1: "go back",
          lessonDialogButton2: "stay here"
        })
      } else {
        prevQuestion();
      }
    }

    if(currentLessonObj){

      return(
        <div>
          <div id="lessonTitleContainer">
            <h5>{currentQuestionObj.title}</h5>
          </div>

          <div id="inputComponent">
          {
            currentQuestionObj.contentType === "checkTasks" ? <CheckBox
                        checkBox={this.checkBox}
                        isCheckMarked={this.state.isCheckMarked}
                      /> : ""
          }
          {
            currentQuestionObj.contentType === "textArea" ? <Textfield
              onChange={e => this.setState({textArea: e.target.value})}
              value={this.state.textArea}
              label="Text lines..."
              rows={3}
              style={{width: '100%'}}
            /> : ""
          }


          </div>

          <Dialog open={this.state.openLessonDialog}>
            <DialogTitle>{this.state.lessonDialogTitle}</DialogTitle>
            <DialogContent>
              <p>{this.state.lessonDialogText}</p>
            </DialogContent>
            <DialogActions>
              <Button
                type='button'
                onClick={nextLesson}
              >{this.state.lessonDialogButton1}
              </Button>
              <Button
                type='button'
                onClick={e=>this.setState({openLessonDialog:false})}
              >{this.state.lessonDialogButton2}
            </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={this.state.openUnitDialog}>
            <DialogTitle>{this.state.unitDialogTitle}</DialogTitle>
            <DialogContent>
              <p>{this.state.unitDialogText}</p>
            </DialogContent>
            <DialogActions>
              <Button
                type='button'
                onClick={nextUnit}
              >{this.state.unitDialogButton1}
              </Button>
              <Button
                type='button'
                onClick={e=>this.setState({openUnitDialog:false})}
              >{this.state.unitDialogButton2}
            </Button>
            </DialogActions>
          </Dialog>

          <div>Unit: {parseInt(currentUnit, 10)+1} of {book.length}</div>
          <div>Lesson: {parseInt(currentLesson, 10)+1} of {book[currentUnit].lessons.length}</div>
          <div>Question: {parseInt(currentQuestion, 10)+1} of {currentLessonObj.questions.length}</div>

          <div id="lessonIconsContainer">{lessonIcons ? lessonIcons : 'nolessonicons'}</div>

          {currentQuestion === "0" ? "Please begin the lesson" : ''}

          <div id="nextPrevButtonContainer">
            <Button
              raised accent ripple
              className={prevButtonHidden ? 'hidden' : ""}
              onClick={prevQuestClickHandler}
              value="nextQuestion"
            >prevQuestion</Button>

            {
              currentQuestionObj.contentType === "checkTasks" ? <Button
                      raised accent ripple
                      className={nextButtonHidden ? 'hidden' : ""}
                      onClick={nextQuestClickHandler}
                      value="nextQuestion"
                      disabled={!isCheckMarked}
                    >nextQuestion</Button> : null
            }
            {
              currentQuestionObj.contentType === "textArea" ? <Button
                      raised accent ripple
                      className={nextButtonHidden ? 'hidden' : ""}
                      onClick={submitTextArea}
                      value="nextQuestion"
                      disabled={this.state.textArea.length === 0}
                    >nextQuestion</Button> : null
            }


          </div>
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
