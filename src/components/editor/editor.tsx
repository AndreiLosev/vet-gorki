import React from 'react'
import stls from './editor.module.scss'
import {TwoStateButton} from '../twoStateButton/twoStateButton'
import {TwoStateButtonWithOption} from '../twoStateButtonWithOption/twoStateButtonWithOption'
import {inWidth, centered, leftAligned, rightAligned, numberedList, markingList} from './svgImg'

type localState = {
  [index: string]: {symbol: string | JSX.Element, active: boolean, tooltip: string}
}

export const Editor = () => {
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
  const [list, setList] = React.useState({
    markingList: {symbol: markingList, active: false, tooltip: 'маркировочный'},
    numberedList: {symbol: numberedList, active: false, tooltip: 'нумеровочный'},
  } as localState)
  const switchList = (key: string) => setList(prev => {
    prev[key].active = !prev[key].active
    return {...prev}
  })
  const [color, setColor] = React.useState({
    bacground: {symbol: 'A', active: false, tooltip: '#fff'},
    font: {symbol: 'A', active: false, tooltip: '#000'},
  } as localState)
  const switchColor = (key: string) => setColor(prev => {
    prev[key].active = !prev[key].active
    return {...prev}
  })
  return (
    <div className={stls.editorWrapper}>
      <div className={stls.toolBar}>
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
        <div className={stls.fonts}>
          <div className={stls.text}>Цвет</div>
          {Object.keys(color).map(item => <TwoStateButtonWithOption
            symbol={color[item].symbol}
            active={color[item].active}
            pressHender={switchColor}
            key1={item} key={item} initColor={color[item].tooltip}
            square={true}
          />)}
        </div>
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
        <div className={stls.fonts}>
          <div className={stls.text}>Списки</div>
          {Object.keys(list).map(item => <TwoStateButton
            symbol={list[item].symbol}
            active={list[item].active}
            pressHender={switchList}
            key1={item} key={item}
            square={true} tooltip={list[item].tooltip}
          />)}
        </div>
      </div>
      <div className={stls.editorTextarea}></div>
    </div>
  )
}
