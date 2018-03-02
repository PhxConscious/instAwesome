import React, {Component} from 'react'
import '../../Styles/LmsCardStyles.css'
class LmsCard extends Component {
    render() {
      const { image, title, description, active, isCompleted, onClick, value, locked } = this.props;
      // if(active){
        console.log(title, 'locked"', locked, "isCompleted", isCompleted)
      // }

        return(
            <div
              className={!isCompleted ? "LmsCardContainer locked" : "LmsCardContainer unlocked"}
              id={active ? "currentCard" : ""}
              onClick={e => onClick(value)}
            >
              <div className="lockIcon"><i className="material-icons">{locked ? "lock" : ""}</i></div>
              <div className="leftSide">
                <img src={image} className="LmsImage"/>
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
