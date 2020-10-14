import {combineReducers} from 'redux'
import {clientsPageReduser} from './clientsPageReduser'
import {editorReduser} from './editorReduser'
import {staticDataReduser} from './staticDataReduser'

export const rootReduser = combineReducers({
  clientsPage: clientsPageReduser,
  editor: editorReduser,
  staticData:staticDataReduser,
})

export type TState = ReturnType<typeof rootReduser>