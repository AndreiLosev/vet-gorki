import React from 'react'
import stls from './editor.module.scss'
import {TwoStateButton} from '../twoStateButton/twoStateButton'
import {numberedList, markingList} from './svgImg'

type localState = {
  [index: string]: {
    symbol: string | JSX.Element,
    active: 'unordered-list-item' | 'ordered-list-item',
    tooltip: string,
  },
}

type Props = {
  currentStyle: string,
  pressHeandlers: {[index: string]: any},
}

export const ListButtons: React.FC<Props> = ({currentStyle, pressHeandlers}) => {
  const buttonData: localState = {
    markingList: {symbol: markingList, active: 'unordered-list-item', tooltip: 'маркировочный'},
    numberedList: {symbol: numberedList, active: 'ordered-list-item', tooltip: 'нумеровочный'},
  }
  return (
    <div className={stls.fonts}>
      <div className={stls.text}>Списки</div>
      {Object.keys(buttonData).map(item => <TwoStateButton
        symbol={buttonData[item].symbol}
        active={buttonData[item].active === currentStyle}
        pressHender={pressHeandlers[item]()}
        key1={buttonData[item].active} key={item}
        square={true} tooltip={buttonData[item].tooltip}
      />)}
    </div>
  )
}
