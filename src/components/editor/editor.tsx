import React from 'react'
import stls from './editor.module.scss'
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import {useDispatchSelect} from '../../utilites/useDispatchSelect'
import {EditorActionCreater} from '../../actions/editorActions'
import {TEditorState} from '../../redusers/editorReduser'
import {FontButtons, UpperLowerIndex} from './fontButtins'
import {TextAlignmentButtins} from './textAlignmentButtons'
import {ListButtons} from './listButtons'
import {ColorButtons} from './colorButtons'


interface IpartState {editor: TEditorState}

export const EditorConteiner = () => {
  const {partState: {editor}, dispatch} = useDispatchSelect((partSate: IpartState) => ({editor: partSate.editor}))
  const nextEditorState = (editorState: EditorState) => dispatch(EditorActionCreater.createUpdatePage(editorState))
  const editorRef = React.useRef<any>(null)
  return (
    <div className={stls.editorWrapper}>
      <div className={stls.toolBar}>
        <FontButtons />
        <ColorButtons />
        <TextAlignmentButtins />
        <ListButtons />
      </div>
      <div className={stls.editorTextarea} onClick={() => editorRef.current ? editorRef.current.focus() : null }>
        <Editor
          editorState={editor[editor.activeEditor]}
          onChange={nextEditorState}
          customStyleMap={UpperLowerIndex}
          ref={editorRef}
        />
      </div>
    </div>
  )
}
