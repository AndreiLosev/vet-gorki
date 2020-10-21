import {AppAction} from '../redusers'
import {Api} from '../api'

export class StaticDataActionType {
  static ADD_PET_TYPE = 'ADD_PET_TYPE' as const
  static REMOVE_PET_TYPE = 'REMOVE_PET_TYPE' as const
  static ADD_BREED = 'ADD_BREED' as const
  static REMOVE_BREED = 'REMOVE_BREED' as const
  static ADD_DIAGNOSES = 'ADD_DIAGNOSES' as const
  static REMOVE_DIAGNOSES = 'REMOVE_DIAGNOSES' as const
}

export class StaticDataActionCreater {
  static createAddPetType = (petType: string[]) =>
    ({ type: StaticDataActionType.ADD_PET_TYPE, pyload: petType })

  static createRemovePetType = (petsType: string[]) =>
    ({ type: StaticDataActionType.REMOVE_PET_TYPE, pyload: petsType })

  static createAddBreed = (breed: string[], currentPetType: string) =>
    ({ type: StaticDataActionType.ADD_BREED, pyload: { breed, currentPetType} })

  static createRemoveBreed = (breeds: string[], currentPetType: string) =>
    ({ type: StaticDataActionType.REMOVE_BREED, pyload: {breeds, currentPetType} })

  static createAddDiagnoses = (diagnose: string[]) =>
    ({ type: StaticDataActionType.ADD_DIAGNOSES, pyload: diagnose })

  static createRemoveDiagnoses = (diagnoses: string[]) =>
    ({ type: StaticDataActionType.REMOVE_DIAGNOSES, pyload: diagnoses })

  static createGetStatickData = (): AppAction => async dispatch => {
    const result = await Api.updateDoc('staticData', 'staticData', {doctor: ['доктор №1', 'доктор №2', 'Кристина']})
    console.log(result)
    // const result = await Api.getAll('staticData') as TStaticDataState
    // console.log(result)
    // dispatch(StaticDataActionCreater.createAddPetType(result.petType))
    // dispatch(StaticDataActionCreater.createAddDiagnoses(result.diagnoses))
    // Object.keys(result.breed).forEach(item => {
    //   dispatch(StaticDataActionCreater.createAddBreed(result.breed[item], item))
    // })
  }
}

export type TAction =
  | ReturnType<typeof StaticDataActionCreater.createAddPetType>
  | ReturnType<typeof StaticDataActionCreater.createRemovePetType>
  | ReturnType<typeof StaticDataActionCreater.createAddBreed>
  | ReturnType<typeof StaticDataActionCreater.createRemoveBreed>
  | ReturnType<typeof StaticDataActionCreater.createAddDiagnoses>
  | ReturnType<typeof StaticDataActionCreater.createRemoveDiagnoses>