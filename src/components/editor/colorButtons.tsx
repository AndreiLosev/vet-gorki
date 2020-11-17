import React from 'react'
import stls from './editor.module.scss'
import {EditorState} from 'draft-js'
import {EditorUtils} from '../../utilites/editorUtils'
import {ManyStateButton} from '../manyStateButton/manyStateButton'

type localState = {
  [index: string]: {
    symbol: string | JSX.Element,
    currentOption: {[x: string]: string},
    responsiveStyle: "text" | "color" | "bacground",
    option: Array<[string, {[x: string]: string}]>,
  }
}

type Props = {
  currentEditor: EditorState,
  pressHeandlers: {[index: string]: any},
}

export const ColorButtons: React.FC<Props> = ({currentEditor, pressHeandlers}) => {
  const currentColor = EditorUtils.findXorStyle(/color/, currentEditor)
  const currentBColor = EditorUtils.findXorStyle(/bacground/, currentEditor)
  const buttonData: localState = {
    bacground: {
      symbol: 'A', responsiveStyle: 'bacground', option: Object.entries(backgroundColors),
      currentOption: backgroundColors[currentBColor] ? backgroundColors[currentBColor] : {backgroundColor: '#fff'},
    },
    color: {
      symbol: 'A', responsiveStyle: "color", option: Object.entries(colors),
      currentOption: colors[currentColor] ? colors[currentColor] : {backgroundColor: '#fff'},
    },
  }

  return (
    <div className={stls.fonts}>
      <div className={stls.text}>Цвет</div>
      {Object.keys(buttonData).map(item => <ManyStateButton
        symbol={buttonData[item].symbol}
        currentOption={buttonData[item].currentOption}
        pressHender={pressHeandlers[item]}
        key={item} responsiveStyle={buttonData[item].responsiveStyle}
        options={buttonData[item].option}
      />)}
    </div>
  )
}
export const backgroundColors: {[x: string]: {[x: string]: string}} = {
  bacgroundf44336: { backgroundColor: '#f44336' },
  bacgrounde91e63: { backgroundColor: '#e91e63' },
  bacground9c27b0: { backgroundColor: '#9c27b0' },
  bacground673ab7: { backgroundColor: '#673ab7' },
  bacground3f51b5: { backgroundColor: '#3f51b5' },
  bacground2196f3: { backgroundColor: '#2196f3' },
  bacground03a9f4: { backgroundColor: '#03a9f4' },
  bacground00bcd4: { backgroundColor: '#00bcd4' },
  bacground009688: { backgroundColor: '#009688' },
  bacground4caf50: { backgroundColor: '#4caf50' },
  bacgroundcddc39: { backgroundColor: '#cddc39' },
  bacgroundffeb3b: { backgroundColor: '#ffeb3b' },
  bacgroundffc107: { backgroundColor: '#ffc107' },
  bacgroundff9800: { backgroundColor: '#ff9800' },
  bacgroundfff: { backgroundColor: '#fff' },
  bacground000: { backgroundColor: '#000' },
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
