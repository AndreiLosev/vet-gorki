import {Reducer} from 'redux'
import {EditorState} from 'draft-js'
import {EditorActionType, TAction} from '../actions/editorActions'
import {EditorUtils} from '../utilites/editorUtils'

export type TEditorNames = 'description' | 'recommendations' | 'vaccinations' | 'history'
export type TShortData = {
  date: string,
  weight: string,
  temperature: string,
  diagnosis: string,
  goalOfRequest: string,
  visitResult: string,
  age: string,
  doctor: string,
}

const initState = {
  description: EditorState.createEmpty(),
  recommendations: EditorState.createEmpty(),
  vaccinations: EditorState.createEmpty(),
  history: EditorState.createEmpty(),
  activeEditor: 'description' as TEditorNames,
  shortData: {
    date: '',
    weight: '',
    temperature: '',
    diagnosis: '',
    goalOfRequest: '',
    visitResult: '',
    age: '',
    doctor: '',
  } as TShortData,
}

export type TEditorState = typeof initState

export const editorReduser: Reducer<TEditorState, TAction> = (state=initState, action) => {
  switch (action.type) {
    case EditorActionType.SET_PAGE:
      return {...state, activeEditor: action.pyload}
    case EditorActionType.UPDATE_PAGE:
      return {...state, [state.activeEditor]: action.pyload}
    case EditorActionType.UPDATE_THIS_PAGE:
      return {...state, [action.pyload.page]: action.pyload.newEditorState}
    case EditorActionType.SET_SIMPLE_STYLE:
      return {...state, [state.activeEditor]: EditorUtils.onSimpleStyle(action.pyload, state[state.activeEditor])}
    case EditorActionType.SET_XOR_STYLE:
      return {
        ...state,
        [state.activeEditor]: EditorUtils.onXorStyle(
          action.pyload.command,
          action.pyload.commandList,
          state[state.activeEditor]
        ),
      }
    case EditorActionType.SET_BLOCK_STYLE:
      return {...state, [state.activeEditor]: EditorUtils.onBlockStyle(action.pyload, state[state.activeEditor])}
    case EditorActionType.SET_METADATA_FOR_BLOCK:
      return {...state, [state.activeEditor]: EditorUtils.setBlockMetaData(action.pyload, state[state.activeEditor])}
    case EditorActionType.SET_SHORT_DATA:
      return {...state, shortData: {...state.shortData, [action.pyload.fild]: action.pyload.value}}
    case EditorActionType.LOAD_EDITORS_FROM_RAW:
      return {...action.pyload}
    default:
      return state
  }
}

