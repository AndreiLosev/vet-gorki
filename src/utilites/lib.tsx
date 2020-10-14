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
}