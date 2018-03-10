import React from 'react';
import { Checkbox } from 'react-mdl';
import '../../Styles/LmsComponentsStyles.css';

export const CheckBox = ({isCheckMarked, checkBox}) => {
  return (
    <Checkbox
      type="checkbox"
      checked={isCheckMarked}
      onChange={checkBox}
    />
  )
}

export const LessonIcon = ({lesson, currentValues, userProg, i}) => (
  <div
    className="lessonIconContainer"
  >
    <div
      className={userProg[currentValues.currentUnitObj.id].lessons[lesson.id].lessonLocked ? "red" : "blue"}
    >unlocked</div>
    {lesson.id}
  </div>
)
