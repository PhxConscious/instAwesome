export const getCompletedQuestionStatus = data => {
    let total = 0;
    let completed = 0;
    for (let unit in data) {
        for (let key in data[unit]) {
            if (key === "lessons") {
                for (let ky in data[unit][key]) {
                    for (let k in data[unit][key][ky].questions) {
                        if (data[unit][key][ky].questions[k] === true) {
                            completed++;
                        }
                        total++;
                    }
                }
            }
        }
    }
    return Math.round((completed / total) * 100)
};


export const getCompletedLessons = (units) => {
    let result = [];
    for (let unit in units) {
        for (let lesson in units[unit].lessons) {
            if (units[unit].lessons[lesson].lessonCompleted === true) {
              console.log("lesson", lesson)
                result.push(lesson)
            }
        }
    }
    return result;
};

const interpretLessonCode = (lessonCode) => {
  let unitNo = lessonCode.substring(1,3);
  let lessonNo = lessonCode.substring(4,6);
  return "Unit: " + unitNo + ", Lesson: " + lessonNo;
}

export const getCompletedLessonTitles = (units) => {
    let result = [];
    for (let unit in units) {
        for (let lesson in units[unit].lessons) {
            if (units[unit].lessons[lesson].lessonCompleted === true) {
                result.push(interpretLessonCode(lesson))
            }
        }
    }
    return result;
};
