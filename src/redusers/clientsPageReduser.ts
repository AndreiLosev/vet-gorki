import {Reducer} from 'redux'
import {ClientsActionType, TAction} from '../actions/clientsPageActions'


const initState = {
  showCreateNewClientForm: false as boolean
}

export type TClientsPageState = typeof initState

export const clientsPageReduser: Reducer<TClientsPageState, TAction> = (state=initState, action) => {
  switch (action.type) {
    case ClientsActionType.SHOW_CREATE_NEW_CLIENT_FORM:
      return {...state, showCreateNewClientForm: action.pyload}
    default:
      return {...state}
  }
}