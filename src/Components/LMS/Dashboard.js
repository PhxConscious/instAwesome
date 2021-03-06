import React from 'react';
import LmsCard from '../Reusable/LmsCard';
import '../../Styles/DashboardStyles.css';
import LessonContent from './LessonContent';
import {connect} from 'react-redux';
import {nextQuestion} from '../../redux/actions/userProgress';
import {setCurrentValue} from "../../redux/actions/currentValues";
import {Grid, Cell, Snackbar} from 'react-mdl';
import {Redirect} from 'react-router-dom';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            readyForRender: false,
            isSnackbarActive: false,
            snackbarText: ''
        };
        this.selectCardOnClick = this.selectCardOnClick.bind(this);
        this.selectLessonOnClick = this.selectLessonOnClick.bind(this);
        this.nextLesson = this.nextLesson.bind(this);
        this.prevLesson = this.prevLesson.bind(this);
        this.getActiveUnit = this.getActiveUnit.bind(this);
        this.getActiveLesson = this.getActiveLesson.bind(this);
        this.getActiveQuestion = this.getActiveQuestion.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.prevQuestion = this.prevQuestion.bind(this);
        this.nextUnit = this.nextUnit.bind(this);
        this.handleShowSnackbar = this.handleShowSnackbar.bind(this);
        this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
    }


    componentDidMount() {
        console.log('componentDidMount in lms')
        // @TODO remove timeout
        if (this.props.currentValues.currentFbId) {
            console.log('component mounted and theyere a fb_id')
            setTimeout(() => {
                this.getActiveUnit();
            }, 0)
        }
    }


    renderSnackbar = () => {
        return (
            <Snackbar className='snackbar' active={this.state.isSnackbarActive} timeout={2000}
                      onTimeout={this.handleTimeoutSnackbar}>{this.state.snackbarText}</Snackbar>
        )
    };


    handleShowSnackbar() {
        this.setState({isSnackbarActive: true});
    }


    handleTimeoutSnackbar() {
        this.setState({isSnackbarActive: false});
    }


    // cycle through to find first incomplete unit
    getActiveUnit() {
        console.log("getActiveUnit");
        let {book} = this.props;
        let userProg = this.props.userProgress.currentUser.user_progress;
        // set initial value jic
        let lastUnlockedUnit = book[0];
        let finalUnitIndex;
        // 1. iterate through all units - if no value in userProg, post one.

        for (let i = 0; i < book.length; i++) {
            let curUnitId = book[i].id;

            // @TODO handle this
            if (!userProg[curUnitId]) {
                // console.log("this unit does not exist in userProgress");
                // a. post it to userProgress
                // b. fetch userProgress
                // c. call getActiveUnit()
            }
            // console.log("getActiveUnit set", userProg, curUnitId)
            let curUnitProg = userProg[curUnitId];
            // console.log("curUnitProg", curUnitProg)
            if (curUnitProg.unitLocked === false) {
                // this is potentially the correct unit = save the last one
                lastUnlockedUnit = book[i];
                finalUnitIndex = i;
            }
        }
        // 2. set the first unit where isCompleted != true to currentActiveUnitObj & currentActiveUnit
        this.props.setCurrentValues("currentUnitObj", lastUnlockedUnit);
        this.props.setCurrentValues("currentUnit", finalUnitIndex)
        this.props.setCurrentValues("active", lastUnlockedUnit.id);
        // now that we have a unit, lets get the lesson
        this.getActiveLesson(lastUnlockedUnit, lastUnlockedUnit.id);
    };


    // cycle through to find first incomplete lesson
    getActiveLesson(optUnitObj, optUnitId) {
        console.log("getActiveLesson", optUnitObj, optUnitId)
        let {userProgress, currentValues} = this.props;
        let userProg = userProgress.currentUser.user_progress;
        let {currentUnitObj} = currentValues;

        // handle optional param
        if (typeof optUnitObj === 'undefined') {
            optUnitObj = currentUnitObj
        }
        if (typeof optUnitId === 'undefined') {
            optUnitId = currentUnitObj.id
        }
        // 1. iterate through lessons in the current unit
        let lastUnlockedLesson = optUnitObj.lessons[0];
        let finalLessonIndex = 0;

        for (let i = 0; i < optUnitObj.lessons.length; i++) {
            let curLessonId = optUnitObj.lessons[i].id;
            // @TODO if no value, POST  lessonId=false
            let curLessonObj = userProg[optUnitId].lessons[curLessonId];
            if (curLessonObj.lessonCompleted === false && curLessonObj.lessonLocked === false) {
                lastUnlockedLesson = optUnitObj.lessons[i];
                finalLessonIndex = i;
            }
        }
        // set the first lesson where isComplete != true to currentActiveLessonObj and currentActiveLesson
        this.props.setCurrentValues("currentLessonObj", lastUnlockedLesson);
        this.props.setCurrentValues("currentLesson", finalLessonIndex);
        // now lets get our active question based on our active lesson output
        this.getActiveQuestion(lastUnlockedLesson.questions);
    }


    // cycle through to find first question where id !== true
    getActiveQuestion(optQuestArr) { // uses optional param
        console.log("getActiveQuestion", optQuestArr);
        let {userProgress, currentValues} = this.props;
        let userProg = userProgress.currentUser.user_progress;
        let {currentUnitObj, currentLessonObj} = currentValues;

        // handle optional param
        if (typeof optQuestArr === 'undefined') {
            optQuestArr = currentLessonObj.questions
        }

        let questionArrProg = userProg[currentUnitObj.id].lessons[currentLessonObj.id].questions;
        // 1. iterate through questions in the active lesson
        let lastTrueQuestion;
        let finalQuestionIndex;
        // add default values if no completed questions
        lastTrueQuestion = optQuestArr[0];
        finalQuestionIndex = 0;

        for (let i = 0; i < optQuestArr.length; i++) {
            let currentQuestionId = optQuestArr[i].id;
            // @TODO post value to server if not present
            // 2. set the first question where id!=true as currentQuestionObj and currentQuestion
            if (questionArrProg[currentQuestionId] === true) {
                lastTrueQuestion = optQuestArr[i];
                finalQuestionIndex = i;
            }
        }
        // if all questions are true than go to the first question
        if (finalQuestionIndex === optQuestArr.length - 1) {
            lastTrueQuestion = optQuestArr[0];
            finalQuestionIndex = 0;
        }
        this.props.setCurrentValues("currentQuestionObj", lastTrueQuestion);
        this.props.setCurrentValues("currentQuestion", finalQuestionIndex);
        this.setState({readyForRender: true})
    }


    // sets current unit in LmsCards
    selectCardOnClick(argId) {
        let {book, userProgress} = this.props;
        let userProg = userProgress.currentUser.user_progress;
        let index;

        book.forEach((unit, i) => {
            // don't allow click if it's locked
            if (unit.id === argId && !userProg[unit.id].isLocked) {
                index = i.toString();
                this.props.setCurrentValues("active", argId);
                this.props.setCurrentValues("currentUnit", index);
                this.props.setCurrentValues("currentUnitObj", unit);
                // call getActiveLesson to set the correct active lesson/question
                this.getActiveLesson(book[index], unit.id);
            }
        })
    }


    selectLessonOnClick(lessonIndex) {
        let {book, currentValues} = this.props;
        let {currentUnit} = currentValues;
        let targetLesson = book[currentUnit].lessons[lessonIndex];
        console.log("targetLesson", targetLesson);

        this.props.setCurrentValues("currentLesson", lessonIndex);
        this.props.setCurrentValues("currentLessonObj", targetLesson);
        this.getActiveQuestion(targetLesson.questions)
    }


    nextUnit() {
        let {currentUnit, currentUnitObj, currentLessonObj, currentFbId} = this.props.currentValues;
        let {userProgress, book} = this.props;
        // the whole task obj in redux
        let taskObjRedux = userProgress.currentUser.user_progress;

        // marks the current unit as completed
        taskObjRedux[currentUnitObj.id]["unitCompleted"] = true;
        taskObjRedux[currentUnitObj.id]["unitLocked"] = false;
        // marks current lesson as completed
        taskObjRedux[currentUnitObj.id].lessons[currentLessonObj.id]["lessonCompleted"] = true;
        taskObjRedux[currentUnitObj.id].lessons[currentLessonObj.id]["lessonLocked"] = false;

        let nextUnit;
        let nextUnitObj;

        // check to see if next unit exists
        // case 1: no more units exist
        if (!book[parseInt(currentUnit, 10) + 1]) {
            this.setState({
                snackbarText: "CONGRATULATIONS YOU FINISHED THE COURSE!"
            });
            this.handleShowSnackbar();

            // case 2: there is a next unit
        } else {
            // marks the next unit as unlocked
            nextUnit = parseInt(currentUnit, 10) + 1;
            nextUnitObj = book[parseInt(currentUnit, 10) + 1];
            // prepares to update server
            taskObjRedux[nextUnitObj.id]["unitCompleted"] = false;
            taskObjRedux[nextUnitObj.id]["unitLocked"] = false;
            // sets new current unit, lesson, question in redux.currentValues
            this.props.setCurrentValues("currentUnit", nextUnit);
            this.props.setCurrentValues("currentUnitObj", nextUnitObj);
            this.props.setCurrentValues("active", nextUnitObj.id)
        }
        this.getActiveLesson(book[nextUnit], nextUnitObj.id);
        // 5. dispatch updated obj - format object for server
        let dto = {};
        dto["userProgress"] = taskObjRedux;
        console.log('next unit dto', dto);
        this.props.putNextQuestion(currentFbId, dto)
    }


    nextLesson() {
        let {currentUnit, currentUnitObj, currentLesson, currentLessonObj, currentFbId} = this.props.currentValues;
        let {userProgress, book} = this.props;
        let targetLesson = (parseInt(currentLesson, 10) + 1).toString();
        // the whole task obj in redux
        let taskObjRedux = userProgress.currentUser.user_progress;

        // marks current lesson isCompleted
        taskObjRedux[currentUnitObj.id].lessons[currentLessonObj.id]["lessonCompleted"] = true;
        taskObjRedux[currentUnitObj.id].lessons[currentLessonObj.id]["lessonLocked"] = false;

        let nextLessonObj = currentLessonObj; // default value - should update if not last lesson in unit

        // must check to see if we're at last lesson already
        // case 1: it's the last lesson in unit
        if (book[currentUnit].lessons.length === parseInt(currentLesson, 10) + 1) {
            console.warn("Should not print this: somthing is broken")
            // this should be handled in the nextQuestion button in CheckTasks
            // case 2: it's not the last lesson in the unit
        } else {
            // find next lesson id in book
            nextLessonObj = book[currentUnit].lessons[parseInt(currentLesson, 10) + 1];

            // set that to incomplete and unlocked in taskObjRedux
            taskObjRedux[currentUnitObj.id].lessons[nextLessonObj.id]["lessonCompleted"] = false;
            taskObjRedux[currentUnitObj.id].lessons[nextLessonObj.id]["lessonLocked"] = false;

            // advances to next lesson and set as currentLesson & currentLessonObj in redux
            this.props.setCurrentValues("currentLesson", targetLesson);
            this.props.setCurrentValues("currentLessonObj", book[currentUnit].lessons[targetLesson]);
        }
        // POSTs to userProgress on server
        let dto = {};
        dto["userProgress"] = taskObjRedux;
        console.log("DTO from next lesson", dto);
        this.props.putNextQuestion(currentFbId, dto);
        // finds the first incomplete question and set that to currentQuestion
        this.getActiveQuestion(book[currentUnit].lessons[targetLesson].questions)
    }


    prevLesson() {
        let {currentUnit, currentLesson} = this.props.currentValues;
        let {book} = this.props;
        // handle if there is no previous lesson in unit
        let targetLesson = currentLesson; // default value

        // case 1: there is a previous lesson
        if (currentLesson > 0) {
            targetLesson = (parseInt(currentLesson, 10) - 1).toString();

            // case 2: there is not a previous lesson
        } else {
            this.setState({
                snackbarText: "You are at the first lesson - select a different unit"
            });
            this.handleShowSnackbar();
            // alert("You are at the first lesson - select a different unit")
        }
        // update currentLessonObj based on targetLesson
        this.props.setCurrentValues("currentLesson", targetLesson);
        // update these params
        this.props.setCurrentValues("currentLessonObj", book[currentUnit].lessons[targetLesson]);
        // finds the first incomplete question and set that to currentQuestion
        this.getActiveQuestion(book[currentUnit].lessons[targetLesson].questions)
    }


    nextQuestion() {
        let {currentUnit, currentUnitObj, currentLesson, currentLessonObj, currentQuestion, currentQuestionObj, currentFbId} = this.props.currentValues;
        let {userProgress, book} = this.props;
        let targetQuestion = (parseInt(currentQuestion, 10) + 1).toString()
        // the whole task obj in redux
        let taskObjRedux = userProgress.currentUser.user_progress;
        // the current task object in redux
        let curUnit = taskObjRedux[currentUnitObj.id];
        // the current lesson from redux
        let curLesson = curUnit.lessons[currentLessonObj.id];
        // the current questions from redux
        let curQuest = curLesson.questions;

        // 1. put new true questionId value in questions obj
        curQuest[currentQuestionObj.id] = true;
        // 2. put questions obj in taskObjRedux
        // console.log('questionID', targetQuestion, curQuest, currentQuestionObj)
        taskObjRedux[currentUnitObj.id].lessons[currentLessonObj.id]["questions"] = curQuest;

        // case 1: there are more questions in lesson object
        if (currentLessonObj.questions.length - 1 > parseInt(currentQuestion, 10)) {
            this.props.setCurrentValues("currentQuestion", targetQuestion);
            this.props.setCurrentValues("currentQuestionObj", book[currentUnit].lessons[currentLesson].questions[targetQuestion]);

            // case 2: this is the last question in the lesson obj
        } else if (book[currentUnit].lessons.length > parseInt(currentLesson, 10) + 1) {
            // this is being handled because CheckTasks routes this case to nextLesson
            console.log("should not print this: something is broken")
        }
        // 5. dispatch updated obj - format object for server
        let dto = {};
        dto["userProgress"] = taskObjRedux;
        console.log('next question dto', dto);
        this.props.putNextQuestion(currentFbId, dto)
    }


    prevQuestion() {
        let {currentUnit, currentUnitObj, currentLesson, currentLessonObj, currentQuestion} = this.props.currentValues;
        let {userProgress, book} = this.props;
        let targetQuestion = currentQuestion;

        if (currentQuestion > 0) {
            targetQuestion = (parseInt(currentQuestion, 10) - 1).toString();
        } else {
            this.setState({
                snackbarText: "You are already at the first question in the lesson - select another lesson"
            });
            this.handleShowSnackbar();
        }
        this.props.setCurrentValues("currentQuestion", targetQuestion);
        this.props.setCurrentValues("currentQuestionObj", book[currentUnit].lessons[currentLesson].questions[targetQuestion]);

        // the whole task obj in redux
        let taskObjRedux = userProgress.currentUser.user_progress;
        // the current task object in redux
        let curUnit = taskObjRedux[currentUnitObj.id];
    }


    render() {
        let {active, currentFbId} = this.props.currentValues;
        let {book} = this.props;
        let lmsCards = null;

        if (!currentFbId) {
            return <Redirect to={'/'}/>
        }
        if (this.state.readyForRender) {

            lmsCards = book.map((unit, i) => (
                <LmsCard
                    index={i}
                    id={book[i].id}
                    title={book[i].title}
                    description={book[i].description}
                    image={book[i].image}
                    onClick={this.selectCardOnClick}
                    active={active === book[i].id ? true : false}
                    key={unit.id}
                />
            ))
        }
        if (this.state.readyForRender) {
            return (
                <div className="background">
                    <Grid>
                        <Cell col={5} tablet={12} phone={12} className="unitCardsContainer">
                            {/*<div id="spacer"></div>*/}
                            <div className='lmsCards'>
                                {lmsCards}
                            </div>
                        </Cell>
                        <Cell col={7} tablet={12} phone={12} className="lessonContentContainer">
                            <div id="lessonContentComponent">
                                {this.state.readyForRender ?
                                    <LessonContent
                                        nextUnit={this.nextUnit}
                                        nextLesson={this.nextLesson}
                                        prevLesson={this.prevLesson}
                                        nextQuestion={this.nextQuestion}
                                        prevQuestion={this.prevQuestion}
                                        selectLessonOnClick={this.selectLessonOnClick}
                                    /> : 'Select a unit to begin'}
                            </div>
                        </Cell>
                    </Grid>
                    {this.renderSnackbar()}
                </div>
            )
        }
        return (<div>
                ...loading lms
            </div>
        )
    }
}


const mapStateToProps = state => ({
    book: state.lmsContent.book,
    userProgress: state.userProgress,
    currentValues: state.currentValues
});


const mapDispatchToProps = dispatch => {
    return {
        putNextQuestion: (fb_id, data) => {
            dispatch(nextQuestion(fb_id, data))
        },
        setCurrentValues: (key, value) => {
            dispatch(setCurrentValue(key, value))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
