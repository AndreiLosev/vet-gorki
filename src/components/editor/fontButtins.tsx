import React from 'react'
import stls from './editor.module.scss'
import {EditorState} from 'draft-js'
import {EditorUtils} from '../../utilites/editorUtils'
import {TwoStateButton} from '../twoStateButton/twoStateButton'
import {ManyStateButton} from '../manyStateButton/manyStateButton'

type localState = {[index: string]: {symbol: string | JSX.Element, tooltip: string, activation: any}}

type Props = {
  currentEditor: EditorState,
  pressHeandlers: {[index: string]: any},
}

export const FontButtons: React.FC<Props> = ({currentEditor, pressHeandlers}) => {
  const font: localState = {
    BOLD:{ symbol: <strong>B</strong>, tooltip: 'жирный', activation: pressHeandlers['BOLD'] },
    ITALIC: { symbol: <i>I</i>, tooltip: 'курсив', activation: pressHeandlers['ITALIC'] },
    UNDERLINE: { symbol: <u>U</u>, tooltip: 'подчёркнутый', activation: pressHeandlers['UNDERLINE'] },
    UPPERINDEX: { symbol: <span>A&#178;</span>, tooltip: 'верхний индекс', activation: pressHeandlers['UPPERINDEX'] },
    LOWERINDEX: { symbol: <span>A&#7530;</span>, tooltip: 'нижний индекс', activation: pressHeandlers['LOWERINDEX'] },
  }
  const currentFontSize = EditorUtils.findXorStyle(/FONT_SIZE/, currentEditor)
  return (
    <div className={stls.fonts}>
      <div className={stls.text}>Шрифт</div>
        <ManyStateButton
          currentOption={FontSize[currentFontSize] ? FontSize[currentFontSize]: {fontSize: '14px'}}
          responsiveStyle="text"
          options={Object.entries(FontSize)}
          pressHender={pressHeandlers['fontSize']}
        />
          {Object.keys(font).map(item => <TwoStateButton
            symbol={font[item].symbol}
            active={currentEditor.getCurrentInlineStyle().has(item)}
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

export const FontSize: {[x: string]: {[x: string]: string}} = {
  FONT_SIZE_10: {fontSize: '10px'},
  FONT_SIZE_12: {fontSize: '12px'},
  FONT_SIZE_14: {fontSize: '14px'},
  FONT_SIZE_16: {fontSize: '16px'},
  FONT_SIZE_18: {fontSize: '18px'},
  FONT_SIZE_20: {fontSize: '20px'},
  FONT_SIZE_22: {fontSize: '22px'},
  FONT_SIZE_24: {fontSize: '24px'},
  FONT_SIZE_26: {fontSize: '26px'},
  FONT_SIZE_28: {fontSize: '28px'},
  FONT_SIZE_30: {fontSize: '30px'},
  FONT_SIZE_32: {fontSize: '32px'},
  FONT_SIZE_34: {fontSize: '34px'},
  FONT_SIZE_36: {fontSize: '36px'},
  FONT_SIZE_38: {fontSize: '38px'},
  FONT_SIZE_40: {fontSize: '40px'},
}