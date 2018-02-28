import React from 'react';
import configUnitCards from '../../config/unitCards';
import configUserProgess from '../../config/userProgress';
import LmsCard from '../Reusable/LmsCard';
import '../../Styles/LmsCardsStyles.css';

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

  componentDidMount(){
    this.combineUserDataAndTaskData()
  }

  combineUserDataAndTaskData(){
    let tasks = Object.keys(configUserProgess.progress);
    // let taskObj = {};
    let taskArr = [];
    tasks.forEach(task => {
      configUnitCards.forEach(card => {
        if(card.id === task) {
          // taskObj[task] = configUserProgess.progress[task]
          let key = card.id;
          taskArr.push({
            task: {
              name: key,
              isCompleted: configUserProgess.progress[task]
            },
            title: card.title,
            description: card.description,
            image: card.image,
            active: false
          })
        }
      })
    })
    let activeTask = null;
    for(let i = 0; i < taskArr.length; i++){
      // console.log(taskArr[i].task.isCompleted)
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

  selectCardOnClick(value){
    // this.state.tasks.forEach(task=>{
    //   if(task.task.name === value && task.task.isCompleted === true){
    //     console.log("task", task.task.name, task.task.isCompleted)
    //   }
    // })
    this.setState({
      ...this.state,
      active: value
    })
  }


  render() {

    let { active, tasks, readyForRender } = this.state;

    let lmsCards = null;

    //
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



    return(
      <div className="background">
        <div id="spacer"></div>
        {lmsCards}
      </div>
    )
  }
}

export default Dashboard;
