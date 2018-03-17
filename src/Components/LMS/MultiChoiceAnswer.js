import React from 'react';
import { Checkbox } from 'react-mdl';


class MultiChoiceAnswer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      checked: false,
      }
    this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate(prevProps, prevState){
      if(prevProps.resetLocal !== this.props.resetLocal){
        this.setState({checked:false})
        if(this.props.obj.isCorrect){
          this.setState({
            isGreen: true
          })
          setTimeout(() => {
            this.setState({
              isGreen: false
            })
          }, 1000)
        }
      }
    }

    handleClick(){
      this.setState({checked:!this.state.checked})
      this.props.addToIndices(this.props.i)
    }



    render() {
      let { isGreen } = this.state;
      let { question } = this.props;
      return (
        <div className={isGreen ? "green" : ''} id="questionContainer">
          <div className="check">
            <Checkbox
              ripple
              checked={this.state.checked}
              onChange={this.handleClick}
            />
          </div>
          <div className="question">
            {question}
          </div>
        </div>
      )
  }
}

export default MultiChoiceAnswer;
