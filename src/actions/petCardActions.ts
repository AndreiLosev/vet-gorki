import {TStateBoolData} from '../redusers/petCardPageReduser'
import {AppAction} from '../redusers'
import {convertToRaw, EditorState, convertFromRaw, ContentState} from 'draft-js'
import {Api} from '../api'
import {IVisitsRaw} from '../redusers/petCardPageReduser'
import {ClientsActionCreater} from './clientsPageActions'
import {EditorActionCreater} from './editorActions'
import {EditorUtils} from '../utilites/editorUtils'
import { Lib } from '../utilites/lib'

export class PetCardActionType {
  static SET_BOOL_DATA = 'SET_BOOL_DATA' as const
  static SET_VISITS = 'SET_VISITS' as const
  static SET_CURRENT_VISIT = 'SET_CURRENT_VISIT' as const
  static SET_PRINT = 'SET_PRINT' as const
}

export class PetCardsActionCreater {

  static createSetBoolData = (fild: TStateBoolData, state: boolean) =>
    ({ type: PetCardActionType.SET_BOOL_DATA, pyload: { fild, state } })

  static createSetVisits = (visits: {[id: string]: IVisitsRaw}) =>
    ({ type: PetCardActionType.SET_VISITS, pyload: visits })

  static createSetCurrentVisit = (id: string) =>
    ({ type: PetCardActionType.SET_CURRENT_VISIT, pyload: id })

  static createSetPrint = (print: EditorState) =>
    ({ type: PetCardActionType.SET_PRINT, pyload: print })

  static createAddVisits = (currentPetKey: string): AppAction => async (dispatch, getState) => {
    dispatch(PetCardsActionCreater.createSetBoolData('IsFetching', true))
    const visits = getState().petCardPage.visits
    const lastVisitData = Math.max.apply(
      undefined,
      Object.values(visits).map(item => +Lib.dateFromString(item.shortData.date)),
    )
    const lastVaccinations = Object.values(visits).filter(item =>
      lastVisitData === +Lib.dateFromString(item.shortData.date)
    )
    const visitdataRaw: IVisitsRaw = {
      ...getState().editor,
      history: JSON.stringify({}),
      description: JSON.stringify(convertToRaw(getState().editor.description.getCurrentContent())),
      recommendations: JSON.stringify(convertToRaw(getState().editor.recommendations.getCurrentContent())),
      vaccinations: lastVaccinations[0]
        ? lastVaccinations[0].vaccinations
        : JSON.stringify(convertToRaw(getState().editor.vaccinations.getCurrentContent())),
    }
    const visitID = await Api.addDocToCollection('visits', visitdataRaw)
    dispatch(PetCardsActionCreater.createSetCurrentVisit(visitID))
    const currentPet = getState().clientsPage.pets[currentPetKey]
    const newCurrentPet = {...currentPet, visits: [...currentPet.visits, visitID]}
    Api.updateDoc('pets', currentPetKey, newCurrentPet)
    const pets = getState().clientsPage.pets
    dispatch(ClientsActionCreater.createSetPets({...pets, [currentPetKey]: newCurrentPet}))
    const oldVisits = getState().petCardPage.visits
    const newVisit = await Api.findDocFromID<IVisitsRaw>('visits', visitID)
    const mewVisits = {...oldVisits, [visitID]: newVisit[visitID]}
    dispatch(PetCardsActionCreater.createSetVisits(mewVisits))
    dispatch(EditorActionCreater.createUpdateThisPage(
      EditorState.createWithContent(convertFromRaw(JSON.parse(visitdataRaw.vaccinations))),
      'vaccinations',
    ))
    dispatch(PetCardsActionCreater.createSetBoolData('IsFetching', false))
  }

  static createGetVisits = (currentPetId: string): AppAction => async (dispatch, getState) => {
    dispatch(ClientsActionCreater.createShowElement('IsFetching', true))
    const visitsList = getState().clientsPage.pets[currentPetId].visits
    const visitsArr = await Promise.all(visitsList.map(item => Api.findDocFromID<IVisitsRaw>('visits', item)))
    const visits = visitsArr.reduce((acc, item) => ({...acc, ...item}), {} as {[id: string]: IVisitsRaw})
    dispatch(PetCardsActionCreater.createSetVisits(visits))
    dispatch(ClientsActionCreater.createShowElement('IsFetching', false))
  }

  static createUpdateVisit = (currentVisitId: string): AppAction => async (dispatch, getState) => {
    dispatch(PetCardsActionCreater.createSetBoolData('IsFetching', true))
    const visitdataRaw: IVisitsRaw = {
      ...getState().editor,
      history: JSON.stringify({}),
      description: JSON.stringify(convertToRaw(getState().editor.description.getCurrentContent())),
      recommendations: JSON.stringify(convertToRaw(getState().editor.recommendations.getCurrentContent())),
      vaccinations: JSON.stringify(convertToRaw(getState().editor.vaccinations.getCurrentContent())),
    }
    await Api.updateDoc('visits', currentVisitId, visitdataRaw)
    const oldVisits = getState().petCardPage.visits
    const mewVisits = {...oldVisits, [currentVisitId]: visitdataRaw}
    dispatch(PetCardsActionCreater.createSetVisits(mewVisits))
    dispatch(PetCardsActionCreater.createSetBoolData('IsFetching', false))
    dispatch(PetCardsActionCreater.createSetBoolData('saved', true))
  }

  static createDeleteVisit = (correntPetId: string): AppAction => async (dispatch, getState) => {
    dispatch(ClientsActionCreater.createShowElement('IsFetching', true))
    const currentVisitId = getState().petCardPage.currentVisit
    Api.deleteDoc('visits', currentVisitId)
    const nextVisit = {...getState().petCardPage.visits}
    delete nextVisit[currentVisitId]
    const currentPet = getState().clientsPage.pets[correntPetId]
    const newPet = {...currentPet, visits: currentPet.visits.filter(item => (item !== currentVisitId))}
    dispatch(ClientsActionCreater.createUpdatePet(newPet, correntPetId))
    dispatch(PetCardsActionCreater.createSetVisits(nextVisit))
    dispatch(ClientsActionCreater.createShowElement('IsFetching', false))
  }

  static createEditVisit = (): AppAction => async (dispatch, getState) => {
    const currentVisitId = getState().petCardPage.currentVisit
    const rawEditor = getState().petCardPage.visits[currentVisitId]
    const visits = getState().petCardPage.visits
    const historyEditor = EditorUtils.createHistory(visits)
    const editor = {
      ...rawEditor,
      history: EditorState.createWithContent(ContentState.createFromBlockArray(historyEditor)),
      description: EditorState.createWithContent(convertFromRaw(JSON.parse(rawEditor.description))),
      recommendations: EditorState.createWithContent(convertFromRaw(JSON.parse(rawEditor.recommendations))),
      vaccinations: EditorState.createWithContent(convertFromRaw(JSON.parse(rawEditor.vaccinations))),
    }
    dispatch(EditorActionCreater.createLoadEditorsfromRaw(editor))
  }

  static createPrintData = (currentVisitID: string, pages: string[]): AppAction => (dispatch, getState) => {
    // ['Общие данные', 'Описание лечения', 'Рекомендации и назначения', 'Вакцинация', 'Истрория']
    const data = EditorUtils.contentBlockArrayFromText(new Date().toLocaleDateString(), [])
    const visit = getState().petCardPage.visits[currentVisitID]
    const commonData = () => {
      if (pages.includes('Общие данные')) {
        const shortData = visit.shortData
        const doctor = EditorUtils.contentBlockArrayFromText(`Врачь: ${shortData.doctor}`, [])
        const temperature = EditorUtils.contentBlockArrayFromText(`Температура: ${shortData.temperature}`, [])
        const goalOfRequest = EditorUtils.contentBlockArrayFromText(`Цель визита: ${shortData.goalOfRequest}`, [])
        const weight = EditorUtils.contentBlockArrayFromText(`Вес: ${shortData.weight}`, [])
        const visitResult = EditorUtils.contentBlockArrayFromText(`Результат посещения: ${shortData.visitResult}`, [])
        return doctor.concat(temperature, goalOfRequest, weight, visitResult)
      } else return []
    }

    const descriptionOfTreatment = () => {
      if (pages.includes('Описание лечения')) {
        const discriptionLabel = EditorUtils.contentBlockArrayFromText(`Описание лечения:`, [])
        const discription = convertFromRaw(JSON.parse(visit.description)).getBlocksAsArray()
        return discriptionLabel.concat(discription)
      } else return []
    }

    const recommendations_appointments = () => {
      if (pages.includes('Рекомендации и назначения')) {
        const recommendationsLabel = EditorUtils.contentBlockArrayFromText(`Рекомендации и назначения:`, [])
        const recommendations = convertFromRaw(JSON.parse(visit.recommendations)).getBlocksAsArray()
        return recommendationsLabel.concat(recommendations)
      } else return []
    }

    const vaccination = () => {
      if (pages.includes('Вакцинация')) {
        const vaccinationLabel = EditorUtils.contentBlockArrayFromText(`Рекомендации и назначения:`, [])
        const vaccination = convertFromRaw(JSON.parse(visit.recommendations)).getBlocksAsArray()
        return vaccinationLabel.concat(vaccination)
      } else return []
    }

    const history = () => {
      if (pages.includes('Истрория')) {
        return EditorUtils.createHistory(getState().petCardPage.visits)
      } else return []
    }
    const result = ContentState.createFromBlockArray(data.concat(
      commonData(), descriptionOfTreatment(), recommendations_appointments(), vaccination(), history(),
    ))
    dispatch(PetCardsActionCreater.createSetPrint(EditorState.createWithContent(result)))
  }
}

export type TAction =
  | ReturnType<typeof PetCardsActionCreater.createSetBoolData>
  | ReturnType<typeof PetCardsActionCreater.createSetVisits>
  | ReturnType<typeof PetCardsActionCreater.createSetCurrentVisit>
  | ReturnType<typeof PetCardsActionCreater.createSetPrint>
