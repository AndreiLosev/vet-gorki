import {AppAction} from '../redusers'
import {TElementsName} from '../redusers/clientsPageReduser'
import {IinitialClientForm} from '../components/newClientForm/newClientForm'
import {Api} from '../api'

export class ClientsActionType {
  static SHOW_NEW_CLIENT_FORM = 'SHOW_CREATE_NEW_CLIENT_FORM' as const
  static SHOW_NEW_PET_FORM = 'SHOW_NEW_PET_FORM' as const
  static SET_CLIENTS = 'SET_CLIENTS' as const
  static SET_CURRENT_CLIENT = 'SET_CURRENT_CLIENT' as const
  static IS_FETCHING = 'IS_FETCHING' as const
  static CLIENT_EDITING_MODE = 'CLIENT_EDITING_MODE' as const
  static PET_TYPE_OPTIONS = 'PET_TYPE_OPTIONS' as const
  static BREED_OPTIONS = 'BREED_OPTIONS' as const
  static SHOW_ELEMENT = 'SHOW_ELEMENT' as const
}

export class ClientsActionCreater {
  static createShpwElement = (element: TElementsName, state: boolean) =>
    ({ type: ClientsActionType.SHOW_ELEMENT, pyload: {element, state} })

  static createShowNewClientForm = (show: boolean) =>
    ({ type: ClientsActionType.SHOW_NEW_CLIENT_FORM, pyload: show })

  static createShowNewPetForm = (show: boolean) =>
    ({ type: ClientsActionType.SHOW_NEW_PET_FORM, pyload: show })

  static createSetClients = (clients: {[index: string]: IinitialClientForm}) =>
    ({ type: ClientsActionType.SET_CLIENTS, pyload: clients })

  static createSetCurrentClient = (key: string) =>
    ({ type: ClientsActionType.SET_CURRENT_CLIENT, pyload: key })

  static createIsFetching = (isFetching: boolean) =>
    ({ type: ClientsActionType.IS_FETCHING, pyload: isFetching })

  static createClientEditingMode = (on: boolean) =>
    ({ type: ClientsActionType.CLIENT_EDITING_MODE, pyload: on })

  static createPetTypeOptions = (show: boolean) =>
    ({ type: ClientsActionType.PET_TYPE_OPTIONS, pyload: show })

  static createBreedOptions = (show: boolean) =>
    ({ type: ClientsActionType.BREED_OPTIONS, pyload: show })

  static createAddUser = (newClient: IinitialClientForm): AppAction => async dispatch => {
    dispatch(ClientsActionCreater.createIsFetching(true))
    await Api.addDocToCollection('clients', newClient)
    const clients = await Api.findDocFrom<IinitialClientForm>('clients', 'surname', newClient.surname)
    dispatch(ClientsActionCreater.createSetClients(clients))
    dispatch(ClientsActionCreater.createShowNewClientForm(false))
    dispatch(ClientsActionCreater.createIsFetching(false))
  }

  static createUpdateUser = (newClient: IinitialClientForm, key: string): AppAction => async dispatch => {
    dispatch(ClientsActionCreater.createIsFetching(true))
    await Api.updateDoc('clients', key, newClient)
    const clients = await Api.findDocFrom<IinitialClientForm>('clients', 'surname', newClient.surname)
    dispatch(ClientsActionCreater.createSetClients(clients))
    dispatch(ClientsActionCreater.createClientEditingMode(false))
    dispatch(ClientsActionCreater.createShowNewClientForm(false))
    dispatch(ClientsActionCreater.createIsFetching(false))
  }

  static createDeleteUser = (currentClient: string): AppAction => async (dispatch, getState) => {
    dispatch(ClientsActionCreater.createIsFetching(true))
    Api.deleteDoc('clients', currentClient)
    const nextClients = {...getState().clientsPage.clients}
    delete nextClients[currentClient]
    dispatch(ClientsActionCreater.createSetClients(nextClients))
    dispatch(ClientsActionCreater.createIsFetching(false))
  }
}

export type TAction =
  | ReturnType<typeof ClientsActionCreater.createShowNewClientForm>
  | ReturnType<typeof ClientsActionCreater.createShowNewPetForm>
  | ReturnType<typeof ClientsActionCreater.createSetClients>
  | ReturnType<typeof ClientsActionCreater.createSetCurrentClient>
  | ReturnType<typeof ClientsActionCreater.createIsFetching>
  | ReturnType<typeof ClientsActionCreater.createClientEditingMode>
  | ReturnType<typeof ClientsActionCreater.createPetTypeOptions>
  | ReturnType<typeof ClientsActionCreater.createBreedOptions>
  | ReturnType<typeof ClientsActionCreater.createShpwElement>
