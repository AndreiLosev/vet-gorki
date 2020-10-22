import {Reducer} from 'redux'
import {PetCardActionType, TAction} from '../actions/petCardActions'


const initState = {
  showDiagnosesList: false,
  showDoctorList: false,
  showGoalOfRequest: false,
  showVisitResult: false,
  saved: false,
}

export type TStateBoolData = 'showDiagnosesList' | 'saved' | 'showDoctorList'

export type TPetCardPageState = typeof initState

export const petCardPageReduser: Reducer<PetCardActionType, TAction> = (state=initState, action) => {
  switch (action.type) {
    case PetCardActionType.SET_BOOL_DATA:
      return {...state, [action.pyload.fild]: action.pyload.state}
    default:
      return state
  }
}