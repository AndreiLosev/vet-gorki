export class Lib {
  static converDate = (rafDate: number): string => {
    const addNull = (value: number): string => {
      return (value < 10) ? `0${value}` : `${value}`
    }
    const date = new Date(rafDate);
    const day = addNull(date.getDate())
    const month = addNull(date.getMonth() + 1)
    const year = addNull(date.getFullYear())
    const hours = addNull(date.getHours())
    const minuts = addNull(date.getMinutes())
    return `${hours}:${minuts} ${day}.${month}.${year}`
  }

  static extractingMeaning = (str: string) => {
    const result = /\d*[.,]?[0-9]*/g.exec(str)
    return result ? result[0] : ''
  }

  static showNicely = (show: boolean, insideFn: any, outsidFn: any): void => {
    if (show) {
      insideFn(true)
      setTimeout(() => outsidFn(true), 100)
    } else {
      outsidFn(false)
      setTimeout(() => insideFn(false), 700)
    }
  }

  static phoneToDisplay = (phone: string) => {
    const x1 = phone.slice(0, 3)
    const x2 = phone.slice(3, 5)
    const x3 = phone.slice(5, 8)
    const x4 = phone.slice(8, 10)
    const x5 = phone.slice(10, 12)
    return `+${x1}(${x2}) ${x3} ${x4} ${x5}`
  }

  static convertAgeToDateOfBirth = (year: string, month: string) => {
    const now = new Date()
    const yearNow = now.getFullYear()
    const monthNow = now.getMonth()
    const dayNow = now.getDate()
    const yearInt = +year
    const monthInt = Math.floor(+month)
    const dayInt = Math.round((+month - monthInt) * 30)
    return new Date(yearNow - yearInt, monthNow - monthInt, dayNow - dayInt)
  }

  static convertDateOfBirthToAge = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const now = new Date()
    const yearNow = now.getFullYear()
    const monthNow = now.getMonth()
    const dayNow = now.getDate()
    const ageYear = yearNow - year
    const ageMonth = monthNow - month
    const ageDay = dayNow - day
    const ageMonthDay = Math.round((ageMonth + ageDay / 30) * 100) / 100
    if (ageMonthDay < 0) return {year: (ageYear - 1).toString(), month: (12 + ageMonthDay).toString()}
    else return {year: ageYear.toString(), month: ageMonthDay.toString()}
  }
}