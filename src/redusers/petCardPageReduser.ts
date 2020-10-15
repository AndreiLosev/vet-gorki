import {Reducer} from 'redux'
import {PetCardActionType, TAction} from '../actions/petCardActions'


const initState = {
  showDiagnosesList: false as boolean,
}

export type TPetCardPageState = typeof initState

export const petCardPageReduser: Reducer<PetCardActionType, TAction> = (state=initState, action) => {
  switch (action.type) {
    case PetCardActionType.SHOW_DIAGNOSES_LIST:
      return {...state, showDiagnosesList: action.pyload}
    default:
      return state
  }
}