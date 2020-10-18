import React from 'react'
import './visitsTable.scss'
import cn from 'classnames'


export const VisitsTable = () => {
  return (
    <div className={cn('visitsTable')}>
      <div className={cn('row', 'header')}>
        <div>№</div>
        <div>Кличка</div>
        <div>Вид</div>
        <div>Порода</div>
        <div>Пол</div>
        <div>Возрасclientsт</div>
        <div>Вес</div>
        <div>Темпе<wbr />ратура</div>
        <div>Дата посещения</div>
      </div>
      <div className="scrol">
        <div className={cn('row', 'body')}>
          <div>1</div>
          <div>Труша</div>
          <div>Хомяк</div>
          <div>домашний хомяк</div>
          <div>Ж</div>
          <div>1,5</div>
          <div>0,35</div>
          <div>36,6</div>
          <div>11.09.2020</div>
        </div>
        <div className={cn('row', 'body')}>
          <div>1</div>
          <div>Труша</div>
          <div>Хомяк</div>
          <div>домашний хомяк</div>
          <div>Ж</div>
          <div>1,5</div>
          <div>0,35</div>
          <div>36,6</div>
          <div>11.09.2020</div>
        </div>
      </div>
    </div>
  )
}
