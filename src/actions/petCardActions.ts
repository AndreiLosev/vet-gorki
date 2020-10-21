import {TStateBoolData} from '../redusers/petCardPageReduser'

export class PetCardActionType {
  static SET_BOOL_DATA = '' as const
}
  
export class PetCardsActionCreater {

  static createSetBoolData = (fild: TStateBoolData, state: boolean) =>
    ({ type: PetCardActionType.SET_BOOL_DATA, pyload: { fild, state } })
}

export type TAction =
  | ReturnType<typeof PetCardsActionCreater.createSetBoolData>
    