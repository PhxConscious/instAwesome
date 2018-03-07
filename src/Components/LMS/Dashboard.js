import React from 'react';
import configUnitCards from '../../config/unitCards';
import configUserProgess from '../../config/userProgress';
import LmsCard from '../Reusable/LmsCard';
import '../../Styles/LmsCardsStyles.css';
import LessonContent from './LessonContent';
import { connect } from 'react-redux';
import { getLmsContent } from '../../redux/actions/lmsContent';
import { getUserProgress, nextQuestion } from '../../redux/actions/userProgress';
import { setCurrentValue } from "../../redux/actions/currentValues"

class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state= {
      active: null,
      tasks: [],
      readyForRender: false,
      currentUnit: '',
      currentUnitName: '', /* set equal to active for now*/
      currentUnitId: null,
      currentLesson: '',
      currentLessonName: '', /*not in yet*/
      currentLessonObj: null,
      currentQuestion: '', /*not in yet string num*/
      currentQuestionName: '',
      currentQuestionId: '',
      currentQuestionObj: null,
      book: null,
      user: null,
    }
    this.selectCardOnClick = this.selectCardOnClick.bind(this)
    this.combineUserDataAndTaskData = this.combineUserDataAndTaskData.bind(this);
    this.nextLesson = this.nextLesson.bind(this);
    this.prevLesson = this.prevLesson.bind(this);
    this.getActiveLesson = this.getActiveLesson.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.prevQuestion = this.prevQuestion.bind(this);
  }



  // this must update when a unit is finished (not just
  // initial rendering) - see if this works
  componentDidMount(){
    // this.combineUserDataAndTaskData()
    this.props.getLmsContent();
    this.props.fetchUserProgress();
  }


  componentWillReceiveProps(nextProps){
    if(this.props.book && this.props.book[0] && this.props.book[0].lessons){
    }

    if(nextProps !== this.props ){

      if(nextProps.book[0] && nextProps.book[0].lessons && nextProps.book[0] !== this.props.book[0]){
      }
      if(nextProps.userProgress.currentUser.user_progress !== this.props.userProgress.currentUser.user_progress){
        this.setState({
          ...this.state,
          user: nextProps.userProgress
        })
        this.combineUserDataAndTaskData(nextProps.userProgress.currentUser.user_progress);
      }
    }
  }

  combineUserDataAndTaskData(userData){
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
              lessons: userData[task].lessons
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
    let activeUnitLessons;
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
    this.props.setCurrentValues("currentUnit", currentUnit);
    this.props.setCurrentValues("currentUnitName", activeUnitName)
    this.props.setCurrentValues("currentUnitId", currentUnitId)

    this.setState({
      ...this.state,
      tasks: taskArr,
      readyForRender: true,
      active: activeUnitName,
      currentUnit: currentUnit,
      currentUnitName: activeUnitName,
      currentUnitId: currentUnitId,
    });
  }


  // updates state.lesson only when necessary
  componentDidUpdate(prevProps, prevState){
    if(this.state.active !== prevState.active){
        this.getActiveLesson();
    }
  }

  getActiveLesson(){
    // find first incomplete lesson within active unit
    this.state.tasks.forEach(task => {
      let firstIncompleteLesson = null;
      let firstIncompleteQuestion = null;
      let i; // lesson index
      let j; // question index
      let finalIndexI;
      let finalIndexJ;

      if(task.title === this.state.active){

        let lessonsProgress = this.props.userProgress.currentUser.user_progress[task.id].lessons;


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


        this.setState({
          ...this.state,
          active: task.title,
          currentUnitName: task.title,
          currentUnitId: task.id,
          currentLesson: finalIndexI,
          currentLessonObj: firstIncompleteLesson,
          currentLessonName: firstIncompleteLesson.title,
          currentQuestion: finalIndexJ,
          currentQuestionName: firstIncompleteQuestion.title,
          currentQuestionId: firstIncompleteQuestion.id,
          currentQuestionObj: firstIncompleteQuestion
        })
      }
    })
  }

  // sets current unit
  selectCardOnClick(value){
    let { tasks } = this.state;
    let index;
    tasks.forEach((task, i) => {

      if(task.title === value && !task.userProgress.isLocked){
        index = i.toString();
        this.setState({
          ...this.state,
          active: value,
          currentUnit: index
        })
      }
    })
  }

  nextLesson(){

    let { currentUnit, currentUnitId, currentLesson, currentLessonObj, currentQuestion, currentQuestionObj, currentQuestionId} = this.state;
    let { userProgress, book } = this.props;

    let targetLesson = (parseInt(currentLesson, 10) + 1).toString();
    this.setState({
      ...this.state,
      currentLesson: targetLesson,
      currentLessonObj: configUnitCards[this.state.currentUnit].lessons[this.state.currentLesson]
    })

    // the whole task obj in redux
    let taskObjRedux = userProgress.currentUser.user_progress;

    // the current task object in redux
    let curUnit =  taskObjRedux[currentUnitId];

    // the current lesson from redux
    let curLesson = curUnit.lessons[currentLessonObj.id];

    // 1. change isCompleted: already finished

    // 2. figure out if there is a nextLesson
    // can't use this until questions reset to zero after lesson change
    if(book[currentLesson].lessons.length === parseInt(currentLesson)+1){
      console.log("this is the last lesson in the unit",book[currentLesson].lessons.length, parseInt(currentLesson)+1)
    }
      // if not: handle changeUnit:
        // unlock the next unit.
        // advance units

      // if so: advance lesson
        // unlock next lesson
        // current lesson is already set to completed
        // make sure questions go back to 1st question.

    // 3. update redux userProgress object

    // 4. forceUpdate?
  }

  prevLesson(){
    let currentLesson = this.state.currentLesson;
    let targetLesson = (parseInt(currentLesson, 10) - 1).toString();
    this.setState({
      ...this.state,
      currentLesson: targetLesson,
      currentLessonObj: configUnitCards[this.state.currentUnit].lessons[this.state.currentLesson]
    })
  }

  nextQuestion(){
    this.props.getLmsContent();
    let { currentUnit, currentUnitId, currentLesson, currentLessonObj, currentQuestion, currentQuestionObj, currentQuestionId} = this.state;
    let { userProgress, book } = this.props;
    let targetQuestion = (parseInt(currentQuestion, 10) + 1).toString();

    this.setState({
      ...this.state,
      currentQuestion: targetQuestion,
      currentQuestionObj: book[currentUnit].lessons[currentLesson].questions[targetQuestion]
    })


    // the whole task obj in redux
    let taskObjRedux = userProgress.currentUser.user_progress;

    // the current task object in redux
    let curUnit =  taskObjRedux[currentUnitId];

    // the current lesson from redux
    let curLesson = curUnit.lessons[currentLessonObj.id];

    // the current questions from redux
    let curQuest = curLesson.questions


    // 1. put new true questionId value in questions obj
    curQuest[currentQuestionObj.id] = true;

    // 2. put questions obj in taskObjRedux
    taskObjRedux[currentUnitId].lessons[currentLessonObj.id]["questions"] = curQuest;

    // 3. handle if it's the end of a lesson
    if(parseInt(targetQuestion)+1 === currentLessonObj.questions.length){
      taskObjRedux[currentUnitId].lessons[currentLessonObj.id]["lessonCompleted"]=true;
      taskObjRedux[currentUnitId].lessons[currentLessonObj.id]["lessonLocked"]=false;
    }
    // 4. handle if it's the end of a unit
    // console.log("handleUnitEnd")

    // 5. dispatch updated obj - format object for server
    let dto = {};
    dto["userProgress"] = taskObjRedux;

    this.props.putNextQuestion(1, dto)
    // console.log("Book2", this.props.book[0].lessons[0].questions)
    this.props.getLmsContent()
  }

  prevQuestion(){
    let { currentUnit, currentUnitId, currentLesson, currentLessonObj, currentQuestion, currentQuestionObj, currentQuestionId} = this.state;
    let { userProgress, book } = this.props;

    let targetQuestion = (parseInt(currentQuestion, 10) - 1).toString();
    this.setState({
      ...this.state,
      currentQuestion: targetQuestion,
      currentQuestionObj: book[currentUnit].lessons[currentLesson].questions[targetQuestion]
    })

    // the whole task obj in redux
    let taskObjRedux = userProgress.currentUser.user_progress;

    // the current task object in redux
    let curUnit =  taskObjRedux[currentUnitId];

    // the current lesson from redux
    let curLesson = curUnit.lessons[currentLessonObj.id];

    // the current questions from redux
    let curQuest = curLesson.questions


    // 1. put new true questionId value in questions obj
    curQuest[currentQuestionObj.id] = true;

    // 2. put questions obj in taskObjRedux
    let reduxObj = taskObjRedux[currentUnitId].lessons[currentLessonObj.id]
    reduxObj["questions"] = curQuest;

    // 3. handle if it's the end of a lesson
    if(parseInt(targetQuestion)+1 === currentLessonObj.questions.length){
      taskObjRedux[currentUnitId].lessons[currentLessonObj.id]["lessonCompleted"]=true;
      taskObjRedux[currentUnitId].lessons[currentLessonObj.id]["lessonLocked"]=false;
      // console.log("handleLessonEnd", taskObjRedux)
    }
    // 4. handle if it's the end of a unit
    // console.log("handleUnitEnd")

    // 5. dispatch updated obj - format object for server
    let dto = {};
    dto["userProgress"] = taskObjRedux;
    this.props.putNextQuestion(1, dto)
  }

  getLengthOfCurrentLessonArray(){
    if(this.state.currentUnit){
      return this.state.tasks[this.state.currentUnit].lessons.length;
    }
  }

  render() {

    this.getLengthOfCurrentLessonArray()
    let { active, tasks, readyForRender, currentUnit, currentUnitName, currentUnitId, currentLesson,  currentLessonObj, currentQuestion, currentQuestionObj } = this.state;

    let { userProgress, book } = this.props;

    let lmsCards = null;

    if(readyForRender){

      lmsCards = tasks.map((card, i) => {
        return <LmsCard
          title={book[i].title}
          description={book[i].description}
          image={book[i].image}
          onClick={this.selectCardOnClick}
          value={book[i].title}
          active={active === book[i].title ? true : false}
          isCompleted={card.userProgress.isCompleted}
          locked={tasks[i].userProgress.isLocked}
          key={card.id}
        />
      })
    }

    if(readyForRender){


      return(
        <div className="background">
          <div id="spacer"></div>
          <div className="unitCardsContainer">
                  {lmsCards}
          </div>

          <div className="lessonContentContainer">
            {currentLesson ? <LessonContent
                unit={book[currentUnit]}
                lesson={book}
                nextLesson={this.nextLesson}
                prevLesson={this.prevLesson}
                nextQuestion={this.nextQuestion}
                prevQuestion={this.prevQuestion}
                currentUnit={currentUnit}
                currentUnitId={currentUnitId}
                currentLesson={currentLesson}
                currentLessonObj={currentLessonObj}
                currentQuestion={currentQuestion}
                currentQuestionObj={currentQuestionObj}
                noOfLessons={this.getLengthOfCurrentLessonArray()}
              /> : 'Select a unit to begin'}
          </div>
        </div>
      )
    }
    return <div>loading...</div>
  }
}

const mapStateToProps = state => ({
  book: state.lmsContent.book,
  userProgress: state.userProgress
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
