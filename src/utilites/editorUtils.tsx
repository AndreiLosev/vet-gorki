import {RichUtils, EditorState} from 'draft-js'

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
}