import {AppAction} from '../redusers'
import {Api} from '../api'
import {TStaticDataState} from '../redusers/staticDataReduser'

export class StaticDataActionType {
  static ADD_PET_TYPE = 'ADD_PET_TYPE' as const
  static ADD_BREED = 'ADD_BREED' as const
  static ADD_DIAGNOSES = 'ADD_DIAGNOSES' as const
  static ADD_DOCTOR = 'ADD_DOCTOR' as const
  static ADD_GOAL_OF_REQUEST = 'ADD_GOAL_OF_REQUEST' as const
  static ADD_VISIT_RESULT = 'ADD_VISIT_RESULT' as const
}

export class StaticDataActionCreater {
  static createAddPetType = (petsType: string[]) =>
    ({ type: StaticDataActionType.ADD_PET_TYPE, pyload: petsType })

  static createAddBreed = (breeds: string[], currentPetType: string) =>
    ({ type: StaticDataActionType.ADD_BREED, pyload: { breeds, currentPetType} })

  static createAddDiagnoses = (diagnoses: string[]) =>
    ({ type: StaticDataActionType.ADD_DIAGNOSES, pyload: diagnoses })

  static createAddDoctor = (doctors: string[]) =>
    ({ type: StaticDataActionType.ADD_DOCTOR, pyload: doctors })

  static createAddGoalOfRequest = (requests: string[]) =>
    ({ type: StaticDataActionType.ADD_GOAL_OF_REQUEST, pyload: requests })

  static createAddVisitResult = (visits: string[]) =>
    ({ type: StaticDataActionType.ADD_VISIT_RESULT, pyload: visits })

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
      dispatch(StaticDataActionCreater.createAddGoalOfRequest(staticData.goalOfRequest ? staticData.goalOfRequest : []))
      dispatch(StaticDataActionCreater.createAddVisitResult(staticData.visitResult ? staticData.visitResult : []))
    }
  }

  static createSetNewData = (
    fild: 'petType' | 'diagnoses' | 'doctor' | 'goalOfRequest' | 'visitResult' | undefined,
    newItem: string[], remove?: boolean, breedType?: string,
    ): AppAction => async (dispatch, getState) => {
    if (breedType) {
      const oldData = getState().staticData
      const currentBreedType = oldData.breed[breedType] ? oldData.breed[breedType] : []
      const newData = remove
        ? {...oldData, breed: {
            ...oldData.breed, [breedType]: currentBreedType.filter(item => !newItem.includes(item))
          }}
        : {...oldData, breed: {...oldData.breed, [breedType]: currentBreedType.concat(newItem)}}
      await Api.updateDoc('staticData', 'staticData', newData)
    } else if (fild) {
      const oldData = getState().staticData
      const newData = remove
        ? {...oldData, [fild]: oldData[fild].filter(item => !newItem.includes(item))}
        : {...oldData, [fild]: oldData[fild].concat(newItem)}
      await Api.updateDoc('staticData', 'staticData', newData)
    }
    const result = await Api.findDocFromID<TStaticDataState>('staticData', 'staticData')
    const staticData = Object.values(result)[0] as TStaticDataState
    if (staticData) {
      dispatch(StaticDataActionCreater.createAddPetType(staticData.petType ? staticData.petType : []))
      dispatch(StaticDataActionCreater.createAddDiagnoses(staticData.diagnoses ? staticData.diagnoses : []))
      if (staticData.breed)
        Object.keys(staticData.breed).forEach(item => {
        dispatch(StaticDataActionCreater.createAddBreed(staticData.breed[item] ? staticData.breed[item] : [], item))
        })
      dispatch(StaticDataActionCreater.createAddDoctor(staticData.doctor ? staticData.doctor : []))
      dispatch(StaticDataActionCreater.createAddGoalOfRequest(staticData.goalOfRequest ? staticData.goalOfRequest : []))
      dispatch(StaticDataActionCreater.createAddVisitResult(staticData.visitResult ? staticData.visitResult : []))
    }
  }
}

export type TAction =
  | ReturnType<typeof StaticDataActionCreater.createAddPetType>
  | ReturnType<typeof StaticDataActionCreater.createAddBreed>
  | ReturnType<typeof StaticDataActionCreater.createAddDiagnoses>
  | ReturnType<typeof StaticDataActionCreater.createAddDoctor>
  | ReturnType<typeof StaticDataActionCreater.createAddGoalOfRequest>
  | ReturnType<typeof StaticDataActionCreater.createAddVisitResult>


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