import React, {Component} from 'react'
import '../../Styles/LmsCardStyles.css'
class LmsCard extends Component {
    render() {
      const { image, title, description, active, completed, onClick, value } = this.props;
        return(
            <div
              className={!completed ? "LmsCardContainer locked" : "LmsCardContainer unlocked"}
              id={active ? "currentCard" : ""}
              onClick={e => onClick(value)}
            >
              <div className="leftSide">
                <img src={image} className="LmsImage"/>
              </div>
              <div className="rightSide">
                <div className="titleCheckboxRow">
                  <div className="lmsTitleSpan"><p className={completed ? "lmsTitle" : "lmsTitle greyText"} id={active ? "currentCard" : ""}>{title}</p></div>
                  <div className="lmsCheckboxSpan"><i className="material-icons checkBox">{completed ? "check_box" : "visibility"}</i></div>
                </div>
                <p className={completed ? "lmsDescription" : "lmsDescription greyText"} id={active ? "currentCard" : ""}>{description}</p>
              </div>
            </div>
        )
    }
}

export default LmsCard
