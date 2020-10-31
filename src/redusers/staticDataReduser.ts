import {Reducer} from 'redux'
import {StaticDataActionType, TAction} from '../actions/staticDataActions'


const initState = {
  goalOfRequest: [] as string[],
  visitResult: [] as string[],
  doctor: [] as string[],
  diagnoses: [] as string[],
  breed: {} as { [index: string]: string[] },
  petType: [] as string[],
  templateNames: [] as string[],
}

export type TStaticDataState = typeof initState

export const staticDataReduser: Reducer<TStaticDataState, TAction> = (state=initState, action) => {
  switch (action.type) {
    case StaticDataActionType.ADD_PET_TYPE:
      return {...state, petType: action.pyload}
    case StaticDataActionType.ADD_BREED:
      return {
        ...state,
        breed: {...state.breed, [action.pyload.currentPetType]: action.pyload.breeds},
      }
    case StaticDataActionType.ADD_DIAGNOSES:
      return {...state, diagnoses: action.pyload}
    case StaticDataActionType.ADD_DOCTOR:
      return {...state, doctor: action.pyload}
    case StaticDataActionType.ADD_GOAL_OF_REQUEST:
      return {...state, goalOfRequest: action.pyload}
    case StaticDataActionType.ADD_VISIT_RESULT:
      return {...state, visitResult: action.pyload}
    case StaticDataActionType.ADD_TEMPLATE_NAMES:
      return {...state, templateNames: action.pyload}
    default:
      return state
  }
}