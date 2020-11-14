import React from 'react'
import stls from './editor.module.scss'
import {EditorState} from 'draft-js'
import {TwoStateButton} from '../twoStateButton/twoStateButton'
import {centered, leftAligned, rightAligned, justify} from './svgImg'

type localState = {
  [index: string]: {symbol: string | JSX.Element, active: string, tooltip: string}
}

type Props = {
  currentEditor: EditorState,
  pressHeandlers: {[index: string]: any},
}

export const TextAlignmentButtins: React.FC<Props> = ({currentEditor, pressHeandlers}) => {
  const buttonData: localState = {
    left: {symbol: leftAligned, active: 'textLeft', tooltip: 'по левому краю'},
    center: {symbol: centered, active: 'textCenter', tooltip: 'по центру'},
    right: {symbol: rightAligned, active: 'textRight', tooltip: 'по правому краю'},
    justify: {symbol: justify, active: 'textJustify', tooltip: 'по ширине'},
  }
  const activeCheck = (eState: EditorState) => {
    const key = eState.getSelection().getStartKey()
    return eState.getCurrentContent().getBlockForKey(key).getData().get('textAlign')
  }
  return (
    <div className={stls.fonts}>
      <div className={stls.text}>Выравнивание</div>
        {Object.keys(buttonData).map(item => <TwoStateButton
          symbol={buttonData[item].symbol}
          active={buttonData[item].active === activeCheck(currentEditor)}
          pressHender={pressHeandlers[item]}
          key1={item} key={item}
          square={true} tooltip={buttonData[item].tooltip}
        />)}
    </div>
  )
}