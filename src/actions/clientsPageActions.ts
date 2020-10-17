import {AppAction} from '../redusers'
import {IinitialClientForm} from '../components/newClientForm/newClientForm'
import {Api} from '../api'

export class ClientsActionType {
  static SHOW_NEW_CLIENT_FORM = 'SHOW_CREATE_NEW_CLIENT_FORM' as const
  static SHOW_NEW_PET_FORM = 'SHOW_NEW_PET_FORM' as const
  static SET_CLIENTS = 'SET_CLIENTS' as const
  static SET_CURRENT_CLIENT = 'SET_CURRENT_CLIENT' as const
  static IS_FETCHING = 'IS_FETCHING' as const
}

export class ClientsActionCreater {
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

  static createAddUser = (newClient: IinitialClientForm): AppAction => async dispatch => {
    dispatch(ClientsActionCreater.createIsFetching(true))
    await Api.addDocToCollection('clients', newClient)
    const clients = await Api.findDocFrom<IinitialClientForm>('clients', 'surname', newClient.surname)
    dispatch(ClientsActionCreater.createSetClients(clients))
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
