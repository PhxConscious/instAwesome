import React from 'react';
import MultiChoiceAnswer from './MultiChoiceAnswer'
import { Button } from 'react-mdl';
import ReactModal from 'react-modal'
import "../../Styles/MultiChoiceStyles.css"

class MultiChoiceShell extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      indicesOfChecked: [],
      openDialog: false,
      isCorrect: false,
      resetLocal: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addToIndices = this.addToIndices.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }


  handleSubmit(correctIndexArray){
    // correct answer array sorted just in case
    let correctArray = correctIndexArray.sort((a, b) => a - b);

    // selected answer array sorted
    let checkedArray = this.state.indicesOfChecked.sort((a,b) => a - b)

    // compare the two arrays to flag the correct modal
    if(correctArray.join("") === checkedArray.join("")){
      this.setState({isCorrect: true})

    } else {
      this.setState({isCorrect: false})
    }
    this.setState({openDialog: true, indicesOfChecked: []});

  }

  // make an array of selected answers in state
  addToIndices(i){
    let arr = this.state.indicesOfChecked;
    let result;
    // console.log("first arr", arr)
    if(arr.indexOf(i) === -1){
      arr.push(i)
      this.setState({indicesOfChecked: arr})
      // console.log("push arr", arr)
    } else {
      result = arr.filter(elem => {
        return elem !== i;
      })
      // console.log("filter arr", result)
      this.setState({indicesOfChecked: result})
    }
  }

  handleClick(){
    this.setState({openDialog: false, resetLocal: !this.state.resetLocal})
    this.props.multiChoiceAttempted();
  }

  render(){
    let { isCorrect, resetLocal } = this.state;
    let { currentQuestionObj } = this.props;
    let questObj = currentQuestionObj;
    // console.log("questObj", questObj)

    let theQuestions = questObj.questions.map((question, i) => {
      return (
        <MultiChoiceAnswer
          obj={question}
          question={question.text}
          i={i}
          key={i}
          addToIndices={this.addToIndices}
          resetLocal={resetLocal}
        />
      )
    })

    return (
      <div id="container">
        <h6>{questObj.title}</h6>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.handleSubmit(questObj.indexOfCorrect)
          }}
        >
          {theQuestions}
          <Button
            raised colored ripple
            type="submit"
          >Attempt</Button>
        </form>

        <ReactModal
          isOpen={this.state.openDialog}
          contentLabel="content Label"
          className="Modal"
          overlayClassName="Overlay"
        >
          <div className="modalAllContent">
            <h3 className="modalTitle">{isCorrect ? "CORRECT!" : "try again"}</h3>
            <h6 className="modalDescription">
              {isCorrect ? questObj.correctResponse : ''}
              {!isCorrect ? questObj.incorrectResponse : ''}
            </h6>
            <div className="modalButtonContainer">
              <Button
                raised accent ripple
                type='button'
                onClick={this.handleClick}>OK
              </Button>
            </div>
          </div>
        </ReactModal>

      </div>
    )
  }
}

export default MultiChoiceShell;
