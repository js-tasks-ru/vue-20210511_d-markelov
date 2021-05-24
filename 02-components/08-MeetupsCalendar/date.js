export function getLocalMY(date) {
    return new Date(date).toLocaleString(navigator.language, {
    month: 'long',
  }) + " " + new Date(date).getFullYear()
}

export function makeMonthDaysArr(inDate){
    const firstDay = new Date(inDate.getFullYear(), inDate.getMonth(), 1)
    let lastDay = null
    let day = new Date(inDate.getFullYear(), inDate.getMonth(), 1)
    let daysArr = []
    while (day.getMonth() === inDate.getMonth()){
      daysArr.push({date: day, inactive: false})
      lastDay = day
      day  = new Date(day.getFullYear(), day.getMonth(), day.getDate()+1)
    }

    if (firstDay.getDay() != 1){
      for (let i=1; i<firstDay.getDay() && i<7; i++){
        daysArr.push({date: new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() - i), inactive: true})
      }
    }

    if(lastDay.getDay() != 0){
      for (let i=7; i>lastDay.getDay(); i--){
        daysArr.push({date: new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate() + i - lastDay.getDay()), inactive: true})
      }
    }

    return daysArr
  }