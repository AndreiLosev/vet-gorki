import {combineReducers} from 'redux'
import {clientsPageReduser} from './clientsPageReduser'

export const rootReduser = combineReducers({
  clientsPage: clientsPageReduser,
})

export type TState = ReturnType<typeof rootReduser> 