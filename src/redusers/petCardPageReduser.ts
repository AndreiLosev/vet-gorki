import {Reducer} from 'redux'
import {EditorState} from 'draft-js'
import {PetCardActionType, TAction} from '../actions/petCardActions'
import {TShortData, TEditorNames} from './editorReduser'

export interface IVisitsRaw {
  description: string,
  recommendations: string,
  vaccinations: string,
  history: string,
  activeEditor: TEditorNames
  shortData: TShortData
}

const initState = {
  showDiagnosesList: false,
  showDoctorList: false,
  showGoalOfRequest: false,
  showVisitResult: false,
  IsFetching: false,
  saved: false,
  showTemplate: false,
  showPrintOptions: false,
  currentVisit: '',
  visits: {} as {[id: string]: IVisitsRaw},
  print: EditorState.createEmpty(),
}

export type TStateBoolData = 'showDiagnosesList' | 'saved' | 'IsFetching' | 'showPrintOptions'
  | 'showDoctorList' |'showGoalOfRequest' | 'showVisitResult' | 'showTemplate'

export type TPetCardPageState = typeof initState

export const petCardPageReduser: Reducer<TPetCardPageState, TAction> = (state=initState, action) => {
  switch (action.type) {
    case PetCardActionType.SET_BOOL_DATA:
      return {...state, [action.pyload.fild]: action.pyload.state}
    case PetCardActionType.SET_CURRENT_VISIT:
      return {...state, currentVisit: action.pyload}
    case PetCardActionType.SET_VISITS:
      return {...state, visits: action.pyload}
    case PetCardActionType.SET_PRINT:
      return {...state, print: action.pyload}
    default:
      return state
  }
}