import {AppAction} from '../redusers'
import {convertToRaw, convertFromRaw, EditorState} from 'draft-js'
import {Api} from '../api'
import {TStaticDataState} from '../redusers/staticDataReduser'
import {EditorActionCreater} from './editorActions'

export class StaticDataActionType {
  static ADD_PET_TYPE = 'ADD_PET_TYPE' as const
  static ADD_BREED = 'ADD_BREED' as const
  static ADD_DIAGNOSES = 'ADD_DIAGNOSES' as const
  static ADD_DOCTOR = 'ADD_DOCTOR' as const
  static ADD_GOAL_OF_REQUEST = 'ADD_GOAL_OF_REQUEST' as const
  static ADD_VISIT_RESULT = 'ADD_VISIT_RESULT' as const
  static ADD_TEMPLATE_NAMES = 'ADD_TEMPLATE_NAMES' as const
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

  static createAddTemplateNames = (names: string[]) =>
    ({ type: StaticDataActionType.ADD_TEMPLATE_NAMES, pyload: names })

  static createGetStatickData = (): AppAction => async dispatch => {
    const result = await Api.getAll<TStaticDataState>('staticData')
    const staticData = result['staticData'] as Omit<TStaticDataState, 'templateNames'>
    const templateNames = result['templateNames']['templateNames']
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
      dispatch(StaticDataActionCreater.createAddTemplateNames(templateNames ? templateNames : []))
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

  static createSetTemplate = (templateName: string): AppAction => async (dispatch, getState) => {
    const currentEditor = getState().editor.activeEditor
    const newTemplate = getState().editor[currentEditor]
    const newTemlateStr = JSON.stringify(convertToRaw(newTemplate.getCurrentContent()))
    await Api.updateDoc('template', templateName, {[templateName]: newTemlateStr})
    const oldTemplateNames = getState().staticData.templateNames
    const newTemplateNames = [...oldTemplateNames, templateName]
    await Api.updateDoc('staticData', 'templateNames', {templateNames: newTemplateNames})
    dispatch(StaticDataActionCreater.createAddTemplateNames(newTemplateNames))
  }

  static createRemoveTemplate = (templateName: string): AppAction => async (dispatch, getState) => {
    Api.deleteDoc('template', templateName)
    const oldTemplateNames = getState().staticData.templateNames
    const newTemplateNames = oldTemplateNames.filter(item => item !== templateName)
    await Api.updateDoc('staticData', 'templateNames', {newTemplateNames})
    dispatch(StaticDataActionCreater.createAddTemplateNames(newTemplateNames))
  }

  static createGetTemplate = (templateName: string): AppAction => async dispatch => {
    const templateStr =
      (await Api.findDocFromID<{[id: string]: string}>('template', templateName))[templateName][templateName]
    const template = convertFromRaw(JSON.parse(templateStr))
    dispatch(EditorActionCreater.createUpdatePage(EditorState.createWithContent(template)))
  }
}

export type TAction =
  | ReturnType<typeof StaticDataActionCreater.createAddPetType>
  | ReturnType<typeof StaticDataActionCreater.createAddBreed>
  | ReturnType<typeof StaticDataActionCreater.createAddDiagnoses>
  | ReturnType<typeof StaticDataActionCreater.createAddDoctor>
  | ReturnType<typeof StaticDataActionCreater.createAddGoalOfRequest>
  | ReturnType<typeof StaticDataActionCreater.createAddVisitResult>
  | ReturnType<typeof StaticDataActionCreater.createAddTemplateNames>
