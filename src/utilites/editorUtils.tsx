import {RichUtils, EditorState, Modifier} from 'draft-js'

export type TSimpleStyle = 'BOLD' | 'ITALIC' | 'UNDERLINE'
export type TIndexStyle = 'UPPERINDEX' | 'LOWERINDEX'

export class EditorUtils {
  static onSimpleStyle = (command: TSimpleStyle, editorState: EditorState): EditorState =>
    RichUtils.toggleInlineStyle(editorState, command)

  static onXorStyle = (command: TIndexStyle, commandList: TIndexStyle[], editorState: EditorState): EditorState => {
    const selection = editorState.getSelection();
    const nextContentState = commandList.reduce((contentState, item) => {
      return Modifier.removeInlineStyle(contentState, selection, item)
    }, editorState.getCurrentContent());
    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );
    const currentStyle = editorState.getCurrentInlineStyle();
    console.log(currentStyle.toString())
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, item) => {
        if (state && item) return RichUtils.toggleInlineStyle(state, item);
        throw new Error('Error in EditorUtils.onXorStyle')
      }, nextEditorState);
    }
    if (!currentStyle.has(command)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        command
      );
    }
    return nextEditorState
  }
}