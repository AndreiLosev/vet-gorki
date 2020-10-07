import React from 'react'
import stls from './editor.module.scss'
// import {} from 'draft-js'
import {FontButtons} from './fontButtins'
import {TextAlignmentButtins} from './textAlignmentButtons'
import {ListButtons} from './listButtons'
import {ColorButtons} from './colorButtons'

type localState = {
  [index: string]: {symbol: string | JSX.Element, active: boolean, tooltip: string}
}

export const Editor = () => {
  return (
    <div className={stls.editorWrapper}>
      <div className={stls.toolBar}>
        <FontButtons />
        <ColorButtons />
        <TextAlignmentButtins />
        <ListButtons />
      </div>
      <div className={stls.editorTextarea}></div>
    </div>
  )
}
