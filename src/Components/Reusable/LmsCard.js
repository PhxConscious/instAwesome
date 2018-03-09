import React, {Component} from 'react'
import '../../Styles/LmsCardStyles.css'
class LmsCard extends Component {
    constructor(props){
      super(props);
      this.getCurrentCard = this.getCurrentCard.bind(this);
    }

    getCurrentCard(){
      // cycle through cards to find which one is current

      //set state values for isLocked and isComplete
    }

    render() {
      const { image, title, description, active, isCompleted, onClick, locked } = this.props;

        return(
            <div
              className={!isCompleted ? "LmsCardContainer locked" : "LmsCardContainer unlocked"}
              id={active ? "currentCard" : ""}
              onClick={e => onClick(title)}
            >
              <div className="lockIcon"><i className="material-icons">{locked ? "lock" : ""}</i></div>
              <div className="leftSide">
                <img src={image} className="LmsImage" alt="blah"/>
              </div>
              <div className="rightSide">
                <div className="titleCheckboxRow">
                  <div className="lmsTitleSpan"><p className={isCompleted ? "lmsTitle" : "lmsTitle greyText"} id={active ? "currentCard" : ""}>{title}</p></div>
                  <div className="lmsCheckboxSpan"><i className="material-icons checkBox">{isCompleted ? "check_box" : "visibility"}</i></div>
                </div>
                <p className={isCompleted ? "lmsDescription" : "lmsDescription greyText"} id={active ? "currentCard" : ""}>{description}</p>
              </div>
            </div>
        )
    }
}

export default LmsCard
