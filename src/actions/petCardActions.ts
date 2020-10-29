import {TStateBoolData} from '../redusers/petCardPageReduser'
import {AppAction} from '../redusers'
import {convertToRaw, EditorState, convertFromRaw, ContentState} from 'draft-js'
import {Api} from '../api'
import {IVisitsRaw} from '../redusers/petCardPageReduser'
import {ClientsActionCreater} from './clientsPageActions'
import {EditorActionCreater} from './editorActions'
import {Lib} from '../utilites/lib'

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

  static createAddVisits = (currentPetKey: string): AppAction => async (dispatch, getState) => {
    dispatch(PetCardsActionCreater.createSetBoolData('IsFetching', true))
    const visitdataRaw: IVisitsRaw = {
      ...getState().editor,
      history: JSON.stringify({}),
      description: JSON.stringify(convertToRaw(getState().editor.description.getCurrentContent())),
      recommendations: JSON.stringify(convertToRaw(getState().editor.recommendations.getCurrentContent())),
      vaccinations: JSON.stringify(convertToRaw(getState().editor.vaccinations.getCurrentContent())),
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
    const visitsArr = Object.values(visits).map(item => item)
    visitsArr.sort((a, b) => {
      const a1 = +Lib.dateFromString(a.shortData.date)
      const b1 = +Lib.dateFromString(b.shortData.date)
      return +a1 - +b1
    })
    const historyEditor = visitsArr.reduce((acc, item) => {
      const newAcc = acc.getBlocksAsArray()
      const date = Lib.contentBlockArrayFromText(
        `\n      ${item.shortData.date}  Врачь: ${item.shortData.doctor}      \n`,
        ['BOLD', 'FONT_SIZE_20', 'UNDERLINE'],
      )
      const descriptionText = Lib.contentBlockArrayFromText(
        '\n     Описание лечения     \n',
        ['BOLD', 'FONT_SIZE_16', 'UNDERLINE'],
      )
      const description = convertFromRaw(JSON.parse(item.description)).getBlocksAsArray()
      const recommendationsText = Lib.contentBlockArrayFromText(
        '\n     Рекомендации и назначения     \n',
        ['BOLD', 'FONT_SIZE_16', 'UNDERLINE'],
      )
      const recommendations = convertFromRaw(JSON.parse(item.recommendations)).getBlocksAsArray()
      const blocksAsArray = newAcc.concat(
        date, descriptionText,
        description, recommendationsText, recommendations
      )
      return ContentState.createFromBlockArray(blocksAsArray)
    }, EditorState.createEmpty().getCurrentContent())
    const editor = {
      ...rawEditor,
      history: EditorState.createWithContent(historyEditor),
      description: EditorState.createWithContent(convertFromRaw(JSON.parse(rawEditor.description))),
      recommendations: EditorState.createWithContent(convertFromRaw(JSON.parse(rawEditor.recommendations))),
      vaccinations: EditorState.createWithContent(convertFromRaw(JSON.parse(rawEditor.vaccinations))),
    }
    dispatch(EditorActionCreater.createLoadEditorsfromRaw(editor))
  }
}

export type TAction =
  | ReturnType<typeof PetCardsActionCreater.createSetBoolData>
  | ReturnType<typeof PetCardsActionCreater.createSetVisits>
  | ReturnType<typeof PetCardsActionCreater.createSetCurrentVisit>
