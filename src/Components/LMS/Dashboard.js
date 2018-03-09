import React from 'react';
import configUnitCards from '../../config/unitCards';
import configUserProgess from '../../config/userProgress';
import LmsCard from '../Reusable/LmsCard';
import '../../Styles/LmsCardsStyles.css';
import LessonContent from './LessonContent';
import { connect } from 'react-redux';
import { getLmsContent } from '../../redux/actions/lmsContent';
import { getUserProgress, nextQuestion } from '../../redux/actions/userProgress';
import { setCurrentValue } from "../../redux/actions/currentValues";
import { Button, Dialog, DialogTitle, DialogActions, DialogContent } from 'react-mdl';

class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state= {
      readyForRender: false,
      startStudyModal: true,
    }
    this.selectCardOnClick = this.selectCardOnClick.bind(this)
    this.nextLesson = this.nextLesson.bind(this);
    this.prevLesson = this.prevLesson.bind(this);
    this.getActiveUnit = this.getActiveUnit.bind(this);
    this.getActiveLesson = this.getActiveLesson.bind(this);
    this.getActiveQuestion = this.getActiveQuestion.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.prevQuestion = this.prevQuestion.bind(this);
    this.nextUnit = this.nextUnit.bind(this);
    this.handleStartStudy = this.handleStartStudy.bind(this);
  }


  componentDidMount(){
    this.props.getLmsContent();
    this.props.fetchUserProgress();
  }

  handleStartStudy(){
    this.getActiveUnit();
    this.setState({startStudyModal:false})
  }

  // cycle through to find first incomplete unit
  getActiveUnit(){
    console.log("getActiveUnit")
    let { book, userProgress } = this.props;
    let userProg = this.props.userProgress.currentUser.user_progress;

    // set initial value jic
    let lastUnlockedUnit = book[0];
    let finalUnitIndex;
    // 1. iterate through all units - if no value in userProg, post one.
    for(let i = 0; i < book.length; i++){
      let curUnitId = book[i].id;

      // @TODO handle this
      if(!userProg[curUnitId]){
        // console.log("this unit does not exist in userProgress");
        // a. post it to userProgress
        // b. fetch userProgress
        // c. call getActiveUnit()
      }

      let curUnitProg = userProg[curUnitId];

      if(curUnitProg.unitLocked === false){
        // this is potentially the correct unit = save the last one
        lastUnlockedUnit = book[i];
        finalUnitIndex = i;

      }
    }
    this.props.setCurrentValues("currentUnitObj", lastUnlockedUnit);
    this.props.setCurrentValues("currentUnit", finalUnitIndex)
    this.props.setCurrentValues("active", lastUnlockedUnit.id);

    // 2. set the first unit where isCompleted != true to currentActiveUnitObj & currentActiveUnit
    setTimeout(()=>{
      this.getActiveLesson();
    }, 500)


  }

  // cycle through to find first incomplete lesson
  getActiveLesson(optLessonArr){
    console.log("getActiveLesson")
    let { book, userProgress, currentValues } = this.props;
    let userProg = this.props.userProgress.currentUser.user_progress;
    let { currentUnit, currentUnitObj } = currentValues;

    // handle optional param
    if (typeof optLessonArr === 'undefined') { optLessonArr = currentUnitObj.lessons }

    // 1. iterate through lessons in the current unit
    let finalLessonIndex;
    let lastUnlockedLesson;
    for(let i = 0; i < optLessonArr.length; i++){

      let curLessonId = optLessonArr[i].id;
      // @TODO if no value, POST  lessonId=false

      let curLessonObj = userProg[currentUnitObj.id].lessons[curLessonId];

      if(curLessonObj.lessonCompleted === false && curLessonObj.lessonLocked === false){
        lastUnlockedLesson = optLessonArr[i];
        finalLessonIndex = i;
      }

      // [currentUnit].lessons[curLessonId]
    }
    this.props.setCurrentValues("currentLessonObj", lastUnlockedLesson);
    this.props.setCurrentValues("currentLesson", finalLessonIndex)
    // 2. set the first lesson where isComplete != true to currentActiveLessonObj and currentActiveLesson
    setTimeout(()=>{
      this.getActiveQuestion();
    }, 500)
  }

  // cycle through to find first question where id !== true
  getActiveQuestion(optQuestArr){ // uses optional param
    console.log("getActiveQuestion", optQuestArr);

    let { book, userProgress, currentValues } = this.props;

    let userProg = this.props.userProgress.currentUser.user_progress;

    let { currentUnit, currentUnitObj, currentLesson, currentLessonObj } = currentValues;

    // handle optional param
    if (typeof optQuestArr === 'undefined') { optQuestArr = currentLessonObj.questions }


    let questionArrProg = userProg[currentUnitObj.id].lessons[currentLessonObj.id].questions;
    // 1. iterate through questions in the active lesson

    let lastTrueQuestion;
    let finalQuestionIndex;
    // add default values if no completed questions
    lastTrueQuestion = optQuestArr[0];
    finalQuestionIndex = 0;

    for(let i = 0; i < optQuestArr.length; i++){

      let currentQuestionId = optQuestArr[i].id
      // @TODO post value to server if not present

      // 2. set the first question where id!=true as currentQuestionObj and currentQuestion
      if(questionArrProg[currentQuestionId]===true){
        lastTrueQuestion = optQuestArr[i];
        finalQuestionIndex = i;
      }
    }

    this.props.setCurrentValues("currentQuestionObj", lastTrueQuestion);
    this.props.setCurrentValues("currentQuestion", finalQuestionIndex)

    this.setState({readyForRender: true})
  }

  // sets current unit in LmsCards
  selectCardOnClick(argId){
    let { book, userProgress } = this.props;
    let userProg = userProgress.currentUser.user_progress;

    let index;
    book.forEach((unit, i) => {

      // don't allow click if it's locked
      if(unit.id === argId && !userProg[unit.id].isLocked){
        index = i.toString();
        this.props.setCurrentValues("active", argId);
        this.props.setCurrentValues("currentUnit", index);
        this.props.setCurrentValues("currentUnitObj", unit);
      }
    })
  }

  nextUnit(){

    let { currentUnit, currentUnitId, currentUnitObj, currentLesson, currentLessonObj, currentQuestion, currentQuestionObj, currentQuestionId } = this.props.currentValues;

    let { userProgress, book } = this.props;

    let targetUnit = (parseInt(currentUnit, 10) + 1);

    // the whole task obj in redux
    let taskObjRedux = userProgress.currentUser.user_progress;

    // the current task object in redux
    let curUnit =  taskObjRedux[currentUnitObj.id];

    // the current lesson from redux
    let curLesson = curUnit.lessons[currentLessonObj.id];

    // @TODO mark the current unit as completed
    taskObjRedux[currentUnitObj.id]["unitCompleted"] = true;

    // @TODO mark the next unit as unlocked
    // check to see if there is a next unit
    // console.log("checking length", targetUnit, book.length)
    let nextUnitId = currentUnit; // jic there's no next unit
    if(book.length > targetUnit){
      nextUnitId = book[targetUnit].id;

      taskObjRedux[nextUnitId]["unitLocked"] = false;
      // console.log(nextUnitId, taskObjRedux, 'taskObjRedux')

    // @TODO set new current unit, lesson, question in redux

    }
  }


  nextLesson(){

    let { currentUnit, currentUnitObj, currentLesson, currentLessonObj, currentQuestion, currentQuestionObj } = this.props.currentValues;

    let { userProgress, book } = this.props;

    let targetLesson = (parseInt(currentLesson, 10) + 1).toString();


    // the whole task obj in redux
    let taskObjRedux = userProgress.currentUser.user_progress;

    // the current task object in redux
    let curUnit =  taskObjRedux[currentUnitObj.id];

    // the current lesson from redux
    let curLesson = curUnit.lessons[currentLessonObj.id];


    // @TODO mark current lesson isCompleted
    taskObjRedux[currentUnitObj.id].lessons[currentLessonObj.id]["lessonCompleted"]=true;
    taskObjRedux[currentUnitObj.id].lessons[currentLessonObj.id]["lessonLocked"]=false;

    // @TODO mark next lesson as isUnlocked
    let nextLessonObj = currentLessonObj; // default value - should update if not last lesson in unit
    // must check to see if we're at last lesson already
    if(book[currentUnit].lessons.length === parseInt(currentLesson)+1){
      console.warn("YOURE AT THE END OF THE UNIT ALREADY")
    } else {
      // find next lesson id in book
      nextLessonObj = book[currentUnit].lessons[parseInt(currentLesson)+1]

      // set that to incomplete and unlocked in taskObjRedux
      taskObjRedux[currentUnitObj.id].lessons[nextLessonObj.id]["lessonCompleted"]=false;

      taskObjRedux[currentUnitObj.id].lessons[nextLessonObj.id]["lessonLocked"]=false;
    }

    // @TODO POST to userProgress on server
    let dto = {};
    dto["userProgress"] = taskObjRedux;
    this.props.putNextQuestion(1, dto)



    // @TODO advance to next lesson and set as currentLesson & currentLessonObj in redux
    this.props.setCurrentValues("currentLesson", targetLesson);
    this.props.setCurrentValues("currentLessonObj", book[currentUnit].lessons[targetLesson]);

    // @TODO find the first incomplete question and set that to currentQuestion
    this.getActiveQuestion(book[currentUnit].lessons[targetLesson].questions)

    // @TODO if current lesson the last lesson in unit, make the nextLesson button disabled and congratulate user on finishing.



  }

  prevLesson(){
    let currentLesson = this.state.currentLesson;
    let targetLesson = (parseInt(currentLesson, 10) - 1).toString();

    //@TODO update currentLessonObj based on targetLesson
    this.props.setCurrentValues("currentLesson", targetLesson);
    this.props.setCurrentValues("currentLessonObj", configUnitCards[this.state.currentUnit].lessons[this.state.currentLesson]);

    // this.setState({
    //   ...this.state,
    //   currentLesson: targetLesson,
    //   currentLessonObj: configUnitCards[this.state.currentUnit].lessons[this.state.currentLesson]
    // })
  }

  nextQuestion(){
    let { currentUnit, currentUnitId, currentUnitObj, currentLesson, currentLessonObj, currentQuestion, currentQuestionObj, currentQuestionId} = this.props.currentValues;
    let { userProgress, book } = this.props;


    let targetQuestion = (parseInt(currentQuestion, 10)+1).toString()


    // the whole task obj in redux
    let taskObjRedux = userProgress.currentUser.user_progress;

    // the current task object in redux
    let curUnit =  taskObjRedux[currentUnitObj.id];

    // the current lesson from redux
    let curLesson = curUnit.lessons[currentLessonObj.id];

    // the current questions from redux
    let curQuest = curLesson.questions

    // 1. put new true questionId value in questions obj
    curQuest[currentQuestionObj.id] = true;

    // 2. put questions obj in taskObjRedux
    // console.log('questionID', targetQuestion, curQuest, currentQuestionObj)
    taskObjRedux[currentUnitObj.id].lessons[currentLessonObj.id]["questions"] = curQuest;

    // case 1: there are more questions in lesson object
    if(currentLessonObj.questions.length - 1 > parseInt(currentQuestion)){
      this.props.setCurrentValues("currentQuestion", targetQuestion);
      this.props.setCurrentValues("currentQuestionObj", book[currentUnit].lessons[currentLesson].questions[targetQuestion]);

    // case 2: this is the last question in the lesson obj
    } else if (book[currentUnit].lessons.length > parseInt(currentLesson)+1) {

    }


    // 5. dispatch updated obj - format object for server
    let dto = {};
    dto["userProgress"] = taskObjRedux;
    console.log('dto', dto)
    this.props.putNextQuestion(1, dto)
  }

  prevQuestion(){
    let { currentUnit, currentUnitId, currentUnitObj, currentLesson, currentLessonObj, currentQuestion, currentQuestionObj, currentQuestionId} = this.props.currentValues;
    let { userProgress, book } = this.props;
    let targetQuestion = (parseInt(currentQuestion, 10) - 1).toString();

    this.props.setCurrentValues("currentQuestion", targetQuestion);
    this.props.setCurrentValues("currentQuestionObj", book[currentUnit].lessons[currentLesson].questions[targetQuestion]);

    // the whole task obj in redux
    let taskObjRedux = userProgress.currentUser.user_progress;

    // the current task object in redux
    let curUnit =  taskObjRedux[currentUnitObj.id];

    // the current lesson from redux
    let curLesson = curUnit.lessons[currentLessonObj.id];

    // the current questions from redux
    let curQuest = curLesson.questions

  }


  render() {

    let { active, currentUnit, currentUnitName, currentUnitId, currentLesson, currentLessonObj, currentQuestion, currentQuestionObj } = this.props.currentValues;


    let { userProgress, book } = this.props;

    let lmsCards = null;

    if(this.state.readyForRender){

      lmsCards = book.map((unit, i) => (
        <LmsCard
          index={i}
          id={book[i].id}
          title={book[i].title}
          description={book[i].description}
          image={book[i].image}
          onClick={this.selectCardOnClick}
          active={active === book[i].id ? true : false}
          key={unit.id}
        />
    ))
    }

    if(!this.state.startStudyModal && this.state.readyForRender){
    // if(false){

      return(
        <div className="background">
          <div id="spacer"></div>
          <div className="unitCardsContainer">
                  {lmsCards}
          </div>

          <div className="lessonContentContainer">
            {this.state.readyForRender ? <LessonContent
                nextUnit={this.nextUnit}
                nextLesson={this.nextLesson}
                prevLesson={this.prevLesson}
                nextQuestion={this.nextQuestion}
                prevQuestion={this.prevQuestion}
              /> : 'Select a unit to begin'}
          </div>
        </div>
      )
    }
    return (<div>
            <Dialog open={true}>
              <DialogTitle>Start Learning</DialogTitle>
              <DialogActions>
                <button
                  onClick={this.handleStartStudy}
                >
                  BEGIN
                </button>
              </DialogActions>
            </Dialog>
            </div>
    )
  }
}

const mapStateToProps = state => ({
  book: state.lmsContent.book,
  userProgress: state.userProgress,
  currentValues: state.currentValues
});

const mapDispatchToProps = dispatch => {
    return {
      getLmsContent : () => {
        dispatch(getLmsContent())
      },
      fetchUserProgress : () => {
        dispatch(getUserProgress(1))
      },
      putNextQuestion : (fb_id, data) => {
        dispatch(nextQuestion(fb_id, data ))
      },
      setCurrentValues: (key, value) => {
        dispatch(setCurrentValue(key, value))
      }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
