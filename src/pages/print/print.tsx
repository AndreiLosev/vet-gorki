import React from 'react'
import './print.scss'
import {Editor, EditorState} from 'draft-js'


export const Print: React.FC<{}> = () => {
  const [edit, setEdit] = React.useState(EditorState.createEmpty())
  return (
    <div className="printConteiner">
      <Editor editorState={edit} onChange={setEdit}/>
    </div>
  )
}
