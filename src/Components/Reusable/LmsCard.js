import React, {Component} from 'react'
import '../../Styles/LmsCardStyles.css'
import {connect} from 'react-redux';
import {Grid, Cell} from 'react-mdl';

class LmsCard extends Component {

    render() {
        let {
            image,
            title,
            description,
            active,
            onClick,
            userProgress,
            book,
            id,
            index
        } = this.props;

        let {currentUnit, currentUnitObj} = this.props.currentValues;

        let userProg = userProgress.currentUser.user_progress;

        let clickHandler = () => {
            if (!userProg[id].unitLocked) {
                onClick(id)
            } else {
                alert("Please finish the current unit before continuing to later units")
            }
        };

        return (
            <Grid>
                <div className={!userProg[id].unitCompleted
                    ? "LmsCardContainer locked"
                    : "LmsCardContainer unlocked"} id={active
                    ? "currentCard"
                    : ""} onClick={clickHandler}>
                    <div className={!userProg[id].unitCompleted && !active
                        ? "overlay"
                        : ""}/>
                    <Cell col={1} tablet={1}>
                        <div className="lockIcon">
                            <i className="material-icons">{userProg[id].unitLocked
                                ? "lock"
                                : ""}
                            </i>
                        </div>
                    </Cell>
                    <Cell className="imageContainer" col={6} tablet={6} phone={6}>
                        <img src={image} className="LmsImage" alt="blah"/>
                    </Cell>
                    <Cell className='lmsTitleCont' col={6} tablet={6} phone={6}>
                        <div className={userProg[id].unitCompleted
                            ? "lmsTitle"
                            : "lmsTitle greyText"} id={active
                            ? "currentCard"
                            : ""}>{title}
                        </div>
                        <p className={userProg[id].unitCompleted
                            ? "lmsDescription"
                            : "lmsDescription greyText"} id={active
                            ? "currentCard"
                            : ""}>{description}
                        </p>
                    </Cell>
                    <Cell col={1} tablet={1}>
                        <div className="lmsCheckboxSpan">
                            <i className="material-icons checkBox">{userProg[id].unitCompleted
                                ? "check_box"
                                : "visibility"}
                            </i>
                        </div>
                    </Cell>
                </div>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    book: state.lmsContent.book,
    userProgress: state.userProgress,
    currentValues: state.currentValues
})

export default connect(mapStateToProps, null)(LmsCard);
