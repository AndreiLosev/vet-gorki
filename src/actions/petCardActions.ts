export class PetCardActionType {
  static SHOW_DIAGNOSES_LIST = 'SHOW_DIAGNOSES_LIST' as const
}
  
export class PetCardsActionCreater {
  static createShowDiagnosesList = (show: boolean) => {
    return {type: PetCardActionType.SHOW_DIAGNOSES_LIST, pyload: show}
  }
}

export type TAction =
  | ReturnType<typeof PetCardsActionCreater.createShowDiagnosesList>
    