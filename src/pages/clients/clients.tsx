import React from 'react'
import cn from 'classnames'
import './clients.scss'
import {ClientsHeader} from '../../components/clientsHeader/clientsHeader'
import {NewClientForm} from '../../components/newClientForm/newClientForm'
import {ClientsTable} from '../../components/clientsTable/clientsTable'
import {PetsTable} from '../../components/petsTable/petsTable'
import {VisitsTable} from '../../components/visitsTable/visitsTable'

export const Clients = () => {
  return (
    <div className={cn('clientsConteiner')}>
      <ClientsHeader />
      <div className={cn('contentWrapper')}>
        <NewClientForm />
        <div className={cn('content')}>
          <div className={cn('clientsAndPet')}>
            <ClientsTable />
            <PetsTable />
          </div>
          <div className={cn('buttonWrap')}>
            <div aria-label="Добавить новую запись" data-microtip-position="bottom-right" role="tooltip">
              <input type="button" value="+" />
            </div>
            <div aria-label="Редактировать выбраную запись" data-microtip-position="bottom-right" role="tooltip">
              <input type="button" value="&#9997;" />
            </div>
            <div aria-label="Удалить выбраную запись" data-microtip-position="bottom-right" role="tooltip">
              <input type="button" value="&#215;" />
            </div>
          </div>
          <div className="visits">
            <VisitsTable />
          </div>
        </div>
      </div>
    </div>
  )
}
