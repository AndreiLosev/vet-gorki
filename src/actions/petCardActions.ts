import {TStateBoolData} from '../redusers/petCardPageReduser'
import {AppAction} from '../redusers'
import {convertToRaw, EditorState, RawDraftContentState, convertFromRaw} from 'draft-js'
import {Api} from '../api'
import {IVisitsRaw} from '../redusers/petCardPageReduser'
import {ClientsActionCreater} from './clientsPageActions'
import {EditorActionCreater} from './editorActions'

export class PetCardActionType {
  static SET_BOOL_DATA = 'SET_BOOL_DATA' as const
  static SET_VISITS = 'SET_VISITS' as const
  static SET_CURRENT_VISIT = 'SET_CURRENT_VISIT' as const
}

export class PetCardsActionCreater {

  static createSetBoolData = (fild: TStateBoolData, state: boolean) =>
    ({ type: PetCardActionType.SET_BOOL_DATA, pyload: { fild, state } })

  static createSetVisits = (visits: {[id: string]: IVisitsRaw}) =>
    ({ type: PetCardActionType.SET_VISITS, pyload: visits })

  static createSetCurrentVisit = (id: string) =>
    ({ type: PetCardActionType.SET_CURRENT_VISIT, pyload: id })

  static createAddVisits = (): AppAction => async (dispatch, getState) => {
    dispatch(PetCardsActionCreater.createSetBoolData('IsFetching', true))
    const visitdataRaw: IVisitsRaw = {
      ...getState().editor,
      history: {} as RawDraftContentState,
      description: convertToRaw(getState().editor.description.getCurrentContent()),
      recommendations: convertToRaw(getState().editor.recommendations.getCurrentContent()),
      vaccinations: convertToRaw(getState().editor.vaccinations.getCurrentContent())
    }
    const visitID = await Api.addDocToCollection('visits', visitdataRaw)
    dispatch(PetCardsActionCreater.createSetCurrentVisit(visitID))
    const currentPetKey = getState().clientsPage.currentPet
    const currentPet = getState().clientsPage.pets[currentPetKey]
    const newCurrentPet = {...currentPet, visits: [...currentPet.visits, visitID]}
    Api.updateDoc('pets', currentPetKey, newCurrentPet)
    const oldVisits = getState().petCardPage.visits
    const newVisit = await Api.findDocFromID<IVisitsRaw>('visits', visitID)
    const mewVisits = {...oldVisits, [visitID]: newVisit[visitID]}
    dispatch(PetCardsActionCreater.createSetVisits(mewVisits))
    dispatch(PetCardsActionCreater.createSetBoolData('IsFetching', false))
  }

  static createGetVisits = (): AppAction => async (dispatch, getState) => {
    dispatch(ClientsActionCreater.createShowElement('IsFetching', true))
    const currentPetId = getState().clientsPage.currentPet
    const visitsList = getState().clientsPage.pets[currentPetId].visits
    const visitsArr = await Promise.all(visitsList.map(item => Api.findDocFromID<IVisitsRaw>('visits', item)))
    const visits = visitsArr.reduce((acc, item) => ({...acc, ...item}), {} as {[id: string]: IVisitsRaw})
    dispatch(PetCardsActionCreater.createSetVisits(visits))
    dispatch(ClientsActionCreater.createShowElement('IsFetching', false))
  }

  static createUpdateVisit = (): AppAction => async (dispatch, getState) => {
    dispatch(PetCardsActionCreater.createSetBoolData('IsFetching', false))
    const currentVisitId = getState().petCardPage.currentVisit
    const visitdataRaw: IVisitsRaw = {
      ...getState().editor,
      history: {} as RawDraftContentState,
      description: convertToRaw(getState().editor.description.getCurrentContent()),
      recommendations: convertToRaw(getState().editor.recommendations.getCurrentContent()),
      vaccinations: convertToRaw(getState().editor.vaccinations.getCurrentContent())
    }
    await Api.updateDoc('visits', currentVisitId, visitdataRaw)
    const oldVisits = getState().petCardPage.visits
    const newVisit = await Api.findDocFromID<IVisitsRaw>('visits', currentVisitId)
    const mewVisits = {...oldVisits, [currentVisitId]: newVisit[currentVisitId]}
    dispatch(PetCardsActionCreater.createSetVisits(mewVisits))
    dispatch(PetCardsActionCreater.createSetBoolData('saved', true))
    dispatch(PetCardsActionCreater.createSetBoolData('IsFetching', false))
  }

  static createDeleteVisit = (): AppAction => async (dispatch, getState) => {
    dispatch(ClientsActionCreater.createShowElement('IsFetching', true))
    const currentVisitId = getState().petCardPage.currentVisit
    Api.deleteDoc('visits', currentVisitId)
    const nextVisit = {...getState().petCardPage.visits}
    delete nextVisit[currentVisitId]
    dispatch(PetCardsActionCreater.createSetVisits(nextVisit))
    dispatch(ClientsActionCreater.createShowElement('IsFetching', false))
  }

  static createEditVisit = (): AppAction => async (dispatch, getState) => {
    const currentVisitId = getState().petCardPage.currentVisit
    const rawEditor = getState().petCardPage.visits[currentVisitId]
    const editor = {
      ...rawEditor,
      history: EditorState.createEmpty(),
      description: EditorState.createWithContent(convertFromRaw(rawEditor.description)),
      recommendations: EditorState.createWithContent(convertFromRaw(rawEditor.recommendations)),
      vaccinations: EditorState.createWithContent(convertFromRaw(rawEditor.vaccinations)),
    }
    dispatch(EditorActionCreater.createLoadEditorsfromRaw(editor))
  }
}

export type TAction =
  | ReturnType<typeof PetCardsActionCreater.createSetBoolData>
  | ReturnType<typeof PetCardsActionCreater.createSetVisits>
  | ReturnType<typeof PetCardsActionCreater.createSetCurrentVisit>
