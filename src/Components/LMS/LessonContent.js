import React from 'react';
// import MultipleChoice from './MultipleChoice';
// import { VideoContent } from './VideoContent';
// import TrueFalseContent from './TrueFalseContent';
import CheckTasks from './CheckTasks';
import LessonHeader from './LessonHeader';

class LessonContent extends React.Component {

  render() {

    let contentType = "checkTasks";

    switch(contentType) {

      case "checkTasks":
        let { nextLesson, prevLesson, noOfLessons, nextQuestion, prevQuestion } = this.props;

        return(
          <div>
            <LessonHeader
            />
            <CheckTasks
              nextLesson={nextLesson}
              prevLesson={prevLesson}
              nextQuestion={nextQuestion}
              prevQuestion={prevQuestion}
              noOfLessons={noOfLessons}
            />
          </div>
        )

      default:
        return null;
    }
  }
}
export default LessonContent;
