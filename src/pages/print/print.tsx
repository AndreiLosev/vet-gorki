import React from 'react'
import './print.scss'
import {Editor, EditorState} from 'draft-js'
import {useDispatchSelect} from '../../utilites/useDispatchSelect'
import {EditorUtils, TSimpleStyle} from '../../utilites/editorUtils'
import {colors, backgroundColors} from '../../components/editor/colorButtons'
import {FontSize, UpperLowerIndex, FontButtons} from '../../components/editor/fontButtins'


interface IpartState {
  petCardPage: {
    print: EditorState,
  },
}

type TAction =
  | {type: 'UPDATE_PAGE', pyload: EditorState}
  | {type: 'SET_SIMPLE_STYLE', pyload: TSimpleStyle}
  | {type: 'SET_XOR_STYLE', pyload: {
      command: string,
      commandList: string[],
  }}
  | {type: 'SET_BLOCK_STYLE', pyload: string}

const reduser = (state: EditorState, action: TAction): EditorState => {
  switch (action.type) {
    case 'UPDATE_PAGE':
      return action.pyload
    case 'SET_SIMPLE_STYLE':
      return EditorUtils.onSimpleStyle(action.pyload, state)
    case 'SET_XOR_STYLE':
      return EditorUtils.onXorStyle(action.pyload.command, action.pyload.commandList, state)
    case 'SET_BLOCK_STYLE':
      return EditorUtils.onBlockStyle(action.pyload, state)
    default:
      return state
  }
}

const createSetSimpleStyle = (style: TSimpleStyle) =>
  ({type: 'SET_SIMPLE_STYLE' as const, pyload: style})

const createSetXorStele = (command: string, commandList: string[]) =>
  ({type: 'SET_XOR_STYLE' as const, pyload: {command, commandList}})

export const Print: React.FC<{}> = () => {
  const {partState: {print}} = useDispatchSelect((partState: IpartState) => ({
    print: partState.petCardPage.print
  }))
  const [toPrint, dispatch] = React.useReducer(reduser, EditorState.createEmpty())
  React.useEffect(() => {
    dispatch({
      type: 'UPDATE_PAGE',
      pyload: print
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const editorOnChange = (edit: EditorState) => dispatch({
    type: 'UPDATE_PAGE',
    pyload: edit,
  })
  return (
    <>
      <div className="toolBar">
      <FontButtons currentEditor={toPrint} pressHeandlers={{
        BOLD: EditorUtils.switchStyle('BOLD', createSetSimpleStyle, dispatch),
        ITALIC: EditorUtils.switchStyle('ITALIC', createSetSimpleStyle, dispatch),
        UNDERLINE: EditorUtils.switchStyle('UNDERLINE', createSetSimpleStyle, dispatch),
        UPPERINDEX: EditorUtils.switchStyle('UPPERINDEX', createSetXorStele, dispatch, Object.keys(UpperLowerIndex)),
        LOWERINDEX: EditorUtils.switchStyle('LOWERINDEX', createSetXorStele, dispatch, Object.keys(UpperLowerIndex)),
        fontSize: (style: string) => dispatch(createSetXorStele(style, Object.keys(FontSize))),
      }}
      />
      </div>
      <div className="printConteiner">
        <Editor
          editorState={toPrint} onChange={editorOnChange}
          customStyleMap={{...UpperLowerIndex, ...FontSize, ...backgroundColors, ...colors}}
        />
      </div>
    </>
  )
}
