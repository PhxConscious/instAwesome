import React from 'react';
import MultipleChoice from './MultipleChoice';
import { VideoContent } from './VideoContent';
import TrueFalseContent from './TrueFalseContent';
import CheckTasks from './CheckTasks';
import LessonHeader from './LessonHeader';

class LessonContent extends React.Component {

    render() {

      // const { contentType, title, description, id, question, a1, a2, a3, a4, correct, video } = this.props.lesson;
      // const { contentType } = this.props;
        console.log("this.props", this.props)
        let contentType = "checkTasks";
        switch(contentType){
          // case "video" :
          //   return (
          //     <VideoContent
          //       video={video}
          //       title={title}
          //       description={description}
          //     />
          //   )
          //   break;


          // case "multipleChoice":
          //   return (
          //     <MultipleChoice
          //     contentType={contentType}
          //     title={title}
          //     description={description}
          //     id={id}
          //     question={question}
          //     a1={a1}
          //     a2={a2}
          //     a3={a3}
          //     a4={a4}
          //     correct={correct}
          //   />
          //   )
          //   break;




          // case "trueFalse":
          //   return (
          //     <TrueFalseContent
          //       title={title}
          //       description={description}
          //     />
          //   )
          //   break;


          case "checkTasks":
            let { lesson, nextLesson, prevLesson, unit } = this.props;
            console.log("the lesson", lesson)
            return(
              <div>
                <LessonHeader
                  unit={unit}
                />
                <CheckTasks
                  lesson={lesson}
                  nextLesson={nextLesson}
                  prevLesson={prevLesson}
                />
              </div>

            )
            break;



          default:
            return null;

          }
  }
}
export default LessonContent;
