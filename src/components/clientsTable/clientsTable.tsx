import React from 'react'
import './clientsTable.scss'
import cn from 'classnames'
import {IClient} from '../../redusers/clientsPageReduser'
import {useDispatchSelect} from '../../utilites/useDispatchSelect'
import {Lib} from '../../utilites/lib'
import {ClientsActionCreater} from '../../actions/clientsPageActions'

interface IpartState {
  clientsPage: {
    clients: {[index: string]: IClient},
    currentClient: string,
  },
}

export const ClientsTable = () => {
  const {partState: {clients, currentClient}, dispatch} = useDispatchSelect(
    (partState: IpartState) => ({
      clients: partState.clientsPage.clients,
      currentClient: partState.clientsPage.currentClient,
    }),
  )
  return (
    <div className={cn('clientsTable')}>
      <div className={cn('row', 'header')}>
        <div>№</div>
        <div>ФИО</div>
        <div>Адрес</div>
        <div>Телефон</div>
      </div>
      <div className="scrol">
        {Object.keys(clients).map((item, index) => <div
          className={cn('row', 'body', {'activeRow': currentClient === item})}
          key={item}
          onDoubleClick={() => {
            dispatch(ClientsActionCreater.createSetCurrentClient(item))
            dispatch(ClientsActionCreater.createGetPets(item))
          }}>
          <div>{index + 1}</div>
          <div>{`${clients[item].surname} ${clients[item].name} ${clients[item].patronymic}`}</div>
          <div>{`${clients[item].locality} ${clients[item].street} ${clients[item].house}-${clients[item].flat}`}</div>
          <div>{Lib.phoneToDisplay(clients[item].phone)}</div>
        </div>)}
      </div>
    </div>
  )
}
