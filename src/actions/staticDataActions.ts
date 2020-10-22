import {AppAction} from '../redusers'
import {Api} from '../api'
import {TStaticDataState} from '../redusers/staticDataReduser'

export class StaticDataActionType {
  static ADD_PET_TYPE = 'ADD_PET_TYPE' as const
  static REMOVE_PET_TYPE = 'REMOVE_PET_TYPE' as const
  static ADD_BREED = 'ADD_BREED' as const
  static REMOVE_BREED = 'REMOVE_BREED' as const
  static ADD_DIAGNOSES = 'ADD_DIAGNOSES' as const
  static REMOVE_DIAGNOSES = 'REMOVE_DIAGNOSES' as const
  static ADD_DOCTOR = 'ADD_DOCTOR' as const
  static REMOVE_DOCTOR = 'REMOVE_DOCTOR' as const
}

export class StaticDataActionCreater {
  static createAddPetType = (petsType: string[]) =>
    ({ type: StaticDataActionType.ADD_PET_TYPE, pyload: petsType })

  static createRemovePetType = (petsType: string[]) =>
    ({ type: StaticDataActionType.REMOVE_PET_TYPE, pyload: petsType })

  static createAddBreed = (breeds: string[], currentPetType: string) =>
    ({ type: StaticDataActionType.ADD_BREED, pyload: { breeds, currentPetType} })

  static createRemoveBreed = (breeds: string[], currentPetType: string) =>
    ({ type: StaticDataActionType.REMOVE_BREED, pyload: {breeds, currentPetType} })

  static createAddDiagnoses = (diagnoses: string[]) =>
    ({ type: StaticDataActionType.ADD_DIAGNOSES, pyload: diagnoses })

  static createRemoveDiagnoses = (diagnoses: string[]) =>
    ({ type: StaticDataActionType.REMOVE_DIAGNOSES, pyload: diagnoses })
  
  static createAddDoctor = (doctors: string[]) =>
    ({ type: StaticDataActionType.ADD_DOCTOR, pyload: doctors })
  
  static createRemoveDoctor = (doctors: string[]) =>
    ({ type: StaticDataActionType.REMOVE_DOCTOR, pyload: doctors })

  static createGetStatickData = (): AppAction => async dispatch => {
    const result = await Api.getAll<TStaticDataState>('staticData')
    const staticData = Object.values(result)[0] as TStaticDataState
    if (staticData) {
      dispatch(StaticDataActionCreater.createAddPetType(staticData.petType ? staticData.petType : []))
      dispatch(StaticDataActionCreater.createAddDiagnoses(staticData.diagnoses ? staticData.diagnoses : []))
      if (staticData.breed)
        Object.keys(staticData.breed).forEach(item => {
        dispatch(StaticDataActionCreater.createAddBreed(staticData.breed[item] ? staticData.breed[item] : [], item))
        })
      dispatch(StaticDataActionCreater.createAddDoctor(staticData.doctor ? staticData.doctor : []))
    }
  }
}

export type TAction =
  | ReturnType<typeof StaticDataActionCreater.createAddPetType>
  | ReturnType<typeof StaticDataActionCreater.createRemovePetType>
  | ReturnType<typeof StaticDataActionCreater.createAddBreed>
  | ReturnType<typeof StaticDataActionCreater.createRemoveBreed>
  | ReturnType<typeof StaticDataActionCreater.createAddDiagnoses>
  | ReturnType<typeof StaticDataActionCreater.createRemoveDiagnoses>
  | ReturnType<typeof StaticDataActionCreater.createAddDoctor>
  | ReturnType<typeof StaticDataActionCreater.createRemoveDoctor>


    // await Api.updateDoc('staticData', 'staticData', {
    //   doctor: ['доктор №1', 'доктор №2', 'Кристина'],
    //   diagnoses: [
    //     'ящер', 'лешай', 'бешенство', 'пироплазмоз', 'Лихорадка Эбола', 'Хитридиомикоз', 'Энцефалит Западного Нила',
    //     'Синдром белого носа', 'Сибирская язва', 'Лицевая опухоль', 'Собачья чума', 'Хламидиоз'
    //   ],
    //   petType: ['кот', 'собака', 'страус'],
    //   breed: {
    //     кот: ['сиамский', 'сфинкс', 'белый'],
    //     собака: ['алабай', 'тойтерьер'],
    //   },
    // })