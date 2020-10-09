import React from 'react'
import stls from './editor.module.scss'
import {TwoStateButton} from '../twoStateButton/twoStateButton'
import {useDispatchSelect} from '../../utilites/useDispatchSelect'
import {TEditorState} from '../../redusers/editorReduser'
import {EditorActionCreater} from '../../actions/editorActions'
// import {TSimpleStyle} from '../../utilites/editorUtils'

type localState = {[index: string]: {symbol: string | JSX.Element, tooltip: string, activation: any}}

interface IpartState {editor: TEditorState}

export const FontButtons = () => {
  const {partState: {editor}, dispatch} = useDispatchSelect((partSate: IpartState) => ({editor: partSate.editor}))
  const switchStyle = (style: string, callback: any, styleList?: string[]) =>
  (_: any, e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(callback(style, styleList))
  }
  const font = {
    BOLD:
      {
        symbol: <strong>B</strong>,
        tooltip: 'жирный',
        activation: switchStyle('BOLD', EditorActionCreater.createSetSimbleStyle)
      },
    ITALIC:
      {
        symbol: <i>I</i>,
        tooltip: 'курсив',
        activation: switchStyle('ITALIC', EditorActionCreater.createSetSimbleStyle)
      },
    UNDERLINE:
      {
        symbol: <u>U</u>,
        tooltip: 'подчёркнутый',
        activation: switchStyle('UNDERLINE', EditorActionCreater.createSetSimbleStyle)
      },
    UPPERINDEX:
      {
        symbol: <span>A&#178;</span>,
        tooltip: 'верхний индекс',
        activation: switchStyle('UPPERINDEX', EditorActionCreater.createSetXorStyle, Object.keys(UpperLowerIndex))
      },
    LOWERINDEX:
      {
        symbol: <span>A&#7530;</span>,
        tooltip: 'нижний индекс',
        activation: switchStyle('LOWERINDEX', EditorActionCreater.createSetXorStyle, Object.keys(UpperLowerIndex))
      },
  } as localState
  return (
    <div className={stls.fonts}>
      <div className={stls.text}>Шрифт</div>
        <input className={stls.fontSize} type="number" defaultValue="8" min="0" />
          {Object.keys(font).map(item => <TwoStateButton
            symbol={font[item].symbol}
            active={editor[editor.activeEditor].getCurrentInlineStyle().has(item)}
            pressHender={font[item].activation}
            key1={item} key={item}
            square={true} tooltip={font[item].tooltip}
          />)}
    </div>
  )
}

export const UpperLowerIndex = {
  UPPERINDEX: { verticalAlign: 'super'},
  LOWERINDEX: { verticalAlign: 'sub' },
}