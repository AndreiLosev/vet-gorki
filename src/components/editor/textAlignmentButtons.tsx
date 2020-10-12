import React from 'react'
import stls from './editor.module.scss'
import {Dispatch} from 'redux'
import {EditorUtils} from '../../utilites/editorUtils'
import {EditorActionCreater} from '../../actions/editorActions'
import {TwoStateButton} from '../twoStateButton/twoStateButton'
import {centered, leftAligned, rightAligned} from './svgImg'

type localState = {
  [index: string]: {symbol: string | JSX.Element, active: "left" | "right" | "center", tooltip: string}
}

type Props = {
  alignment: "left" | "right" | "center",
  dispatch: Dispatch,
}

export const TextAlignmentButtins: React.FC<Props> = ({alignment, dispatch}) => {
  const buttonData: localState = {
    leftAligned: {symbol: leftAligned, active: 'left', tooltip: 'по левому краю'},
    centered: {symbol: centered, active: 'center', tooltip: 'по центру'},
    rightAligned: {symbol: rightAligned, active: 'right', tooltip: 'по правому краю'},
  }
  return (
    <div className={stls.fonts}>
      <div className={stls.text}>Выравнивание</div>
        {Object.keys(buttonData).map(item => <TwoStateButton
          symbol={buttonData[item].symbol}
          active={buttonData[item].active === alignment}
          pressHender={EditorUtils.switchStyle(
            buttonData[item].active, EditorActionCreater.createSetAlignment, dispatch,
          )}
          key1={item} key={item}
          square={true} tooltip={buttonData[item].tooltip}
        />)}
    </div>
  )
}