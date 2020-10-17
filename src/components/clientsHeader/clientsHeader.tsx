import React from 'react'
import stls from './clientsHeader.module.scss'
import {useDispatchSelect} from '../../utilites/useDispatchSelect'
import {SquareButton} from '../squareButton/squareButton'
import {ClientsActionCreater} from '../../actions/clientsPageActions'


interface IpartState {
  clientsPage: {
    currentClient: string,
    clientEditing: boolean,
  },
}

export const ClientsHeader = () => {
  const {partState: {currentClient, clientEditing}, dispatch} = useDispatchSelect(
    (partState: IpartState) => ({
      currentClient: partState.clientsPage.currentClient,
      clientEditing: partState.clientsPage.clientEditing,
    }),
  )
  React.useEffect(() => {
    if (clientEditing && currentClient) dispatch(ClientsActionCreater.createShowNewClientForm(true))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientEditing])
  return (
    <header className={stls.tooolbar}>
      <SquareButton color="white" symbol="+" size="size2" tooltip="Создать нового клиента"
        pressHeadnler={() => dispatch(ClientsActionCreater.createShowNewClientForm(true))}
      />
      <SquareButton color="white" symbol="&#9997;" size="size2" tooltip="Редактировать выброного клиента"
        pressHeadnler={() => {
          dispatch(ClientsActionCreater.createClientEditingMode(true))
        }}
      />
      <SquareButton color="white" symbol="&#215;" size="size2" tooltip="Удалить выброного клиента"
        pressHeadnler={() => dispatch(ClientsActionCreater.createDeleteUser(currentClient))}
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