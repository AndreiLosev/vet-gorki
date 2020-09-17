import React from 'react'
import './clientsTable.scss'
import cn from 'classnames'


export const ClientsTable = () => {
  return (
    <div className={cn('clientsTable')}>
      <div className={cn('row', 'header')}>
        <div>№</div>
        <div>ФИО</div>
        <div>Адрес</div>
        <div>Дата регистрации</div>
      </div>
      <div className="scrol">
        <div className={cn('row', 'body')}>
          <div>1</div>
          <div>Лосев Андрей Геннадьевич</div>
          <div>Якубовского 13-23</div>
          <div>11.09.2020</div>
        </div>
        <div className={cn('row', 'body')}>
          <div>2</div>
          <div>Лосев Андрей Геннадьевич</div>
          <div>Якубовского 13-23</div>
          <div>11.09.2020</div>
        </div>
        <div className={cn('row', 'body')}>
          <div>2</div>
          <div>Лосев Андрей Геннадьевич</div>
          <div>Якубовского 13-23</div>
          <div>11.09.2020</div>
        </div>
        <div className={cn('row', 'body')}>
          <div>2</div>
          <div>Лосев Андрей Геннадьевич</div>
          <div>Якубовского 13-23</div>
          <div>11.09.2020</div>
        </div>
        <div className={cn('row', 'body')}>
          <div>2</div>
          <div>Лосев Андрей Геннадьевич</div>
          <div>Якубовского 13-23</div>
          <div>11.09.2020</div>
        </div>
        <div className={cn('row', 'body')}>
          <div>2</div>
          <div>Лосев Андрей Геннадьевич</div>
          <div>Якубовского 13-23</div>
          <div>11.09.2020</div>
        </div>
        <div className={cn('row', 'body')}>
          <div>2</div>
          <div>Лосев Андрей Геннадьевич</div>
          <div>Якубовского 13-23</div>
          <div>11.09.2020</div>
        </div>
        <div className={cn('row', 'body')}>
          <div>2</div>
          <div>Лосев Андрей Геннадьевич</div>
          <div>Якубовского 13-23</div>
          <div>11.09.2020</div>
        </div>
      </div>
    </div>
  )
}
