import React from "react";
import {connect} from 'react-redux';
import {nextQuestion} from '../../redux/actions/userProgress';
import '../../Styles/ContentBodyStyles.css';
import {CheckBox, LessonIcon} from './Checkbox';
import {Button, Textfield} from 'react-mdl';
import {updateCompanyInfo} from '../../redux/actions/companyInfo';
import MultiChoiceShell from './MultiChoiceShell';
import ReactModal from 'react-modal';
import CopyTextField from './CopyTextInput';
import TextInput from './TextInput'

class ContentBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCheckMarked: false,
            test: false,
            textArea: '',
            copyTextArea: '',
            alreadyUpdated: false,
        };
        this.isNextQ = this.isNextQ.bind(this);
        this.isChecked = this.isChecked.bind(this);
        this.checkBox = this.checkBox.bind(this);
        this.multiChoiceAttempted = this.multiChoiceAttempted.bind(this);
    }


    componentDidMount() {
        if (this.props.currentValues.currentQuestionObj) {
            this.isChecked();
            this.isNextQ();
        }
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentValues !== this.props.currentValues) {
            this.isChecked();
            this.isNextQ();
        }
    }


    isChecked() {
        let userProg = this.props.userProgress.currentUser.user_progress;
        let {currentUnitObj, currentLessonObj, currentQuestionObj} = this.props.currentValues;

        if (userProg[currentUnitObj.id].lessons[currentLessonObj.id].questions[currentQuestionObj.id]) {
            this.setState({
                ...this.state,
                isCheckMarked: true
            })
        } else {
            this.setState({
                ...this.state,
                isCheckMarked: false
            })
        }
    }


    isNextQ() {
        let {book} = this.props;
        let {currentUnit, currentLesson, currentQuestion} = this.props.currentValues;
        let lengthOfQuestArr = book[currentUnit].lessons[currentLesson].questions.length;

        if (lengthOfQuestArr !== parseInt(currentQuestion, 10) + 1) {
            this.setState({
                // ...this.state,
                openLessonDialog: false,
                openUnitDialog: false,
            })
        }
    }


    checkBox() {
        this.setState({isCheckMarked: !this.state.isCheckMarked})
    }


    multiChoiceAttempted() {
        this.setState({multiChoiceAttempted: true})
    }


    render() {
        let {isCheckMarked, nextButtonHidden, prevButtonHidden} = this.state;
        let {lesson, nextLesson, prevLesson, nextQuestion, prevQuestion, nextUnit, userProgress, book, currentValues, selectLessonOnClick, companyInfo} = this.props;
        let {currentUnit, currentUnitObj, currentLesson, currentLessonObj, currentQuestion, currentQuestionObj} = this.props.currentValues;
        let userProg = userProgress.currentUser.user_progress;
        let lessonIcons = null;

        if (currentLessonObj) {
            lessonIcons = currentUnitObj.lessons.map((lesson, i) => (
                <LessonIcon
                    key={i}
                    i={i}
                    lesson={lesson}
                    userProg={userProg}
                    currentValues={currentValues}
                    selectLessonOnClick={selectLessonOnClick}
                />
            ))
        }


        // get current text values for companyObj
        if (currentQuestionObj.contentType === "textArea" && this.state.alreadyUpdated === false) {
            let initialValue = null;

            if (companyInfo.companyList && companyInfo.companyList[0] && companyInfo.companyList[0][currentQuestionObj.columnName]) {
                initialValue = companyInfo.companyList[0][currentQuestionObj.columnName];
            }
            if (initialValue === null) {
                initialValue = "add your text here"
            }
            this.setState({
                textArea: initialValue,
                alreadyUpdated: true
            })
        }


        let submitTextArea = () => {
            // post current text from state to company db
            let key = currentQuestionObj.columnName;
            let value = this.state.textArea;
            let companyObj = {
                [key]: value
            };
            this.props.putCompanyInfo(companyInfo.companyList[0].company_id, companyObj);
            nextQuestClickHandler();
            this.setState({textArea: '', alreadyUpdated: false})
        };


        //***************** Need to handle customer not having a company already on file. *********************
        let submitCopyTextArea = () => {
            // post current text from state to company db
            let key = currentQuestionObj.columnName;
            let value = this.state.copyTextArea;
            let companyObj = {
                [key]: value
            };
            this.props.putCompanyInfo(companyInfo.companyList[0].company_id, companyObj);
            nextQuestClickHandler();
            this.setState({copyTextArea: '', alreadyUpdated: false})
        };


        let nextQuestClickHandler = () => {
            let lengthOfQuestArr = book[currentUnit].lessons[currentLesson].questions.length;
            let lengthOfLessonArr = book[currentUnit].lessons.length;
            let lengthOfBookArr = book.length;

            this.setState({
                multiChoiceAttempted: false
            });
            if (lengthOfQuestArr === parseInt(currentQuestion, 10) + 1 && lengthOfLessonArr === parseInt(currentLesson, 10) + 1 && lengthOfBookArr === parseInt(currentUnit, 10) + 1) {
                alert("Congratulations! You're an instagram expert!")
            } else if (lengthOfQuestArr === parseInt(currentQuestion, 10) + 1 && lengthOfLessonArr === parseInt(currentLesson, 10) + 1) {
                console.log("END OF THE UNIT");
                this.setState({
                    ...this.state,
                    openUnitDialog: true,
                    unitDialogTitle: "Congrats! You finished the unit",
                    unitDialogText: "onto the next unit?",
                    unitDialogButton1: "CONTINUE",
                    unitDialogButton2: "STAY HERE"
                });
                nextQuestion();
            } else if (lengthOfQuestArr === parseInt(currentQuestion, 10) + 1) {
                console.log("END OF THE LESSON");
                this.setState({
                    ...this.state,
                    openLessonDialog: true,
                    lessonDialogTitle: "You finished the Lesson",
                    lessonDialogText: "onto the next lesson?",
                    lessonDialogButton1: "CONTINUE",
                    lessonDialogButton2: "STAY HERE"
                });
                nextQuestion();
            } else {
                nextQuestion();
            }
        };


        let nextLessonModalHandler = () => {
            nextLesson();
            this.setState({
                openLessonDialog: false
            })
        };


        let prevQuestClickHandler = () => {
            console.log("prevQuestClickHandler", currentQuestion);
            if ("0" === currentQuestion) {
                this.setState({
                    ...this.state,
                    openLessonDialog: true,
                    lessonDialogTitle: `You're still on lesson ${parseInt(currentLesson, 10) + 1}`,
                    lessonDialogText: "go back to previous lesson?",
                    lessonDialogButton1: "go back",
                    lessonDialogButton2: "stay here"
                })
            } else {
                prevQuestion();
            }
        };


        if (currentLessonObj) {
            return (
                <div>
                    <div id="lessonTitleContainer">
                        <h5>{currentQuestionObj.title}</h5>
                    </div>
                    <div id="inputComponent">
                        {
                            // contentType: blank    goes here
                        }
                        {
                            currentQuestionObj.contentType === "checkTasks" ? <CheckBox
                                className='answerCheck'
                                checkBox={this.checkBox}
                                isCheckMarked={this.state.isCheckMarked}
                            /> : ""
                        }
                        {
                            currentQuestionObj.contentType === "textArea" ? <TextInput
                                onChange={e => this.setState({textArea: e.target.value})}
                                value={this.state.textArea}
                                label="Text lines..."
                                rows={3}
                                style={{width: '100%'}}
                            /> : ""
                        }
                        {
                            currentQuestionObj.contentType === "copyTextArea" ? <CopyTextField
                                onChange={e => this.setState({copyTextArea: e.target.value})}
                                value={this.state.copyTextArea}
                                rows={3}
                                label="Text lines..."
                            /> : ""
                        }
                        {
                            currentQuestionObj.contentType === "multiChoice" ? <MultiChoiceShell
                                currentQuestionObj={currentQuestionObj}
                                multiChoiceAttempted={this.multiChoiceAttempted}
                            /> : ""
                        }
                    </div>


                    <ReactModal
                        isOpen={this.state.openLessonDialog}
                        className="Modal"
                        overlayClassName="Overlay"
                    >
                        <div className="modalAllContent">
                            <h3 className="modalTitle">{this.state.lessonDialogTitle}</h3>
                            <h6 className="modalDescription">{this.state.lessonDialogText}</h6>
                            <div className="modalButtonContainer">
                                <Button
                                    className='modalButton'
                                    raised colored ripple
                                    type='button'
                                    onClick={e => this.setState({openLessonDialog: false})}
                                >
                                    {this.state.lessonDialogButton2}
                                </Button>
                                <Button
                                    className='modalButton'
                                    raised colored ripple
                                    type='button'
                                    onClick={nextLessonModalHandler}
                                >
                                    {this.state.lessonDialogButton1}
                                </Button>
                            </div>
                        </div>
                    </ReactModal>


                    <ReactModal
                        isOpen={this.state.openUnitDialog}
                        contentLabel="content Label"
                        className="Modal"
                        overlayClassName="Overlay"
                    >
                        <div className="modalAllContent">
                            <h3 className="modalTitle">{this.state.unitDialogTitle}</h3>
                            <h6 className="modalDescription">{this.state.unitDialogText}</h6>
                            <div className="modalButtonContainer">
                                <Button
                                    className='modalButton'
                                    raised ripple
                                    type='button'
                                    onClick={nextUnit}
                                >
                                    {this.state.unitDialogButton1}
                                </Button>
                                <Button
                                    className='modalButton'
                                    raised ripple
                                    type='button'
                                    onClick={e => this.setState({openUnitDialog: false})}
                                >
                                    {this.state.unitDialogButton2}
                                </Button>
                            </div>
                        </div>
                    </ReactModal>


                    {/*<div>Unit: {parseInt(currentUnit, 10) + 1} of {book.length}</div>*/}
                    {/*<div>Lesson: {parseInt(currentLesson, 10) + 1} of {book[currentUnit].lessons.length}</div>*/}
                    {/*<div>Question: {parseInt(currentQuestion, 10) + 1} of {currentLessonObj.questions.length}</div>*/}
                    {currentQuestion === "0" ? "Please begin the lesson" : ''}


                    <div id="nextPrevButtonContainer">
                        <Button
                            raised accent ripple
                            className={prevButtonHidden ? 'hidden' : ""}
                            onClick={prevQuestClickHandler}
                            value="nextQuestion">
                              <span className='lmsBtnText'>
                                BACK
                              </span>
                        </Button>
                        <div id="lessonIconsContainer">{lessonIcons ? lessonIcons : 'nolessonicons'}</div>
                        {
                            currentQuestionObj.contentType === "checkTasks" ? <Button
                                raised accent ripple
                                className={nextButtonHidden ? 'hidden' : ""}
                                onClick={nextQuestClickHandler}
                                value="nextQuestion"
                                disabled={!isCheckMarked}
                            >
                                <span className='lmsBtnText'>{currentQuestionObj.buttonText}</span></Button> : null
                        }
                        {
                            currentQuestionObj.contentType === "textArea" ? <Button
                                raised accent ripple
                                className={nextButtonHidden ? 'hidden' : ""}
                                onClick={submitTextArea}
                                value="nextQuestion"
                                disabled={this.state.textArea.length === 0}
                            >
                                <span className='lmsBtnText'>{currentQuestionObj.buttonText}</span></Button> : null
                        }
                        {
                            currentQuestionObj.contentType === "copyTextArea" ? <Button
                                raised accent ripple
                                className={nextButtonHidden ? 'hidden' : ""}
                                onClick={submitCopyTextArea}
                                value="nextQuestion"
                                disabled={false}
                            >
                                <span className='lmsBtnText'>{currentQuestionObj.buttonText}</span></Button> : null
                        }
                        {
                            currentQuestionObj.contentType === "multiChoice" ? <Button
                                raised accent ripple
                                onClick={nextQuestClickHandler}
                                value="nextQuestion"
                                disabled={!this.state.multiChoiceAttempted}
                            >
                                <span className="lmsBtnText">{currentQuestionObj.buttonText}</span></Button> : null
                        }
                        {
                            // contentType: blank    button goes here
                        }
                    </div>
                </div>
            )
        }
        return <div>loading...</div>
    }
}


const mapStateToProps = state => ({
    book: state.lmsContent.book,
    userProgress: state.userProgress,
    currentValues: state.currentValues,
    companyInfo: state.companyInfo,
});


const mapDispatchToProps = dispatch => {
    return {
        putNextQuestion: (fb_id, data) => {
            dispatch(nextQuestion(fb_id, data))
        },
        putCompanyInfo: (companyId, companyObj) => {
            dispatch(updateCompanyInfo(companyId, companyObj))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentBody);

// <Dialog open={this.state.openLessonDialog}>
//   <DialogTitle>{this.state.lessonDialogTitle}</DialogTitle>
//   <DialogContent>
//     <p>{this.state.lessonDialogText}</p>
//   </DialogContent>
//   <DialogActions>
//     <Button
//       type='button'
//       onClick={nextLesson}
//     >{this.state.lessonDialogButton1}
//     </Button>
//     <Button
//       type='button'
//       onClick={e=>this.setState({openLessonDialog:false})}
//     >{this.state.lessonDialogButton2}
//   </Button>
//   </DialogActions>
// </Dialog>
