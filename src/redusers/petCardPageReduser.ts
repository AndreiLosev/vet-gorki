import {Reducer} from 'redux'
import {PetCardActionType, TAction} from '../actions/petCardActions'
import {TShortData, TEditorNames} from './editorReduser'
import {RawDraftContentState} from 'draft-js'

export interface IVisitsRaw {
  description: RawDraftContentState
  recommendations: RawDraftContentState
  vaccinations: RawDraftContentState
  history: RawDraftContentState
  activeEditor: TEditorNames
  alignment: "right" | "left" | "center"
  shortData: TShortData
}

const initState = {
  showDiagnosesList: false,
  showDoctorList: false,
  showGoalOfRequest: false,
  showVisitResult: false,
  IsFetching: false,
  saved: false,
  currentVisit: '',
  visits: {} as {[id: string]: IVisitsRaw}
}

export type TStateBoolData = 'showDiagnosesList' | 'saved' | 'IsFetching' |
  'showDoctorList' |'showGoalOfRequest' | 'showVisitResult'

export type TPetCardPageState = typeof initState

export const petCardPageReduser: Reducer<TPetCardPageState, TAction> = (state=initState, action) => {
  switch (action.type) {
    case PetCardActionType.SET_BOOL_DATA:
      return {...state, [action.pyload.fild]: action.pyload.state}
    case PetCardActionType.SET_CURRENT_VISIT:
      return {...state, currentVisit: action.pyload}
    case PetCardActionType.SET_VISITS:
      return {...state, visits: action.pyload}
    default:
      return state
  }
}