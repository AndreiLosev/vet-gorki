import {TStateBoolData} from '../redusers/petCardPageReduser'
import {AppAction} from '../redusers'
// import {Api} from '../api'

export class PetCardActionType {
  static SET_BOOL_DATA = '' as const
}
  
export class PetCardsActionCreater {

  static createSetBoolData = (fild: TStateBoolData, state: boolean) =>
    ({ type: PetCardActionType.SET_BOOL_DATA, pyload: { fild, state } })
  
  // static createAddVisit = (): AppAction => (dispatch, getState) => {
    
  // }
}

export type TAction =
  | ReturnType<typeof PetCardsActionCreater.createSetBoolData>
    