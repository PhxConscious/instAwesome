import React from 'react';
// import MultipleChoice from './MultipleChoice';
// import { VideoContent } from './VideoContent';
// import TrueFalseContent from './TrueFalseContent';
import ContentBody from './ContentBody';
import LessonHeader from './LessonHeader';

class LessonContent extends React.Component {

  render() {

    let contentType = "checkTasks";

    switch(contentType) {

      case "checkTasks":
        let { nextUnit, nextLesson, prevLesson, nextQuestion, prevQuestion, selectLessonOnClick } = this.props;

        return(
          <div>
            <LessonHeader
            />
          <ContentBody
              nextUnit={nextUnit}
              nextLesson={nextLesson}
              prevLesson={prevLesson}
              nextQuestion={nextQuestion}
              prevQuestion={prevQuestion}
              selectLessonOnClick={selectLessonOnClick}
            />
          </div>
        )

      default:
        return null;
    }
  }
}
export default LessonContent;
