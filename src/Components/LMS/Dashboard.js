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
    }
    this.selectCardOnClick = this.selectCardOnClick.bind(this)
    this.combineUserDataAndTaskData = this.combineUserDataAndTaskData.bind(this);

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
            task: {
              name: key,
              isCompleted: configUserProgess.progress[task]
            },
            title: card.title,
            description: card.description,
            image: card.image,
            active: false,
            lesson: card.lesson
          })
        }
      })
    })

    let activeTask = null;
    // sets the initial active unit
    for(let i = 0; i < taskArr.length; i++){
      if(taskArr[i].task.isCompleted === false && taskArr[i-1].task.isCompleted === true){
        activeTask = taskArr[i].title;
        i = tasks.length;
      }
    }

    this.setState({
      ...this.state,
      tasks: taskArr,
      readyForRender: true,
      active: activeTask
    })
  }

  // updates state.lesson only when necessary
  componentDidUpdate(prevProps, prevState){
    if(this.state.active !== prevState.active){
          this.getActiveLesson();
    }
  }

  // puts the active/selected lesson in state
  getActiveLesson(){
    this.state.tasks.forEach(task => {
      if(task.title === this.state.active){
        this.setState({
          ...this.state,
          currentLesson: task.lesson
        })
      }
    })
  }

  selectCardOnClick(value){
    this.setState({
      ...this.state,
      active: value
    })
  }


  render() {
    console.log("state:", this.state)
    let { active, tasks, readyForRender, currentLesson } = this.state;

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
          completed={card.task.isCompleted}
        />
      })
    }

    if (currentLesson) {
      console.log('lesson', currentLesson, currentLesson[0].title)
}
    return(
      <div className="background">
        <div id="spacer"></div>
        <div className="unitCardsContainer">
                {lmsCards}
        </div>

        <div className="lessonContentContainer">
          {currentLesson ? <LessonContent lesson={currentLesson} /> : 'nope'}
        </div>
      </div>
    )
  }
}

export default Dashboard;
