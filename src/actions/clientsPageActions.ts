import {AppAction} from '../redusers'
import {TElementsName} from '../redusers/clientsPageReduser'
import {IinitialClientForm} from '../components/newClientForm/newClientForm'
import {IPetFormValues} from '../components/newPetForm/newPetForm'
import {Api} from '../api'

export class ClientsActionType {
  static SET_CLIENTS = 'SET_CLIENTS' as const
  static SET_PETS = 'SET_PETS' as const
  static SET_CURRENT_CLIENT = 'SET_CURRENT_CLIENT' as const
  static SHOW_ELEMENT = 'SHOW_ELEMENT' as const
  static SELECTED_PET_TYPE = 'SELECTED_PET_TYPE' as const
}

export class ClientsActionCreater {
  static createShowElement = (element: TElementsName, state: boolean) =>
    ({ type: ClientsActionType.SHOW_ELEMENT, pyload: {element, state} })

  static createSetClients = (clients: {[index: string]: IinitialClientForm}) =>
    ({ type: ClientsActionType.SET_CLIENTS, pyload: clients })

  static createSetCurrentClient = (key: string) =>
    ({ type: ClientsActionType.SET_CURRENT_CLIENT, pyload: key })

  static createSelectedPetType = (petType: string) =>
    ({ type: ClientsActionType.SELECTED_PET_TYPE, pyload: petType })

  static createSetPets = (pets: IPetFormValues[]) =>
    ({ type: ClientsActionType.SET_PETS, pyload: pets })

  static createAddUser = (newClient: IinitialClientForm): AppAction => async dispatch => {
    dispatch(ClientsActionCreater.createShowElement('IsFetching', true))
    await Api.addDocToCollection('clients', newClient)
    const clients = await Api.findDocFrom<IinitialClientForm>('clients', 'surname', newClient.surname)
    dispatch(ClientsActionCreater.createSetClients(clients))
    dispatch(ClientsActionCreater.createShowElement('showNewClientForm', false))
    dispatch(ClientsActionCreater.createShowElement('IsFetching', false))
  }

  static createUpdateUser = (newClient: IinitialClientForm, key: string): AppAction => async dispatch => {
    dispatch(ClientsActionCreater.createShowElement('IsFetching', true))
    await Api.updateDoc('clients', key, newClient)
    const clients = await Api.findDocFrom<IinitialClientForm>('clients', 'surname', newClient.surname)
    dispatch(ClientsActionCreater.createSetClients(clients))
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
    await Api.updateDoc('clients', currentClient, {pets: client})
    const pet = await Api.findDocFromID<IPetFormValues>('pets', petID)
    dispatch(ClientsActionCreater.createSetPets([pet]))
    dispatch(ClientsActionCreater.createShowElement('IsFetching', false))
    dispatch(ClientsActionCreater.createShowElement('showNewPetForm', false))
  }
}

export type TAction =
  | ReturnType<typeof ClientsActionCreater.createSetClients>
  | ReturnType<typeof ClientsActionCreater.createSetCurrentClient>
  | ReturnType<typeof ClientsActionCreater.createShowElement>
  | ReturnType<typeof ClientsActionCreater.createSelectedPetType>
  | ReturnType<typeof ClientsActionCreater.createSetPets>
