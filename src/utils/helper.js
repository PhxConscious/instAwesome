export const getCompletedQuestionStatus = data => {
  let total = 0;
  let completed = 0;
  for(let unit in data){
    for(let key in data[unit]){
      if(key === "lessons"){
        for(let ky in data[unit][key]){
          for(let k in data[unit][key][ky].questions){
            if(data[unit][key][ky].questions[k]===true){
              completed ++;
            }
            total ++;
          }
        }
      }
    }
  }
  return Math.round((completed / total)*100)
}


export const getCompletedLessons = (units) => {
  let result = [];
  for(let unit in units){
    for(let lesson in units[unit].lessons){
      if(units[unit].lessons[lesson].lessonCompleted === true){
        result.push(lesson)
      }
    }
  }
  return result;
}
