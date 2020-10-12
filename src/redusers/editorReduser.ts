import {Reducer} from 'redux'
import {EditorState} from 'draft-js'
import {EditorActionType, TAction} from '../actions/editorActions'
import {EditorUtils} from '../utilites/editorUtils'

export type TEditorNames = 'description' | 'recommendations' | 'vaccinations' | 'history'

const initState = {
  description: EditorState.createEmpty(),
  recommendations: EditorState.createEmpty(),
  vaccinations: EditorState.createEmpty(),
  history: EditorState.createEmpty(),
  activeEditor: 'description' as TEditorNames,
  alignment: "left" as "right" | "left" | "center"
}

export type TEditorState = typeof initState

export const editorReduser: Reducer<TEditorState, TAction> = (state=initState, action) => {
  switch (action.type) {
    case EditorActionType.SET_PAGE:
      return {...state, activeEditor: action.pyload}
    case EditorActionType.UPDATE_PAGE:
      return {...state, [state.activeEditor]: action.pyload}
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
    case EditorActionType.SET_ALIGNMENT:
      return {...state, alignment: action.pyload}
    default:
      return state
  }
}

