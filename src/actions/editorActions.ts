import {EditorState} from 'draft-js'
import {TSimpleStyle} from '../utilites/editorUtils'

export class EditorActionType {
  static SET_PAGE = 'SET_PAGE' as const
  static UPDATE_PAGE = 'UPDATE_PAGE' as const
  static SET_SIMPLE_STYLE = 'SET_SIMPLE_STYLE' as const
  static SET_XOR_STYLE = 'SET_XOR_STYLE' as const
  static SET_FONT_SIZE = 'SET_FONT_SIZE' as const
}

export class EditorActionCreater {
  static createSetPage = (pageName: 'description' | 'recommendations' | 'vaccinations' | 'history') => {
    return {type: EditorActionType.SET_PAGE, pyload: pageName}
  }

  static createUpdatePage = (newEditorState: EditorState) => {
    return {type: EditorActionType.UPDATE_PAGE, pyload: newEditorState}
  }

  static createSetSimbleStyle = (command: TSimpleStyle) => {
    return {type: EditorActionType.SET_SIMPLE_STYLE, pyload: command}
  }
  static createSetXorStyle = (command: string, commandList: string[]) => {
    return {type: EditorActionType.SET_XOR_STYLE, pyload: {command, commandList}}
  }

  static createSetFontSize = (size: number) => ({type: EditorActionType.SET_FONT_SIZE, pyload: size})
}

export type TAction =
  | ReturnType<typeof EditorActionCreater.createSetPage>
  | ReturnType<typeof EditorActionCreater.createUpdatePage>
  | ReturnType<typeof EditorActionCreater.createSetSimbleStyle>
  | ReturnType<typeof EditorActionCreater.createSetXorStyle>
  | ReturnType<typeof EditorActionCreater.createSetFontSize>