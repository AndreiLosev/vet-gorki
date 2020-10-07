import React from 'react'
import stls from './editor.module.scss'
import {TwoStateButton} from '../twoStateButton/twoStateButton'
import {inWidth, centered, leftAligned, rightAligned} from './svgImg'

type localState = {
  [index: string]: {symbol: string | JSX.Element, active: boolean, tooltip: string}
}

export const TextAlignmentButtins = () => {
  const [textAlignment, setTextAlignment] = React.useState({
    leftAligned: {symbol: leftAligned, active: true, tooltip: 'по левому краю'},
    centered: {symbol: centered, active: false, tooltip: 'по центру'},
    rightAligned: {symbol: rightAligned, active: false, tooltip: 'по правому краю'},
    inWidth: {symbol: inWidth, active: false, tooltip: 'по ширине'},
  } as localState)
  const switchTextAlignment = (key: string) => setTextAlignment(prev => {
    for (let index in prev) prev[index].active = false
    prev[key].active = !prev[key].active
    return {...prev}
  })
  return (
    <div className={stls.fonts}>
      <div className={stls.text}>Выравнивание</div>
        {Object.keys(textAlignment).map(item => <TwoStateButton
          symbol={textAlignment[item].symbol}
          active={textAlignment[item].active}
          pressHender={switchTextAlignment}
          key1={item} key={item}
          square={true} tooltip={textAlignment[item].tooltip}
        />)}
    </div>
  )
}