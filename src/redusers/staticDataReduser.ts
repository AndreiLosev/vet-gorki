import {Reducer} from 'redux'
import {StaticDataActionType, TAction} from '../actions/staticDataActions'


const initState = {
  goalOfRequest: ['консультация', 'вакцинация', 'операция', 'усыпление'],
  visitResult: ['стало лучьше', 'стало хуже', 'сдох', 'cдох как и планировалось'],
  doctor: [] as string[],
  diagnoses: [] as string[],
  breed: {} as { [index: string]: string[] },
  petType: [] as string[],
}

export type TStaticDataState = typeof initState

export const staticDataReduser: Reducer<TStaticDataState, TAction> = (state=initState, action) => {
  switch (action.type) {
    case StaticDataActionType.ADD_PET_TYPE:
      return {...state, petType: state.petType.concat(action.pyload)}
    case StaticDataActionType.REMOVE_PET_TYPE:
      return {...state, petType: state.petType.filter(item => !action.pyload.includes(item))}
    case StaticDataActionType.ADD_BREED:
      const currentBreed = state.breed[action.pyload.currentPetType]
        ? [...state.breed[action.pyload.currentPetType]]
        : []
      return {
        ...state,
        breed: {
          ...state.breed,
          [action.pyload.currentPetType]: currentBreed.concat(action.pyload.breeds),
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
      return {...state, diagnoses: state.diagnoses.concat(action.pyload)}
    case StaticDataActionType.REMOVE_DIAGNOSES:
      return {...state, diagnoses: state.diagnoses.filter(item => !action.pyload.includes(item))}
    case StaticDataActionType.ADD_DOCTOR:
      return {...state, doctor: state.doctor.concat(action.pyload)}
    case StaticDataActionType.REMOVE_DOCTOR:
      return {...state, doctor: state.doctor.filter(item => !action.pyload.includes(item))}
    default:
      return state
  }
}