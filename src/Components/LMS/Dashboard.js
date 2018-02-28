import React from 'react';
import config from '../../config/unit-cards'
import LmsCard from '../Reusable/LmsCard'
import '../../Styles/LmsCardsStyles.css';

class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state= {
      active: null
    }
    this.selectCardOnClick = this.selectCardOnClick.bind(this)
  }

  selectCardOnClick(value){
    console.log('card active', value)
    this.setState({
      ...this.state,
      active: value
    })
    console.log(this.state)
  }



  render() {
    let { active } = this.state;

    let lmsCards = config.map((card, i) => {
      return <LmsCard
        title={config[i].title}
        description={config[i].description}
        image={config[i].image}
        onClick={this.selectCardOnClick}
        value={config[i].title}
        active={active === config[i].title ? true : false}
        completed={i < 3 ? true : false}
      />
    })

    return(
      <div className="background">
        <div id="spacer"></div>
        {lmsCards}
      </div>
    )
  }
}

export default Dashboard;
