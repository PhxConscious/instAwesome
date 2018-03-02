import React from 'react';

class TrueFalseContent extends React.Component {
  constructor(props){
    super(props)
    this.state={};
  }

  render() {
    const { title, description } = this.props;
    return(
      <div>
        <h1>title: {title}</h1>
        <p>description: {description}</p>
        <p> this will be a validated true or false answer </p>
      </div>
    )
  }
}

export default TrueFalseContent;
