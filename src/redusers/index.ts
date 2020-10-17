import {combineReducers, AnyAction} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {clientsPageReduser} from './clientsPageReduser'
import {editorReduser} from './editorReduser'
import {staticDataReduser} from './staticDataReduser'
import {petCardPageReduser} from './petCardPageReduser'

export const rootReduser = combineReducers({
  clientsPage: clientsPageReduser,
  editor: editorReduser,
  staticData:staticDataReduser,
  petCardPage: petCardPageReduser,
})

export type TState = ReturnType<typeof rootReduser>

export type AppAction = ThunkAction<void, TState, never, AnyAction>
