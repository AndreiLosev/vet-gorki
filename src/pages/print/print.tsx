import React from 'react'
import './print.scss'
import {Editor, EditorState} from 'draft-js'
import {useDispatchSelect} from '../../utilites/useDispatchSelect'
import {colors, backgroundColors} from '../../components/editor/colorButtons'
import {FontSize, UpperLowerIndex} from '../../components/editor/fontButtins'
import {} from '../../components/editor/listButtons'


interface IpartState {
  petCardPage: {
    print: EditorState,
  },
}

export const Print: React.FC<{}> = () => {
  const {partState: {print}} = useDispatchSelect((partState: IpartState) => ({
    print: partState.petCardPage.print
  }))
  const [edit, setEdit] = React.useState(EditorState.createEmpty())
  React.useEffect(() => {
    setEdit(print)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="printConteiner">
      <Editor
        editorState={edit} onChange={setEdit}
        customStyleMap={{...UpperLowerIndex, ...FontSize, ...backgroundColors, ...colors}}
      />
    </div>
  )
}
