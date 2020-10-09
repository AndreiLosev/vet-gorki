import {combineReducers} from 'redux'
import {clientsPageReduser} from './clientsPageReduser'
import {editorReduser} from './editorReduser'

export const rootReduser = combineReducers({
  clientsPage: clientsPageReduser,
  editor: editorReduser,
})

export type TState = ReturnType<typeof rootReduser>