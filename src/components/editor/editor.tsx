import React from 'react'
import stls from './editor.module.scss'
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import {useDispatchSelect} from '../../utilites/useDispatchSelect'
import {EditorActionCreater} from '../../actions/editorActions'
import {TEditorState} from '../../redusers/editorReduser'
import {FontButtons, UpperLowerIndex, FontSize} from './fontButtins'
import {TextAlignmentButtins} from './textAlignmentButtons'
import {ListButtons} from './listButtons'
import {ColorButtons, colors, backgroundColors} from './colorButtons'


interface IpartState {editor: TEditorState}

export const EditorConteiner = () => {
  const {partState: {editor}, dispatch} = useDispatchSelect((partSate: IpartState) => ({editor: partSate.editor}))
  const nextEditorState = (editorState: EditorState) => dispatch(EditorActionCreater.createUpdatePage(editorState))
  const editorRef = React.useRef<any>(null)
  const handleKeyCommand = (command: any) => {
    const newState = RichUtils.handleKeyCommand(editor[editor.activeEditor], command);
    if (newState) {
      nextEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  return (
    <div className={stls.editorWrapper}>
      <div className={stls.toolBar}>
        <FontButtons currentEditor={editor[editor.activeEditor]} dispatch={dispatch} />
        <ColorButtons currentEditor={editor[editor.activeEditor]} dispatch={dispatch} />
        <TextAlignmentButtins />
        <ListButtons />
      </div>
      <div className={stls.editorTextarea} onClick={() => {
        if (editorRef.current) editorRef.current.focus()
      }}>
        <Editor
          editorState={editor[editor.activeEditor]}
          handleKeyCommand={handleKeyCommand}
          onChange={nextEditorState}
          customStyleMap={{...UpperLowerIndex, ...FontSize, ...backgroundColors, ...colors}}
          ref={editorRef}
        />
      </div>
    </div>
  )
}
