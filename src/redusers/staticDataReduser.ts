import {Reducer} from 'redux'
import {StaticDataActionType, TAction} from '../actions/staticDataActions'


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

export const staticDataReduser: Reducer<TStaticDataState, TAction> = (state=initState, action) => {
  switch (action.type) {
    case StaticDataActionType.ADD_PET_TYPE:
      return {...state, petType: [...state.petType, action.pyload]}
    case StaticDataActionType.REMOVE_PET_TYPE:
      return {...state, petType: state.petType.filter(item => !action.pyload.includes(item))}
    case StaticDataActionType.ADD_BREED:
      return {
        ...state,
        breed: {
          ...state.breed,
          [action.pyload.currentPetType]: [...state.breed[action.pyload.currentPetType], action.pyload.breed],
        },
      }
    case StaticDataActionType.REMOVE_BREED:
      return {
        ...state,
        breed: {
          ...state.breed,
          [action.pyload.currentPetType]: state.breed[action.pyload.currentPetType]
            .filter(item => !action.pyload.breeds.includes(item))
        },
      }
    case StaticDataActionType.ADD_DIAGNOSES:
      return {...state, diagnoses: [...state.diagnoses, action.pyload]}
    case StaticDataActionType.REMOVE_DIAGNOSES:
      return {...state, diagnoses: state.diagnoses.filter(item => !action.pyload.includes(item))}
    default:
      return state
  }
}