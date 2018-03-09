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
    this.combineUserDataAndTaskData = this.combineUserDataAndTaskData.bind(this);
    this.nextLesson = this.nextLesson.bind(this);
    this.prevLesson = this.prevLesson.bind(this);
    this.getActiveUnit = this.getActiveUnit.bind(this);
    this.getActiveLesson = this.getActiveLesson.bind(this);
    this.getActiveLessonTemp = this.getActiveLessonTemp.bind(this);
    this.getActiveQuestion = this.getActiveQuestion.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.prevQuestion = this.prevQuestion.bind(this);
    this.nextUnit = this.nextUnit.bind(this);
    this.handleStartStudy = this.handleStartStudy.bind(this);
  }



  // this must update when a unit is finished (not just
  // initial rendering) - see if this works
  componentDidMount(){
    this.props.getLmsContent();
    this.props.fetchUserProgress();
  }


  // updates state.lesson only when necessary
  // componentDidUpdate(prevProps, prevState){
  //   let { currentValues } = this.props;
  //   if(prevProps.currentValues.tasks !== currentValues.tasks){
  //     // this.getActiveLessonTemp();
  //
  //     // this.getActiveLesson();
  //   }
  // }


  componentWillReceiveProps(nextProps){
    console.log("componentWillReceiveProps")
    if(this.props.book && this.props.book[0] && this.props.book[0].lessons){
    }

    if(nextProps !== this.props ){

      if(nextProps.book[0] && nextProps.book[0].lessons && nextProps.book[0] !== this.props.book[0]){
      }
      if(nextProps.userProgress.currentUser.user_progress !== this.props.userProgress.currentUser.user_progress){
        this.combineUserDataAndTaskData(nextProps.userProgress.currentUser.user_progress);
      }
    }
  }

  handleStartStudy(){
    this.getActiveUnit();
    this.setState({startStudyModal:false})
  }

  combineUserDataAndTaskData(userData){
    console.log("combineUserDataAndTaskData")
    let { book } = this.props;
    let tasks = Object.keys(userData);

    // taskArr combines server data with local data
    let taskArr = [];

    // find units on react but not in DB. add to tasks arr.
    // now we can update react and it renders automatically
    // we must post this to server later
    book.forEach(card => {
      if(tasks.indexOf(card.id) === -1){
        tasks.push(card.id)
      }
    })

    // match up server data and local data to make one array
    // of task objecs which include a "completed" value (boolean)
    tasks.forEach(task => {
      book.forEach(card => {
        if(card.id === task) {
          let key = card.id;
          taskArr.push({
            userProgress: {
              name: key,
              isCompleted: userData[task].unitCompleted,
              isLocked: userData[task].unitLocked,
              // lessons: userData[task].lessons
            },
            title: card.title,
            description: card.description,
            image: card.image,
            active: false,
            lessons: card.lessons,
            id: card.id
          })
        }
      })
    })


    let activeUnitName = null;
    // sets the initial active unit
    let currentUnit;
    let currentUnitId;

    for(let i = 1; i < taskArr.length; i++){
      if(taskArr[i].userProgress.isCompleted === false && taskArr[i-1].userProgress.isCompleted === true){
        activeUnitName = taskArr[i].title;
        currentUnitId = taskArr[i].id;
        currentUnit = i.toString();
        i = tasks.length;
        // now lets find the active lesson
      } else {
        activeUnitName = taskArr[0].title;
        currentUnitId = taskArr[0].id;
        currentUnit = "0";
      }
    }

    this.props.setCurrentValues("tasks", taskArr);
    this.props.setCurrentValues("active", activeUnitName);

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
    console.log("unit posting", lastUnlockedUnit, finalUnitIndex)
    this.props.setCurrentValues("currentUnitObj", lastUnlockedUnit);
    this.props.setCurrentValues("currentUnit", finalUnitIndex)

    // 2. set the first unit where isCompleted != true to currentActiveUnitObj & currentActiveUnit
    setTimeout(()=>{
      this.getActiveLesson();
    }, 500)


  }

  // cycle through to find first incomplete lesson
  getActiveLesson(){
    console.log("getActiveLesson")
    let { book, userProgress, currentValues } = this.props;
    let userProg = this.props.userProgress.currentUser.user_progress;
    let { currentUnit, currentUnitObj } = currentValues;
    // 1. interate through lessons in the current unit
    let lessonArr = currentUnitObj.lessons;
    // console.log("lessonArr", lessonArr)
    let finalLessonIndex;
    let lastUnlockedLesson;
    for(let i = 0; i < lessonArr.length; i++){

      let curLessonId = lessonArr[i].id;
      // @TODO if no value, POST  lessonId=false

      let curLessonObj = userProg[currentUnitObj.id].lessons[curLessonId];

      if(curLessonObj.lessonCompleted === false && curLessonObj.lessonLocked === false){
        lastUnlockedLesson = lessonArr[i];
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
  getActiveQuestion(){
    console.log("getActiveQuestion");

    let { book, userProgress, currentValues } = this.props;

    let userProg = this.props.userProgress.currentUser.user_progress;

    let { currentUnit, currentUnitObj, currentLesson, currentLessonObj } = currentValues;

    let questionArr = currentLessonObj.questions;
    let questionArrProg = userProg[currentUnitObj.id].lessons[currentLessonObj.id].questions;
    // 1. iterate through questions in the active lesson
    console.log("questionArr", questionArr)

    let lastTrueQuestion;
    let finalQuestionIndex;


    for(let i = 0; i < questionArr.length; i++){
      let currentQuestionId = questionArr[i].id
      // @TODO post value to server if not present

      // 2. set the first question where id!=true as currentQuestionObj and currentQuestion
      if(questionArrProg[currentQuestionId]===true){
        lastTrueQuestion = questionArr[i];
        finalQuestionIndex = i;
        // console.log(lastTrueQuestion, finalQuestionIndex)
      }
    }

    console.log("qobj now ", lastTrueQuestion, finalQuestionIndex)
    this.props.setCurrentValues("currentQuestionObj", lastTrueQuestion);
    this.props.setCurrentValues("currentQuestion", finalQuestionIndex)

    this.setState({readyForRender: true})
  }

  getActiveLessonTemp(){

    console.log("getActiveLessonTemp")
    let { currentValues } = this.props;
    let userProg = this.props.userProgress.currentUser.user_progress;

    // find first incomplete lesson within active unit
    currentValues.tasks.forEach(task => {
      let firstIncompleteLesson = null;
      let firstIncompleteQuestion = null;
      let i; // lesson index
      let j; // question index
      let finalIndexI;
      let finalIndexJ;

      if(task.title === currentValues.active){

        let lessonsProgress = userProg[task.id].lessons;

        for(i = task.lessons.length - 1; i >=0; i--){
          let lessonId = task.lessons[i].id;
          if(!lessonsProgress[lessonId].lessonCompleted) {
            firstIncompleteLesson = task.lessons[i];
            finalIndexI = i.toString();
          }

          let questions = task.lessons[i].questions;

          // find first incomplete question
          for(j = questions.length-1; j >=0; j--){
            if(!lessonsProgress[firstIncompleteLesson.id].questions[questions[j].id]){
              firstIncompleteQuestion = questions[j]
              finalIndexJ = j.toString()
            }
          }
        }

        this.props.setCurrentValues("active", task.title);
        this.props.setCurrentValues("currentUnitName", task.title);
        this.props.setCurrentValues("currentUnitId", task.id);
        this.props.setCurrentValues("currentUnitObj", task);
        this.props.setCurrentValues("currentLesson", finalIndexI);
        this.props.setCurrentValues("currentLessonObj", firstIncompleteLesson);
        this.props.setCurrentValues("currentLessonName", firstIncompleteLesson.title);
        this.props.setCurrentValues("currentQuestion", finalIndexJ);
        this.props.setCurrentValues("currentQuestionName", firstIncompleteQuestion.title);
        this.props.setCurrentValues("currentQuestionId", firstIncompleteQuestion.id);
        this.props.setCurrentValues("currentQuestionObj", firstIncompleteQuestion);
      }
    })
  }



  // sets current unit
  selectCardOnClick(value){
    let { tasks } = this.props.currentValues;
    let index;
    tasks.forEach((task, i) => {

      if(task.title === value && !task.userProgress.isLocked){
        index = i.toString();
        this.props.setCurrentValues("active", value);
        this.props.setCurrentValues("currentUnit", index);
        this.props.setCurrentValues("currentUnitObj", task);
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

    // @TODO mark the current lesson as complete


    // @TODO post this progress to the server
    // @TODO set new current unit, lesson, question in redux
    // may have to cycle through and find next incomplete
    }
  }






  nextLesson(){

    let { currentUnit, currentUnitId, currentUnitObj, currentLesson, currentLessonObj, currentQuestion, currentQuestionObj, currentQuestionId } = this.props.currentValues;

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

    // @TODO find the first incomplete question and set that to currentQuestion

    // @TODO advance to next lesson and set as currentLesson & currentLessonObj in redux
    this.props.setCurrentValues("currentLesson", targetLesson);
    this.props.setCurrentValues("currentLessonObj", configUnitCards[currentUnit].lessons[currentLesson]);

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

    console.log("curQuest1", curQuest)
    // 1. put new true questionId value in questions obj
    curQuest[currentQuestionObj.id] = true;
    console.log("curQuest2", curQuest, currentQuestionObj.id)

    // 2. put questions obj in taskObjRedux
    // console.log('questionID', targetQuestion, curQuest, currentQuestionObj)
    taskObjRedux[currentUnitObj.id].lessons[currentLessonObj.id]["questions"] = curQuest;


    if(currentLessonObj.questions.length - 1 > parseInt(currentQuestion)+1){
      this.props.setCurrentValues("currentQuestion", targetQuestion);
      this.props.setCurrentValues("currentQuestionObj", book[currentUnit].lessons[currentLesson].questions[targetQuestion]);
    // handle if this is the last question of lesson && another lesson exists

  } else if (book[currentUnit].lessons.length > parseInt(currentLesson)+1) {

      this.props.setCurrentValues("currentQuestion", "0");
      this.props.setCurrentValues("currentQuestionObj", book[currentUnit].lessons[parseInt(currentLesson)+1].questions["0"]);
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

    let { active, tasks, currentUnit, currentUnitName, currentUnitId, currentLesson,  currentLessonObj, currentQuestion, currentQuestionObj } = this.props.currentValues;



    let { userProgress, book } = this.props;

    let lmsCards = null;

    if(tasks){

      lmsCards = tasks.map((card, i) => (
        <LmsCard
          index={i}
          id={book[i].id}
          title={book[i].title}
          description={book[i].description}
          image={book[i].image}
          onClick={this.selectCardOnClick}
          active={active === book[i].title ? true : false}
          isCompleted={card.userProgress.isCompleted}
          locked={tasks[i].userProgress.isLocked}
          key={card.id}
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
            {currentLesson ? <LessonContent
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
