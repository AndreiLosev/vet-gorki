import React from 'react'
import stls from './clientsHeader.module.scss'
import {useDispatch} from 'react-redux'
import {SquareButton} from '../squareButton/squareButton'
import {ClientsActionCreater} from '../../actions/clientsPageActions'

export const ClientsHeader = () => {
  const dispatch = useDispatch()
  return (
    <header className={stls.tooolbar}>
      <SquareButton color="white" symbol="+" size="size2" tooltip="Создать нового клиента"
        pressHeadnler={() => dispatch(ClientsActionCreater.createShowNewClientForm(true))}
      />
      <SquareButton color="white" symbol="&#9997;" size="size2" tooltip="Редактировать выброного клиента"
        pressHeadnler={() => undefined}
      />
      <SquareButton color="white" symbol="&#215;" size="size2" tooltip="Удалить выброного клиента"
        pressHeadnler={() => undefined}
      />
      <SquareButton color="white" symbol="&#128199;" size="size2" tooltip="Печать"
        pressHeadnler={() => undefined}
      />
      <input className={stls.search} type="text" placeholder="ФИО, Адрес, Телефон" />
      <SquareButton color="white" symbol="&#128270;" size="size2" tooltip="Поиск"
        pressHeadnler={() => undefined}
      />
      <SquareButton color="white" symbol="+1" size="size2" tooltip="Добавить питомца клиенту"
        pressHeadnler={() => dispatch(ClientsActionCreater.createShowNewPetForm(true))}
      />
      <SquareButton color="white" symbol="&#9998;" size="size2" tooltip="Редактировать питомца клиенту"
        pressHeadnler={() => undefined}
      />
      <SquareButton color="white" symbol="-1" size="size2" tooltip="Удалить выброного питомца"
        pressHeadnler={() => undefined}
      />
    </header>
  )
}