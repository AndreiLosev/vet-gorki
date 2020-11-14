import {RichUtils, EditorState, ContentState, SelectionState, Modifier} from 'draft-js'
import {Map} from 'immutable'

export type TSimpleStyle = 'BOLD' | 'ITALIC' | 'UNDERLINE'

export class EditorUtils {
  static onSimpleStyle = (command: TSimpleStyle, editorState: EditorState): EditorState =>
    RichUtils.toggleInlineStyle(editorState, command)

  static onXorStyle = (command: string, commandList: string[], editorState: EditorState): EditorState => {
    const currentStyle = editorState.getCurrentInlineStyle().toArray()
    const oldStyle = currentStyle.filter(item => commandList.includes(item))[0]
    if (oldStyle !== command) {
      const oldEditorStateClear = RichUtils.toggleInlineStyle(editorState, oldStyle)
      return RichUtils.toggleInlineStyle(oldEditorStateClear, command)
    } else {
      return RichUtils.toggleInlineStyle(editorState, command)
    }
  }

  static onBlockStyle = (command: string, editorState: EditorState): EditorState =>
    RichUtils.toggleBlockType(editorState, command)

  static setBlockMetaData = (metaData: {[x: string]: string}, eState: EditorState) => {
    const newContentState = Modifier.mergeBlockData(eState.getCurrentContent(), eState.getSelection(), Map(metaData))
    return EditorState.createWithContent(newContentState)
  }

  static switchStyle = (style: any, callback: any, dispatch: any, styleList?: string[]) =>
    (_: any, e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(callback(style, styleList))
  }

  static findXorStyle = (template: RegExp, editorState: EditorState) => editorState
    .getCurrentInlineStyle().toArray().filter(item => item ? item.match(template) : false)[0]

  static contentBlockArrayFromText = (text: string, styles: string[]) => {
    const dateRaf = ContentState.createFromText(text)
    const selectionDateRaf = SelectionState.createEmpty('').merge({
      anchorKey: dateRaf.getFirstBlock().getKey(),
      anchorOffset: 0,
      focusOffset: dateRaf.getLastBlock().getText().length,
      focusKey: dateRaf.getLastBlock().getKey(),
    })
    return styles.reduce((acc, item) =>
      Modifier.applyInlineStyle(acc, selectionDateRaf, item),
      dateRaf)
      .getBlocksAsArray()
  }
}