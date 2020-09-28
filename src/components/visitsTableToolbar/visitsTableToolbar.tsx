import React from 'react'
import stls from './visitsTableToolbar.module.scss'
import {SquareButton} from '../squareButton/squareButton'


export const VisitsTableToolbar = () => {
  return (
    <div className={stls.buttonWrap}>
        <SquareButton color="green" symbol="+" size="size1" tooltip="Добавить новую запись"
          pressHeadnler={() => null}
        />
        <SquareButton color="green" symbol="&#9997;" size="size1" tooltip="Редактировать выбраную запись"
          pressHeadnler={() => null}
        />
        <SquareButton color="green" symbol="&#215;" size="size1" tooltip="Удалить выбраную запись"
          pressHeadnler={() => null}
        />
    </div>
  )
}
