import React from 'react'
import stls from './editor.module.scss'
import {ManyStateButton} from '../manyStateButton/manyStateButton'

type localState = {
  [index: string]: {symbol: string | JSX.Element, active: boolean, tooltip: string}
}

export const ColorButtons = () => {
  const [color, setColor] = React.useState({
    bacground: {symbol: 'A', active: false, tooltip: '#fff'},
    color: {symbol: 'A', active: false, tooltip: '#000'},
  } as localState)
  const switchColor = (key: string) => setColor(prev => {
    prev[key].active = !prev[key].active
    return {...prev}
  })
  return (
    <div className={stls.fonts}>
      <div className={stls.text}>Цвет</div>
      {Object.keys(color).map(item => <ManyStateButton
        symbol={color[item].symbol}
        pressHender={switchColor}
        key={item} currentOption={{item: color[item].tooltip}}
        responsiveStyle={item === 'color' || item === 'bacground' ? item : 'bacground'}
        option={item === 'color' ? Object.entries(colors) : Object.entries(backgroundColors)}
      />)}
    </div>
  )
}

export const backgroundColors = {
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

export const colors = {
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
  colorff9800: { bcolor: '#ff9800' },
  colorfff: { color: '#fff' },
  color000: { color: '#000' },
}
