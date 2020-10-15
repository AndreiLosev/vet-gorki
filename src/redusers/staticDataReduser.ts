import {Reducer, AnyAction} from 'redux'

const initState = {
  goalOfRequest: ['консультация', 'вакцинация', 'операция', 'усыпление'],
  visitResult: ['стало лучьше', 'стало хуже', 'сдох', 'cдох как и планировалось'],
  doctor: ['доктор №1', 'доктор №2', 'Кристина'],
  diagnoses: [
    'ящерк', 'лешай', 'бешенство', 'пироплазмоз', 'Лихорадка Эбола', 'Хитридиомикоз', 'Энцефалит Западного Нила',
    'Синдром белого носа', 'Сибирская язва', 'Лицевая опухоль', 'Собачья чума', 'Хламидиоз'
  ],
}

export type TStaticDataState = typeof initState

export const staticDataReduser: Reducer<TStaticDataState, AnyAction> = (state=initState, action) => {
  switch (action.type) {
    default:
      return state
  }
}