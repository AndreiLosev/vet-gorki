import React from 'react'
import stls from './editor.module.scss'
import {TwoStateButton} from '../twoStateButton/twoStateButton'

type localState = {
  [index: string]: {symbol: string | JSX.Element, active: boolean, tooltip: string}
}

export const FontButtons = () => {
  const [font, setFont] = React.useState({
    bolt: {symbol: <strong>B</strong>, active: false, tooltip: 'жирный'},
    italics: {symbol: <i>I</i>, active: false, tooltip: 'курсив'},
    underlined: {symbol: <u>U</u>, active: false, tooltip: 'подчёркнутый'},
    power: {symbol: <span>A&#178;</span>, active: false, tooltip: 'верхний индекс'},
    index: {symbol: <span>A&#7530;</span>, active: false, tooltip: 'нижний индекс'},
  } as localState)
  const switchFont = (key: string) => setFont(prev => {
    prev[key].active = !prev[key].active
    return {...prev}
  })
  return (
    <div className={stls.fonts}>
      <div className={stls.text}>Шрифт</div>
        <input className={stls.fontSize} type="number" defaultValue="8" min="0" />
          {Object.keys(font).map(item => <TwoStateButton
            symbol={font[item].symbol}
            active={font[item].active}
            pressHender={switchFont}
            key1={item} key={item}
            square={true} tooltip={font[item].tooltip}
          />)}
    </div>
  )
}