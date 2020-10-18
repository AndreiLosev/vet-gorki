import {Reducer} from 'redux'
import {ClientsActionType, TAction} from '../actions/clientsPageActions'
import {IinitialClientForm} from '../components/newClientForm/newClientForm'
import {IPetFormValues} from '../components/newPetForm/newPetForm'


export interface IClient extends IinitialClientForm {
  pets: string[]
}

export interface IPets extends IPetFormValues {
  visits?: string[]
}

const initState = {
  showNewClientForm: false,
  showNewPetForm: false,
  showPetTypeOptions: false,
  showBreedOptions: false,
  IsFetching: false,
  clientEditing: false,
  selectedPetType: '',
  currentClient: '',
  clients: {} as {[index: string]: IClient},
  pets: {} as IPets[],
}

export type TElementsName = 'showNewClientForm' | 'showNewPetForm' | 'showPetTypeOptions' | 'showBreedOptions'
  | 'IsFetching' | 'clientEditing'

export type TClientsPageState = typeof initState

export const clientsPageReduser: Reducer<TClientsPageState, TAction> = (state=initState, action) => {
  switch (action.type) {
    case ClientsActionType.SET_CLIENTS:
      const newClients = {} as {[index: string]: IClient}
      Object.keys(action.pyload).forEach(item => {
        newClients[item] = {...action.pyload[item], pets: []}
      })
      return {...state, clients: newClients}
    case ClientsActionType.SET_CURRENT_CLIENT:
      return {...state, currentClient: action.pyload, clientEditing: false}
    case ClientsActionType.SHOW_ELEMENT:
      return {...state, [action.pyload.element]: action.pyload.state}
    case ClientsActionType.SELECTED_PET_TYPE:
      return {...state, selectedPetType: action.pyload}
    case ClientsActionType.SET_PETS:
      return {...state, pets: action.pyload}
    default:
      return state
  }
}