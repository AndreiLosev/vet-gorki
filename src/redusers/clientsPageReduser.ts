import {Reducer} from 'redux'
import {ClientsActionType, TAction} from '../actions/clientsPageActions'


const initState = {
  showNewClientForm: false as boolean,
  showNewPetForm: false as boolean,
}

export type TClientsPageState = typeof initState

export const clientsPageReduser: Reducer<TClientsPageState, TAction> = (state=initState, action) => {
  switch (action.type) {
    case ClientsActionType.SHOW_NEW_CLIENT_FORM:
      return {...state, showNewClientForm: action.pyload}
    case ClientsActionType.SHOW_NEW_PET_FORM:
      return {...state ,showNewPetForm: action.pyload}
    default:
      return {...state}
  }
}