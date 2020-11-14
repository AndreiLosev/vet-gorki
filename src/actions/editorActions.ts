import {EditorState} from 'draft-js'
import {TSimpleStyle} from '../utilites/editorUtils'
import {TShortData, TEditorState} from '../redusers/editorReduser'

export type TShortDataKey = keyof TShortData

export class EditorActionType {
  static SET_PAGE = 'SET_PAGE' as const
  static UPDATE_PAGE = 'UPDATE_PAGE' as const
  static SET_SIMPLE_STYLE = 'SET_SIMPLE_STYLE' as const
  static SET_XOR_STYLE = 'SET_XOR_STYLE' as const
  static SET_BLOCK_STYLE = 'SET_BLOCK_STYLE' as const
  static SET_METADATA_FOR_BLOCK = 'SET_METADATA_FOR_BLOCK' as const
  static SET_SHORT_DATA = 'SET_SHORT_DATE' as const
  static LOAD_EDITORS_FROM_RAW = 'LOAD_EDITORS_FROM_RAW' as const
}

export class EditorActionCreater {
  static createSetPage = (pageName: 'description' | 'recommendations' | 'vaccinations' | 'history') =>
    ({ type: EditorActionType.SET_PAGE, pyload: pageName })

  static createUpdatePage = (newEditorState: EditorState) =>
    ({ type: EditorActionType.UPDATE_PAGE, pyload: newEditorState })

  static createSetSimbleStyle = (command: TSimpleStyle) =>
    ({ type: EditorActionType.SET_SIMPLE_STYLE, pyload: command })

  static createSetXorStyle = (command: string, commandList: string[]) =>
    ({ type: EditorActionType.SET_XOR_STYLE, pyload: {command, commandList} })

  static createSetBlockStyle = (command: string) =>
    ({ type: EditorActionType.SET_BLOCK_STYLE, pyload: command })

  static createSetShortData = (fild: TShortDataKey, value: string) =>
    ({ type: EditorActionType.SET_SHORT_DATA, pyload: { fild, value } })

  static createLoadEditorsfromRaw = (editor: TEditorState) =>
    ({type: EditorActionType.LOAD_EDITORS_FROM_RAW,  pyload: editor})

  static createSetMeataDataForBlock = (metaData: {[id: string]: string}) =>
    ({ type: EditorActionType.SET_METADATA_FOR_BLOCK, pyload: metaData })
}

export type TAction =
  | ReturnType<typeof EditorActionCreater.createSetPage>
  | ReturnType<typeof EditorActionCreater.createUpdatePage>
  | ReturnType<typeof EditorActionCreater.createSetSimbleStyle>
  | ReturnType<typeof EditorActionCreater.createSetXorStyle>
  | ReturnType<typeof EditorActionCreater.createSetBlockStyle>
  | ReturnType<typeof EditorActionCreater.createSetShortData>
  | ReturnType<typeof EditorActionCreater.createLoadEditorsfromRaw>
  | ReturnType<typeof EditorActionCreater.createSetMeataDataForBlock>
