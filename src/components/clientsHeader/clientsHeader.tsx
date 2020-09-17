import React from 'react'
import './clientsHeader.scss'
import cn from 'classnames'


export const ClientsHeader = () => {
  return (
    <header className={cn('tooolbar')}>
      <div className={cn('buttonWrapToollBar')}>
        <div aria-label="Создать нового клиента" data-microtip-position="bottom-right" role="tooltip">
          <input type="button" value="+" />
        </div>
        <div aria-label="Редактировать выброного клиента" data-microtip-position="bottom-right" role="tooltip">
          <input type="button" value="&#9997;" />
        </div>
        <div aria-label="Удалить выброного клиента" data-microtip-position="bottom-right" role="tooltip">
          <input type="button" value="&#215;" />
        </div>
        <div aria-label="Печать" data-microtip-position="bottom-right" role="tooltip">
          <input type="button" value="&#128438;" />
        </div>
        <input className={cn('search')} type="text" placeholder="ФИО, Адрес, Телефон" />
        <div aria-label="Поиск" data-microtip-position="bottom-right" role="tooltip">
          <input type="button" value="&#128270;" />
        </div>
        <div aria-label="Добавить питомца клиенту" data-microtip-position="bottom-right" role="tooltip">
          <input type="button" value="+1" />
        </div>
        <div aria-label="Редактировать питомца клиенту" data-microtip-position="bottom-right" role="tooltip">
          <input type="button" value="&#9998;" />
        </div>
        <div aria-label="Удалить выброного питомца" data-microtip-position="bottom-right" role="tooltip">
          <input type="button" value="-1" />
        </div>
      </div>
    </header>
  )
}