import React from 'react';
import MultiChoiceAnswer from './MultiChoiceAnswer'
import { Dialog, DialogContent, DialogActions, DialogTitle, Button } from 'react-mdl';
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
    this.setState({openDialog: true});

  }

  // make an array of selected answers in state
  addToIndices(i){
    let arr = this.state.indicesOfChecked;
    let result;
    if(arr.indexOf(i) === -1){
      arr.push(i)
      this.setState({indicesOfChecked: arr})
    } else {
      result = arr.filter(elem => {
        return elem !== i;
      })
      this.setState({indicesOfChecked: result})
    }
  }


  render(){
    let { isCorrect, resetLocal } = this.state;
    let { currentQuestionObj } = this.props;
    let questObj = currentQuestionObj;
    console.log("questObj", questObj)

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
          <button
            type="submit"
          >Submit</button>
        </form>

        <Dialog open={this.state.openDialog}>
          <DialogTitle>{isCorrect ? "CORRECT!" : "noooo"}</DialogTitle>
          <DialogContent>
            {isCorrect ? questObj.correctResponse : ''}
            {!isCorrect ? questObj.incorrectResponse : ''}
          </DialogContent>
          <DialogActions>
            <Button type='button' onClick={e => this.setState({openDialog: false, resetLocal: !this.state.resetLocal})}>OK</Button>
          </DialogActions>
        </Dialog>

      </div>
    )
  }
}

export default MultiChoiceShell;
