import React from 'react'
import './petsTable.scss'
import cn from 'classnames'


export const PetsTable = () => {
  return (
    <div className={cn('petsTable')}>
      <div className={cn('row', 'header')}>
        <div>№</div>
        <div>Кличка</div>
        <div>Вид</div>
        <div>Порода</div>
        <div>Пол</div>
      </div>
      <div className="scrol">
        <div className={cn('row', 'body')}>
          <div>1</div>
          <div>Ватрушка</div>
          <div>Хомяк</div>
          <div>Хомяк домашний</div>
          <div>Ж</div>
        </div>
      </div>
    </div>
  )
}
