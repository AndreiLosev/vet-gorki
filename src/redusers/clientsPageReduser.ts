import {Reducer} from 'redux'
import {ClientsActionType, TAction} from '../actions/clientsPageActions'
import {IinitialClientForm} from '../components/newClientForm/newClientForm'
import {IPetFormValues} from '../components/newPetForm/newPetForm'


export interface IClient extends IinitialClientForm {
  
  pets: string[]
}

type IPet1 = Omit<IPetFormValues, 'ageYear'> 
export interface IPet extends Omit<IPet1, 'ageMonth'> {
  age: number
  visits: string[]
}

const initState = {
  showNewClientForm: false,
  showNewPetForm: false,
  showPetTypeOptions: false,
  showBreedOptions: false,
  IsFetching: false,
  clientEditing: false,
  petEditing: false,
  loggedIn: false,
  selectedPetType: '',
  currentClient: '',
  currentPet: '',
  clients: {} as {[index: string]: IClient},
  pets: {} as {[index: string]: IPet},
}

export type TElementsName = 'showNewClientForm' | 'showNewPetForm' | 'showPetTypeOptions' | 'showBreedOptions'
  | 'IsFetching' | 'clientEditing' | 'petEditing' | 'loggedIn'

export type TClientsPageState = typeof initState

export const clientsPageReduser: Reducer<TClientsPageState, TAction> = (state=initState, action) => {
  switch (action.type) {
    case ClientsActionType.SET_CLIENTS:
      return {...state, clients: action.pyload}
    case ClientsActionType.SET_CURRENT_CLIENT:
      return {...state, currentClient: action.pyload, clientEditing: false}
    case ClientsActionType.SHOW_ELEMENT:
      return {...state, [action.pyload.element]: action.pyload.state}
    case ClientsActionType.SELECTED_PET_TYPE:
      return {...state, selectedPetType: action.pyload}
    case ClientsActionType.SET_PETS:
      return {...state, pets: action.pyload}
    case ClientsActionType.SET_CURRENT_PET:
      return {...state, currentPet: action.pyload}
    default:
      return state
  }
}