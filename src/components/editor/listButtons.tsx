import React from 'react'
import stls from './editor.module.scss'
import {TwoStateButton} from '../twoStateButton/twoStateButton'
import {numberedList, markingList} from './svgImg'

type localState = {
  [index: string]: {symbol: string | JSX.Element, active: boolean, tooltip: string}
}

export const ListButtons = () => {
  const [list, setList] = React.useState({
    markingList: {symbol: markingList, active: false, tooltip: 'маркировочный'},
    numberedList: {symbol: numberedList, active: false, tooltip: 'нумеровочный'},
  } as localState)
  const switchList = (key: string) => setList(prev => {
    prev[key].active = !prev[key].active
    return {...prev}
  })
  return (
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
  )
}
