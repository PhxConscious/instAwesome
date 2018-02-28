import React from 'react';

class MultipleChoice extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected: null,
      incorrectAttempt: false,
      correctAttempt: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

    // handles the radio button selection
    handleChange(e) {
      this.setState({
        ...this.state,
        selected: e.target.value,
      })
    }

    // when correct answer is submitted
    handleCorrect() {
      this.setState({
        ...this.state,
        incorrectAttempt: false,
        correctAttempt: true,
      });
      setTimeout(()=>{
        this.setState({
          correctAttempt: false
        })
      }, 2500)
    }

    // when incorrect answer is submitted
    handleIncorrect() {
      this.setState({
        ...this.state,
        incorrectAttempt: true,
        correctAttempt: false
      })
      setTimeout(()=>{
        this.setState({
          ...this.state,
          incorrectAttempt: false
        })
      }, 1500)
    }

    handleCorrectMultiChoice(){
      // call server here
      console.log('correct')
    }



  render() {
    let { selected, correctAttempt, incorrectAttempt } = this.state;

    const { contentType, title, description,  id, question, a1, a2, a3, a4, correct, video } = this.props;

    return (
      <div>
        <h6>title: {title}</h6>
        <p>description: {description}</p>
        <div id={id} className="question-block">
          <h3>{question}</h3>
          <form
            onSubmit={e=>{
              e.preventDefault()
              this.handleCorrect()
              selected == correct ? this.handleCorrectMultiChoice() : this.handleIncorrect()
            }}
          >
            <div className={correctAttempt && correct === a1 ? "highlight" : ''}>
              <label>
                <input
                  type="radio"
                  value={a1}
                  onChange={this.handleChange}
                  checked={this.state.selected === a1}
                />
                  {a1}
              </label>
            </div>
            <div className={correctAttempt && correct === a2 ? "highlight" : ''}>
              <label>
                <input
                  type="radio"
                  value={a2}
                  onChange={this.handleChange}
                  checked={this.state.selected === a2}
                />
                {a2}
              </label>
            </div>
            <div className={correctAttempt && correct === a3 ? "highlight" : ''}>
              <label>
                <input
                  type="radio"
                  value={a3}
                  onChange={this.handleChange}
                  checked={this.state.selected === a3}
                />
                {a3}
              </label>
            </div>
            <div className={correctAttempt && correct === a4 ? "highlight" : ''}>
              <label>
                <input
                  type="radio"
                  value={a4}
                  onChange={this.handleChange}
                  checked={this.state.selected === a4}
                />
                {a4}
              </label>
            </div>
            <input type="submit" name="submit"/>
          </form>
          {!incorrectAttempt ? "" : <div>
                    <h1>Nope, {selected} is incorrect. Try again</h1>
                  </div>}
          {!correctAttempt ? "" : <div>
            <h1>Nice Work - that is correct</h1>
          </div>}
        </div>
      </div>
    )
  }
}

export default MultipleChoice;
