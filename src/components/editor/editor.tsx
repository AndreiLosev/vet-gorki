import React from 'react'
import stls from './editor.module.scss'
import cn from 'classnames'
import {Editor, EditorState, RichUtils, ContentBlock} from 'draft-js';
import 'draft-js/dist/Draft.css';
import {EditorUtils} from '../../utilites/editorUtils'
import {useDispatchSelect} from '../../utilites/useDispatchSelect'
import {EditorActionCreater} from '../../actions/editorActions'
import {PetCardsActionCreater} from '../../actions/petCardActions'
import {TEditorState} from '../../redusers/editorReduser'
import {FontButtons, UpperLowerIndex, FontSize} from './fontButtins'
import {TextAlignmentButtins} from './textAlignmentButtons'
import {ListButtons} from './listButtons'
import {ColorButtons, colors, backgroundColors} from './colorButtons'


interface IpartState {editor: TEditorState}

export const EditorConteiner = () => {
  const {partState: {editor, }, dispatch} = useDispatchSelect((partSate: IpartState) => ({editor: partSate.editor}))
  const nextEditorState = (editorState: EditorState) => dispatch(EditorActionCreater.createUpdatePage(editorState))
  const editorRef = React.useRef<any>(null)
  React.useEffect(() => { dispatch(PetCardsActionCreater.createSetBoolData('saved', false)) }, [editor, dispatch])
  React.useEffect(() => {
    const text = editor[editor.activeEditor].getCurrentContent().getPlainText('')
    const currentFontSize = EditorUtils.findXorStyle(/FONT_SIZE/, editor[editor.activeEditor])
    if (!text && !currentFontSize)
      dispatch(EditorActionCreater.createSetXorStyle('FONT_SIZE_14', Object.keys(FontSize)))
  }, [dispatch, editor])
  const handleKeyCommand = (command: any) => {
    const newState = RichUtils.handleKeyCommand(editor[editor.activeEditor], command);
    if (newState) {
      nextEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  const selection = editor[editor.activeEditor].getSelection();
  const currentBlockStyle = editor[editor.activeEditor].getCurrentContent()
    .getBlockForKey(selection.getStartKey()).getType()
  return (
    <div className={stls.editorWrapper}>
      <div className={stls.toolBar}>
        <FontButtons currentEditor={editor[editor.activeEditor]} pressHeandlers={{
          BOLD: EditorUtils.switchStyle('BOLD', EditorActionCreater.createSetSimbleStyle, dispatch),
          ITALIC: EditorUtils.switchStyle('ITALIC', EditorActionCreater.createSetSimbleStyle, dispatch),
          UNDERLINE: EditorUtils.switchStyle('UNDERLINE', EditorActionCreater.createSetSimbleStyle, dispatch),
          UPPERINDEX: EditorUtils.switchStyle(
            'UPPERINDEX', EditorActionCreater.createSetXorStyle, dispatch, Object.keys(UpperLowerIndex),
          ),
          LOWERINDEX: EditorUtils.switchStyle(
            'LOWERINDEX', EditorActionCreater.createSetXorStyle, dispatch,  Object.keys(UpperLowerIndex),
          ),
          fontSize: (style: string) => dispatch(EditorActionCreater.createSetXorStyle(style, Object.keys(FontSize)))
        }}
        />
        <ColorButtons currentEditor={editor[editor.activeEditor]} dispatch={dispatch} />
        <TextAlignmentButtins currentEditor={editor[editor.activeEditor]} pressHeandlers={
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
      <div className={stls.buffer} />
      <div className={cn(stls.editorTextarea, 'scrol')} onClick={() => {
        if (editorRef.current) editorRef.current.focus()
      }}>
        <Editor
          editorState={editor[editor.activeEditor]}
          handleKeyCommand={handleKeyCommand}
          onChange={nextEditorState}
          customStyleMap={{...UpperLowerIndex, ...FontSize, ...backgroundColors, ...colors}}
          ref={editorRef}
          readOnly={editor.activeEditor === 'history'}
          blockStyleFn={(block: ContentBlock) => {
            if (block.getType() === 'unordered-list-item' || block.getType() === 'ordered-list-item') {
              const fontSizeClass = block.getInlineStyleAt(0)
              .toArray().filter(item => item ? item.match(/FONT_SIZE/) : false)[0]
              console.log(fontSizeClass)
              return fontSizeClass ? stls[fontSizeClass] : ''
            } else return ''
          }}
        />
      </div>
      <div className={stls.buffer} />
    </div>
  )
}
