import React from 'react';
import {Checkbox} from 'react-mdl';
import '../../Styles/LmsComponentsStyles.css';

export const CheckBox = ({isCheckMarked, checkBox}) => {
    return (
        <Checkbox
            ripple
            type="checkbox"
            checked={isCheckMarked}
            onChange={checkBox}
        />
    )
};

export const LessonIcon = ({lesson, currentValues, userProg, i, selectLessonOnClick}) => {
    const iconClickHandler = (e) => {
        if (!userProg[currentValues.currentUnitObj.id].lessons[lesson.id].lessonLocked) {
            console.log("Was clicked", e);
            selectLessonOnClick(i)
        }
    };

    return (
        <div
            className="lessonIconContainer"
            onClick={e => iconClickHandler(e)}
        >
            <div
                id={currentValues.currentLessonObj.id === lesson.id ? "gold" : ''}
                className={userProg[currentValues.currentUnitObj.id].lessons[lesson.id].lessonLocked ? "red" : "green"}
            />
        </div>
    )
};
