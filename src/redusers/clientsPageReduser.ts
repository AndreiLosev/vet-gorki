import {Reducer} from 'redux'
import {ClientsActionType, TAction} from '../actions/clientsPageActions'
import {IinitialClientForm} from '../components/newClientForm/newClientForm'

export interface IClient extends IinitialClientForm {
  pets?: string[]
}

const initState = {
  showNewClientForm: false as boolean,
  showNewPetForm: false as boolean,
  IsFetching: false as boolean,
  currentClient: '' as string,
  clients: {} as {[index: string]: IClient},
}

export type TClientsPageState = typeof initState

export const clientsPageReduser: Reducer<TClientsPageState, TAction> = (state=initState, action) => {
  switch (action.type) {
    case ClientsActionType.SHOW_NEW_CLIENT_FORM:
      return {...state, showNewClientForm: action.pyload}
    case ClientsActionType.SHOW_NEW_PET_FORM:
      return {...state ,showNewPetForm: action.pyload}
    case ClientsActionType.IS_FETCHING:
      return {...state, IsFetching: action.pyload}
    case ClientsActionType.SET_CLIENTS:
      return {...state, clients: action.pyload}
    case ClientsActionType.SET_CURRENT_CLIENT:
      return {...state, currentClient: action.pyload}
    default:
      return {...state}
  }
}