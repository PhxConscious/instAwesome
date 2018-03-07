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
        let { lesson, nextLesson, prevLesson, unit, currentUnit, currentUnitName, currentUnitId, currentLesson, currentQuestion, currentQuestionObj, currentLessonObj, noOfLessons, nextQuestion, prevQuestion } = this.props;

        return(
          <div>
            <LessonHeader
              unit={unit}
              currentLessonObj={currentLessonObj}
            />
            <CheckTasks
              lesson={lesson}
              nextLesson={nextLesson}
              prevLesson={prevLesson}
              nextQuestion={nextQuestion}
              prevQuestion={prevQuestion}
              currentUnit={currentUnit}
              currentLesson={currentLesson}
              currentLessonObj={currentLessonObj}
              currentUnitId={currentUnitId}
              currentQuestion={currentQuestion}
              currentQuestionObj={currentQuestionObj}
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
