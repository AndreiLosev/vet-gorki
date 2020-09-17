import React from 'react'
import './visitsTableToolbar.scss'
import cn from 'classnames'


export const VisitsTableToolbar = () => {
  return (
    <div className={cn('buttonWrap')}>
      <div aria-label="Добавить новую запись" data-microtip-position="bottom-right" role="tooltip">
        <input type="button" value="+" className={cn('visitsBtn')}/>
      </div>
      <div aria-label="Редактировать выбраную запись" data-microtip-position="bottom-right" role="tooltip">
        <input type="button" value="&#9997;" className={cn('visitsBtn')} />
      </div>
      <div aria-label="Удалить выбраную запись" data-microtip-position="bottom-right" role="tooltip">
        <input type="button" value="&#215;" className={cn('visitsBtn')} />
      </div>
    </div>
  )
}
