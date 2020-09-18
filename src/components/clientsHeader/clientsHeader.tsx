import React from 'react'
import './clientsHeader.scss'
import cn from 'classnames'
import {useDispatch} from 'react-redux'
import {ClientsActionCreater} from '../../actions/clientsPageActions'

export const ClientsHeader = () => {
  const dispatch = useDispatch()
  return (
    <header className={cn('tooolbar')}>
      <div className={cn('buttonWrapToollBar')}>
        <div aria-label="Создать нового клиента" data-microtip-position="bottom-right" role="tooltip">
          <input
            type="button" value="+"
            onClick={() => dispatch(ClientsActionCreater.createShowNewClientForm(true))}
          />
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
          <input
            type="button" value="+1"
            onClick={() => dispatch(ClientsActionCreater.createShowNewPetForm(true))}
          />
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