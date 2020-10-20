import {AppAction} from '../redusers'
import {TElementsName, IClient, IPet} from '../redusers/clientsPageReduser'
import {IPetFormValues} from '../components/newPetForm/newPetForm'
import {Api} from '../api'

export class ClientsActionType {
  static SET_CLIENTS = 'SET_CLIENTS' as const
  static SET_PETS = 'SET_PETS' as const
  static SET_CURRENT_CLIENT = 'SET_CURRENT_CLIENT' as const
  static SET_CURRENT_PET = 'SET_CURRENT_PET' as const
  static SHOW_ELEMENT = 'SHOW_ELEMENT' as const
  static SELECTED_PET_TYPE = 'SELECTED_PET_TYPE' as const
}

export class ClientsActionCreater {
  static createShowElement = (element: TElementsName, state: boolean) =>
    ({ type: ClientsActionType.SHOW_ELEMENT, pyload: {element, state} })

  static createSetClients = (clients: {[index: string]: IClient}) =>
    ({ type: ClientsActionType.SET_CLIENTS, pyload: clients })

  static createSetCurrentPet = (key: string) =>
    ({ type: ClientsActionType.SET_CURRENT_PET, pyload: key })

  static createSetCurrentClient = (key: string) =>
    ({ type: ClientsActionType.SET_CURRENT_CLIENT, pyload: key })

  static createSelectedPetType = (petType: string) =>
    ({ type: ClientsActionType.SELECTED_PET_TYPE, pyload: petType })

  static createSetPets = (pets: {[index: string]: IPet}) =>
    ({ type: ClientsActionType.SET_PETS, pyload: pets })

  static createSearch = (searchLine: string): AppAction => async dispatch => {
    dispatch(ClientsActionCreater.createShowElement('IsFetching', true))
    dispatch(ClientsActionCreater.createSetCurrentClient(''))
    dispatch(ClientsActionCreater.createSetCurrentPet(''))
    if (searchLine) {
      const phone = searchLine.match(/\d+/g)?.join('').replace(/375/, '')
      const upperSerchLine = searchLine.slice(0, 1).toUpperCase() + searchLine.slice(1)
      const loverSerchLine = searchLine.slice(0, 1).toLowerCase() + searchLine.slice(1)
      const result = await Promise.all([
        Api.findDocsFrom<IClient>('clients', upperSerchLine, 'surname'),
        Api.findDocsFrom<IClient>('clients', loverSerchLine, 'surname'),
        Api.findDocsFrom<IClient>('clients', `375${phone}`, 'phone'),
        Api.findDocsFrom<IClient>('clients', upperSerchLine, 'locality'),
        Api.findDocsFrom<IClient>('clients', loverSerchLine, 'locality'),
        Api.findDocsFrom<IClient>('clients', upperSerchLine, 'street'),
        Api.findDocsFrom<IClient>('clients', loverSerchLine, 'street'),
      ])
      const dispatchClients: {[intem: string]: IClient} = result
        .reduce((acc, item) => ({...acc, ...item}), {})
      dispatch(ClientsActionCreater.createSetClients(dispatchClients))
    } else {
      const question = window.confirm('Хотите запросить всех клиентов')
      if (question) {
        const result = await Api.getAll<IClient>('clients')
        dispatch(ClientsActionCreater.createSetClients(result))
      }
    }
    dispatch(ClientsActionCreater.createShowElement('IsFetching', false))
  }

  static createAddUser = (newClient: IClient): AppAction => async dispatch => {
    dispatch(ClientsActionCreater.createShowElement('IsFetching', true))
    const clientID = await Api.addDocToCollection('clients', newClient)
    const client = await Api.findDocFromID<IClient>('clients', clientID)
    dispatch(ClientsActionCreater.createSetClients(client))
    dispatch(ClientsActionCreater.createShowElement('showNewClientForm', false))
    dispatch(ClientsActionCreater.createShowElement('IsFetching', false))
  }

  static createUpdateUser = (newClient: IClient, currentClient: string): AppAction => async (dispatch) => {
    dispatch(ClientsActionCreater.createShowElement('IsFetching', true))
    await Api.updateDoc('clients', currentClient, newClient)
    const client = await Api.findDocFromID<IClient>('clients', currentClient)
    dispatch(ClientsActionCreater.createSetClients(client))
    dispatch(ClientsActionCreater.createShowElement('clientEditing', false))
    dispatch(ClientsActionCreater.createShowElement('showNewClientForm', false))
    dispatch(ClientsActionCreater.createShowElement('IsFetching', false))
  }

  static createDeleteUser = (currentClient: string): AppAction => async (dispatch, getState) => {
    dispatch(ClientsActionCreater.createShowElement('IsFetching', true))
    Api.deleteDoc('clients', currentClient)
    const nextClients = {...getState().clientsPage.clients}
    delete nextClients[currentClient]
    dispatch(ClientsActionCreater.createSetClients(nextClients))
    dispatch(ClientsActionCreater.createShowElement('IsFetching', false))
  }

  static createAddPet = (newPet: IPet): AppAction => async (dispatch, getState) => {
    dispatch(ClientsActionCreater.createShowElement('IsFetching', true))
    const petID = await Api.addDocToCollection('pets', newPet)
    const currentClient = getState().clientsPage.currentClient
    const client = getState().clientsPage.clients[currentClient]
    client.pets.push(petID)
    Api.updateDoc('clients', currentClient, client)
    const oldPets = getState().clientsPage.pets
    const getNewPet = await Api.findDocFromID<IPetFormValues>('pets', petID)
    const dispatchPets = {...oldPets, [petID]: {...getNewPet[petID]} as IPet}
    dispatch(ClientsActionCreater.createSetPets(dispatchPets))
    dispatch(ClientsActionCreater.createShowElement('IsFetching', false))
    dispatch(ClientsActionCreater.createShowElement('showNewPetForm', false))
  }

  static createGetPets = (currentClient: string): AppAction => async (dispatch, getState) => {
    dispatch(ClientsActionCreater.createShowElement('IsFetching', true))
    const petsList = getState().clientsPage.clients[currentClient].pets
    const pets = await Promise.all(petsList.map(item => Api.findDocFromID<IPet>('pets', item)))
    const dispatchPets: {[index: string]: IPet} = pets.reduce((acc, item) => ({...acc, ...item}), {})
    dispatch(ClientsActionCreater.createSetPets(dispatchPets))
    dispatch(ClientsActionCreater.createShowElement('IsFetching', false))
  }

  static createUpdatePet = (newPet: IPet, currentPet: string): AppAction => async (dispatch, getState) => {
    dispatch(ClientsActionCreater.createShowElement('IsFetching', true))
    await Api.updateDoc('pets', currentPet, newPet)
    const currentClient = getState().clientsPage.currentClient
    const petsList = getState().clientsPage.clients[currentClient].pets
    const pets = await Promise.all(petsList.map(item => Api.findDocFromID<IPet>('pets', item)))
    pets.forEach(item => dispatch(ClientsActionCreater.createSetPets(item)))
    dispatch(ClientsActionCreater.createShowElement('petEditing', false))
    dispatch(ClientsActionCreater.createShowElement('showNewPetForm', false))
    dispatch(ClientsActionCreater.createShowElement('IsFetching', false))
  }

  static createDeletePet = (currentPet: string): AppAction => async (dispatch, getState) => {
    dispatch(ClientsActionCreater.createShowElement('IsFetching', true))
    Api.deleteDoc('pets', currentPet)
    const nextPets = {...getState().clientsPage.pets}
    delete nextPets[currentPet]
    dispatch(ClientsActionCreater.createSetPets(nextPets))
    dispatch(ClientsActionCreater.createShowElement('IsFetching', false))
  }

}

export type TAction =
  | ReturnType<typeof ClientsActionCreater.createSetClients>
  | ReturnType<typeof ClientsActionCreater.createSetCurrentClient>
  | ReturnType<typeof ClientsActionCreater.createShowElement>
  | ReturnType<typeof ClientsActionCreater.createSelectedPetType>
  | ReturnType<typeof ClientsActionCreater.createSetPets>
  | ReturnType<typeof ClientsActionCreater.createSetCurrentPet>
