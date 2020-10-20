import {AppAction} from '../redusers'
import {TElementsName, IClient, IPet} from '../redusers/clientsPageReduser'
import {IinitialClientForm} from '../components/newClientForm/newClientForm'
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

  static createAddUser = (newClient: IinitialClientForm): AppAction => async dispatch => {
    dispatch(ClientsActionCreater.createShowElement('IsFetching', true))
    const clientID = await Api.addDocToCollection('clients', newClient)
    const client = await Api.findDocFromID<IinitialClientForm>('clients', clientID)
    // const clients = await Api.findDocFrom<IinitialClientForm>('clients', 'surname', newClient.surname)
    const dispatchClient: {[index: string]: IClient} = {}
    Object.keys(client).map(item => dispatchClient[item] = {...client[item], pets: []})
    dispatch(ClientsActionCreater.createSetClients(dispatchClient))
    dispatch(ClientsActionCreater.createShowElement('showNewClientForm', false))
    dispatch(ClientsActionCreater.createShowElement('IsFetching', false))
  }

  static createUpdateUser = (newClient: IinitialClientForm, currentClient: string): AppAction => async (dispatch, getState) => {
    dispatch(ClientsActionCreater.createShowElement('IsFetching', true))
    const oldClient = getState().clientsPage.clients[currentClient]
    const sendClient: IClient = {...newClient, pets: oldClient.pets}
    await Api.updateDoc('clients', currentClient, sendClient)
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

  static createAddPet = (newPet: IPetFormValues): AppAction => async (dispatch, getState) => {
    dispatch(ClientsActionCreater.createShowElement('IsFetching', true))
    const petID = await Api.addDocToCollection('pets', newPet)
    const currentClient = getState().clientsPage.currentClient
    const client = getState().clientsPage.clients[currentClient]
    client.pets.push(petID)
    Api.updateDoc('clients', currentClient, {pets: client})
    const oldPets = getState().clientsPage.pets
    const getNewPet = await Api.findDocFromID<IPetFormValues>('pets', petID)
    const dispatchPets = {...oldPets, [petID]: {...getNewPet[petID], visits: [] as string[]} as IPet}
    dispatch(ClientsActionCreater.createSetPets(dispatchPets))
    dispatch(ClientsActionCreater.createShowElement('IsFetching', false))
    dispatch(ClientsActionCreater.createShowElement('showNewPetForm', false))
  }

  static createGetPets = (currentClient: string): AppAction => async (dispatch, getState) => {
    dispatch(ClientsActionCreater.createShowElement('IsFetching', true))
    const petsList = getState().clientsPage.clients[currentClient].pets
    const pets = await Promise.all(petsList.map(item => Api.findDocFromID<IPet>('pets', item)))
    const dispatchPets = {} as {[index: string]: IPet}
    pets.forEach(item => {
      const x = Object.entries(item)[0]
      dispatchPets[x[0]] = x[1]
    })
    dispatch(ClientsActionCreater.createSetPets(dispatchPets))
    dispatch(ClientsActionCreater.createShowElement('IsFetching', false))
  }
  // todoo
  static createUpdatePet = (newPet: IPetFormValues, currentPet: string): AppAction => async (dispatch, getState) => {
    dispatch(ClientsActionCreater.createShowElement('IsFetching', true))
    const oldPet = getState().clientsPage.pets[currentPet]
    const sendPet: IPet = {...newPet, visits: oldPet.visits}
    await Api.updateDoc('pets', currentPet, sendPet)
    const currentClient = getState().clientsPage.currentClient
    const petsList = getState().clientsPage.clients[currentClient].pets
    const pets = await Promise.all(petsList.map(item => Api.findDocFromID<IPet>('pets', item)))
    pets.forEach(item => dispatch(ClientsActionCreater.createSetPets(item)))
    dispatch(ClientsActionCreater.createShowElement('petEditing', false))
    dispatch(ClientsActionCreater.createShowElement('showNewPetForm', false))
    dispatch(ClientsActionCreater.createShowElement('IsFetching', false))
  }

  static createSearch = (searchLine: string): AppAction => async () => {
    if (searchLine) {
      const phone = searchLine.match(/\d+/g)?.join('')
      const upperSerchLine = searchLine.slice(0, 1).toUpperCase() + searchLine.slice(1)
      const loverSerchLine = searchLine.slice(0, 1).toLowerCase() + searchLine.slice(1)
      console.log(searchLine.slice(1))
      const x = await Api.findDocsFrom('clients', searchLine, 'surname')
      console.log(x)
    }
  } 
}

export type TAction =
  | ReturnType<typeof ClientsActionCreater.createSetClients>
  | ReturnType<typeof ClientsActionCreater.createSetCurrentClient>
  | ReturnType<typeof ClientsActionCreater.createShowElement>
  | ReturnType<typeof ClientsActionCreater.createSelectedPetType>
  | ReturnType<typeof ClientsActionCreater.createSetPets>
  | ReturnType<typeof ClientsActionCreater.createSetCurrentPet>
