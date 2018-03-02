import React from 'react';
import configUnitCards from '../../config/unitCards';
import configUserProgess from '../../config/userProgress';
import LmsCard from '../Reusable/LmsCard';
import '../../Styles/LmsCardsStyles.css';
import LessonContent from './LessonContent';


class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state= {
      active: null,
      tasks: [],
      readyForRender: false,
      currentUnit: '',
      currentLesson: '',
    }
    this.selectCardOnClick = this.selectCardOnClick.bind(this)
    this.combineUserDataAndTaskData = this.combineUserDataAndTaskData.bind(this);
    this.nextLesson = this.nextLesson.bind(this);
    this.prevLesson = this.prevLesson.bind(this);
  }

  // this must update when a unit is finished (not just
  // initial rendering) - see if this works
  componentDidMount(){
    this.combineUserDataAndTaskData()
  }

  combineUserDataAndTaskData(){
    // temp data to simulate server
    let tasks = Object.keys(configUserProgess.progress);
    // taskArr combines server data with local data
    let taskArr = [];

    // find units on react but not in DB. add to tasks arr.
    // now we can update react and it renders automatically
    // we must post this to server later
    configUnitCards.forEach(card => {
      if(tasks.indexOf(card.id) == -1){
        tasks.push(card.id)
      }
    })

    // match up server data and local data to make one array
    // of task objecs which include a "completed" value (boolean)
    tasks.forEach(task => {
      configUnitCards.forEach(card => {
        if(card.id === task) {
          let key = card.id;
          taskArr.push({
            userProgress: {
              name: key,
              isCompleted: configUserProgess.progress[task].unitCompleted,
              isLocked: configUserProgess.progress[task].unitLocked,
              lessons: configUserProgess.progress[task].lessons
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
    for(let i = 0; i < taskArr.length; i++){
      if(taskArr[i].userProgress.isCompleted === false && taskArr[i-1].userProgress.isCompleted === true){
        activeUnitName = taskArr[i].title;
        currentUnit = i.toString();
        i = tasks.length;
      }
    }

    this.setState({
      ...this.state,
      tasks: taskArr,
      readyForRender: true,
      active: activeUnitName,
      currentUnit: currentUnit
    })
  }

  // updates state.lesson only when necessary
  componentDidUpdate(prevProps, prevState){
    if(this.state.active !== prevState.active){
          this.getInitialActiveLesson();
    }
  }

  // puts the active/selected lesson in state
  getInitialActiveLesson(){
    this.state.tasks.forEach(task => {
      if(task.title === this.state.active){

        // this block finds the first lesson from userProgress that
        // isn't complete.
        let lessons = task.userProgress.lessons;
        let firstIncompleteLesson = null;
        for(let i = lessons.length -1; i >= 0; i--){
          let lessonKey = Object.keys(lessons[i]);
          if(lessons[i][lessonKey]===false){
            firstIncompleteLesson=lessonKey[0];
          }
        }
        // determines what the inital currentLesson will be
        task.lessons.forEach((lesson, index) => {
          if (lesson.id === firstIncompleteLesson){
            this.setState({
              ...this.state,
              currentLesson: index.toString()
            })
          }
        })
      }
    })
    this.forceUpdate();
  }




  // sets current unit
  selectCardOnClick(value){
    let { tasks, active } = this.state;
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
    let currentLesson = this.state.currentLesson;
    let targetLesson = (parseInt(currentLesson) + 1).toString();
    this.setState({
      ...this.state,
      currentLesson: targetLesson
    })
  }

  prevLesson(){
    let currentLesson = this.state.currentLesson;
    let targetLesson = (parseInt(currentLesson) - 1).toString();
    this.setState({
      ...this.state,
      currentLesson: targetLesson
    })
  }

  getLengthOfCurrentLessonArray(){
    if(this.state.currentUnit){
      return this.state.tasks[this.state.currentUnit].lessons.length;
    }
  }

  render() {
    this.getLengthOfCurrentLessonArray()
    let { active, tasks, readyForRender, currentUnit, currentLesson } = this.state;
    let updatedCurrentUnit;

    let lmsCards = null;

    if(readyForRender){
      lmsCards = tasks.map((card, i) => {
        return <LmsCard
          title={configUnitCards[i].title}
          description={configUnitCards[i].description}
          image={configUnitCards[i].image}
          onClick={this.selectCardOnClick}
          value={configUnitCards[i].title}
          active={active === configUnitCards[i].title ? true : false}
          isCompleted={card.userProgress.isCompleted}
          locked={tasks[i].userProgress.isLocked}
        />
      })
    }


    return(
      <div className="background">
        <div id="spacer"></div>
        <div className="unitCardsContainer">
                {lmsCards}
        </div>

        <div className="lessonContentContainer">
          {currentLesson ? <LessonContent
              unit={configUnitCards[currentUnit]}
              lesson={configUnitCards[currentUnit].lessons[currentLesson]}
              nextLesson={this.nextLesson}
              prevLesson={this.prevLesson}
              currentUnit={currentUnit}
              currentLesson={currentLesson}
              noOfLessons={this.getLengthOfCurrentLessonArray()}
            /> : 'nope'}
        </div>
      </div>
    )
  }
}

export default Dashboard;
