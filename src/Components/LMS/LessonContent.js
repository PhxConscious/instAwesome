import React from 'react';


class LessonContent extends React.Component {

    render() {
      const { contentType, title, description } = this.props.lesson[0];
      console.log("lesson content", this.props)
      switch(contentType){
        case "video" :
          return (
            <div>
              <h1>title: {title}</h1>
              <p>description: {description}</p>
            </div>
          )
          break;
        case "multipleChoice":
          return (
            <div>
              <h1>title: {title}</h1>
              <p>description: {description}</p>
            </div>
          )
          break;
        case "trueFalse":
          return (
            <div>
              <h1>title: {title}</h1>
              <p>description: {description}</p>
            </div>
          )
          break;
        default:
          return null;
      }
  }
}
export default LessonContent;
