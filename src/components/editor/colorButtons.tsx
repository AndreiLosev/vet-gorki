import React from 'react'
import stls from './editor.module.scss'
import {Dispatch} from 'redux';
import {EditorState} from 'draft-js'
import {EditorActionCreater} from '../../actions/editorActions'
import {EditorUtils} from '../../utilites/editorUtils'
import {ManyStateButton} from '../manyStateButton/manyStateButton'

type localState = {
  [index: string]: {
    symbol: string | JSX.Element,
    currentOption: {[x: string]: string},
    responsiveStyle: "text" | "color" | "bacground",
    option: Array<[string, {[x: string]: string}]>,
    pressHender: (arg1?: any, arg2?: any) => void,
  }
}

type Props = {
  currentEditor: EditorState,
  dispatch: Dispatch,
}

export const ColorButtons: React.FC<Props> = ({currentEditor, dispatch}) => {
  const currentColor = EditorUtils.findXorStyle(/color/, currentEditor)
  const currentBColor = EditorUtils.findXorStyle(/bcolor/, currentEditor)
  const buttonData: localState = {
    bacground: {
      symbol: 'A', responsiveStyle: 'bacground', option: Object.entries(backgroundColors),
      currentOption: backgroundColors[currentBColor] ? backgroundColors[currentBColor] : {backgroundColor: '#fff'},
      pressHender: (style: string) =>
        dispatch(EditorActionCreater.createSetXorStyle(style, Object.keys(backgroundColors)))
    },
    color: {
      symbol: 'A', responsiveStyle: "color", option: Object.entries(colors),
      currentOption: colors[currentColor] ? colors[currentColor] : {backgroundColor: '#fff'},
      pressHender: (style: string) =>
        dispatch(EditorActionCreater.createSetXorStyle(style, Object.keys(colors)))
    },
  }

  return (
    <div className={stls.fonts}>
      <div className={stls.text}>Цвет</div>
      {Object.keys(buttonData).map(item => <ManyStateButton
        symbol={buttonData[item].symbol}
        currentOption={buttonData[item].currentOption}
        pressHender={buttonData[item].pressHender}
        key={item} responsiveStyle={buttonData[item].responsiveStyle}
        options={buttonData[item].option}
      />)}
    </div>
  )
}
export const backgroundColors: {[x: string]: {[x: string]: string}} = {
  bcolorf44336: { backgroundColor: '#f44336' },
  bcolore91e63: { backgroundColor: '#e91e63' },
  bcolor9c27b0: { backgroundColor: '#9c27b0' },
  bcolor673ab7: { backgroundColor: '#673ab7' },
  bcolor3f51b5: { backgroundColor: '#3f51b5' },
  bcolor2196f3: { backgroundColor: '#2196f3' },
  bcolor03a9f4: { backgroundColor: '#03a9f4' },
  bcolor00bcd4: { backgroundColor: '#00bcd4' },
  bcolor009688: { backgroundColor: '#009688' },
  bcolor4caf50: { backgroundColor: '#4caf50' },
  bcolorcddc39: { backgroundColor: '#cddc39' },
  bcolorffeb3b: { backgroundColor: '#ffeb3b' },
  bcolorffc107: { backgroundColor: '#ffc107' },
  bcolorff9800: { backgroundColor: '#ff9800' },
  bcolorfff: { backgroundColor: '#fff' },
  bcolor000: { backgroundColor: '#000' },
}

export const colors: {[x: string]: {[x: string]: string}} = {
  colorf44336: { color: '#f44336' },
  colore91e63: { color: '#e91e63' },
  color9c27b0: { color: '#9c27b0' },
  color673ab7: { color: '#673ab7' },
  color3f51b5: { color: '#3f51b5' },
  color2196f3: { color: '#2196f3' },
  color03a9f4: { color: '#03a9f4' },
  color00bcd4: { color: '#00bcd4' },
  color009688: { color: '#009688' },
  color4caf50: { color: '#4caf50' },
  colorcddc39: { color: '#cddc39' },
  colorffeb3b: { color: '#ffeb3b' },
  colorffc107: { color: '#ffc107' },
  colorff9800: { color: '#ff9800' },
  colorfff: { color: '#fff' },
  color000: { color: '#000' },
}
