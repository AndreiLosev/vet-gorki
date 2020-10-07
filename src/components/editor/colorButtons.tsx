import React from 'react'
import stls from './editor.module.scss'
import {ManyStateButton} from '../manyStateButton/manyStateButton'

type localState = {
  [index: string]: {symbol: string | JSX.Element, active: boolean, tooltip: string}
}

export const ColorButtons = () => {
  const [color, setColor] = React.useState({
    bacground: {symbol: 'A', active: false, tooltip: '#fff'},
    font: {symbol: 'A', active: false, tooltip: '#000'},
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
        active={color[item].active}
        pressHender={switchColor}
        key={item} initColor={color[item].tooltip}
        responsiveСolor={item === 'font' || item === 'bacground' ? item : 'bacground'}
      />)}
    </div>
  )
}
