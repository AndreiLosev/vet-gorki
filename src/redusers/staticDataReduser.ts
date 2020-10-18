import {Reducer, AnyAction} from 'redux'


const initState = {
  goalOfRequest: ['консультация', 'вакцинация', 'операция', 'усыпление'],
  visitResult: ['стало лучьше', 'стало хуже', 'сдох', 'cдох как и планировалось'],
  doctor: ['доктор №1', 'доктор №2', 'Кристина'],
  diagnoses: [
    'ящер', 'лешай', 'бешенство', 'пироплазмоз', 'Лихорадка Эбола', 'Хитридиомикоз', 'Энцефалит Западного Нила',
    'Синдром белого носа', 'Сибирская язва', 'Лицевая опухоль', 'Собачья чума', 'Хламидиоз'
  ],
  breed: {
    кот: ['сиамский', 'сфинкс', 'белый'],
    собака: ['алабай', 'тойтерьер'],
  } as { [index: string]: string[] },
  petType: ['кот', 'собака', 'страус'] as string[],
}

export type TStaticDataState = typeof initState

export const staticDataReduser: Reducer<TStaticDataState, AnyAction> = (state=initState, action) => {
  switch (action.type) {
    default:
      return state
  }
}