import React from 'react'
import './print.scss'
import {Editor, EditorState} from 'draft-js'
import {useDispatchSelect} from '../../utilites/useDispatchSelect'
import {EditorUtils} from '../../utilites/editorUtils'
import {EditorActionCreater, TAction} from '../../actions/editorActions'
import {colors, backgroundColors, ColorButtons} from '../../components/editor/colorButtons'
import {FontSize, UpperLowerIndex, FontButtons} from '../../components/editor/fontButtins'
import {ListButtons} from '../../components/editor/listButtons'
import {TextAlignmentButtins} from '../../components/editor/textAlignmentButtons'
import {NavigatorContext} from '../../navigation'
import {SquareButton} from '../../components/squareButton/squareButton'


interface IpartState {
  petCardPage: {
    print: EditorState,
  },
}

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
    case 'SET_METADATA_FOR_BLOCK':
      return EditorUtils.setBlockMetaData(action.pyload, state)
    default:
      return state
  }
}

export const Print: React.FC<{}> = () => {
  const {partState: {print}} = useDispatchSelect((partState: IpartState) => ({
    print: partState.petCardPage.print
  }))
  const {goTo} = React.useContext(NavigatorContext)
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
  const selection = toPrint.getSelection();
  const currentBlockStyle = toPrint.getCurrentContent()
    .getBlockForKey(selection.getStartKey()).getType()
  return (
    <>
      <div className="toolBar">
        <div className='fonts'>
          <SquareButton color="green" symbol="&#8629;" size="size1" tooltip="Назад"
            pressHeadnler={() => goTo('petCart')}
          />
          <SquareButton color="green" symbol="&#128438;" size="size2" tooltip="Печать"
            pressHeadnler={() => window.print()}
          />
        </div>
        <FontButtons currentEditor={toPrint} pressHeandlers={{
          BOLD: EditorUtils.switchStyle('BOLD', EditorActionCreater.createSetSimbleStyle, dispatch),
          ITALIC: EditorUtils.switchStyle('ITALIC', EditorActionCreater.createSetSimbleStyle, dispatch),
          UNDERLINE: EditorUtils.switchStyle('UNDERLINE', EditorActionCreater.createSetSimbleStyle, dispatch),
          UPPERINDEX: EditorUtils.switchStyle(
            'UPPERINDEX', EditorActionCreater.createSetSimbleStyle, dispatch, Object.keys(UpperLowerIndex),
          ),
          LOWERINDEX: EditorUtils.switchStyle(
            'LOWERINDEX', EditorActionCreater.createSetSimbleStyle, dispatch, Object.keys(UpperLowerIndex),
          ),
          fontSize: (style: string) => dispatch(EditorActionCreater.createSetXorStyle(style, Object.keys(FontSize))),
        }}
        />
        <ColorButtons currentEditor={toPrint} pressHeandlers={{
            bacground: (style: string) =>
              dispatch(EditorActionCreater.createSetXorStyle(style, Object.keys(backgroundColors))),
            color: (style: string) =>
              dispatch(EditorActionCreater.createSetXorStyle(style, Object.keys(backgroundColors))),
          }} />
          <TextAlignmentButtins currentEditor={toPrint} pressHeandlers={
            Object.entries({ left: 'textLeft', center: 'textCenter', right: 'textRight', justify: 'textJustify' })
              .reduce((acc, item) => ({...acc, ...{[item[0]]: EditorUtils.switchStyle(
                {textAlign: item[1]}, EditorActionCreater.createSetMeataDataForBlock, dispatch
              )}}), {})
          }
          />
          <ListButtons currentStyle={currentBlockStyle} pressHeandlers={{
            markingList: () => EditorUtils.switchStyle(
              'unordered-list-item', EditorActionCreater.createSetBlockStyle, dispatch,
            ),
            numberedList: () => EditorUtils.switchStyle(
              'ordered-list-item', EditorActionCreater.createSetBlockStyle, dispatch,
            ),
          }}/>
      </div>
      <div className="printConteiner">
        <Editor
          editorState={toPrint} onChange={editorOnChange}
          customStyleMap={{...UpperLowerIndex, ...FontSize, ...backgroundColors, ...colors}}
          blockStyleFn={EditorUtils.blockStyleFn(EditorUtils.blockFontSize, EditorUtils.blockTextAligen)}
        />
      </div>
    </>
  )
}
