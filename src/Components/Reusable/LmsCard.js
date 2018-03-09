import React, {Component} from 'react'
import '../../Styles/LmsCardStyles.css'
import { connect } from 'react-redux';

class LmsCard extends Component {

    render() {
      let { image, title, description, active, onClick, userProgress, book, id, index} = this.props;

      let { currentUnit, currentUnitObj, } = this.props.currentValues;

      let userProg = userProgress.currentUser.user_progress;

        return(
            <div
              className={!userProg[id].unitCompleted ? "LmsCardContainer locked" : "LmsCardContainer unlocked"}
              id={active ? "currentCard" : ""}
              onClick={e => onClick(title)}
            >
              <div className="lockIcon"><i className="material-icons">{userProg[id].unitLocked ? "lock" : ""}</i></div>
              <div className="leftSide">
                <img src={image} className="LmsImage" alt="blah"/>
              </div>
              <div className="rightSide">
                <div className="titleCheckboxRow">
                  <div className="lmsTitleSpan"><p className={userProg[id].unitCompleted ? "lmsTitle" : "lmsTitle greyText"} id={active ? "currentCard" : ""}>{title}</p></div>
                  <div className="lmsCheckboxSpan"><i className="material-icons checkBox">{userProg[id].unitCompleted ? "check_box" : "visibility"}</i></div>
                </div>
                <p className={userProg[id].unitCompleted ? "lmsDescription" : "lmsDescription greyText"} id={active ? "currentCard" : ""}>{description}</p>
              </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
  book: state.lmsContent.book,
  userProgress: state.userProgress,
  currentValues: state.currentValues
})

export default connect(mapStateToProps, null)(LmsCard);
