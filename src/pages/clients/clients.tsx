import React from 'react'
import cn from 'classnames'
import './clients.scss'
import {useShowNicely} from '../../utilites/useShowNicely'
import {ClientsHeader} from '../../components/clientsHeader/clientsHeader'
import {NewClientForm} from '../../components/newClientForm/newClientForm'
import {ClientsTable} from '../../components/clientsTable/clientsTable'
import {PetsTable} from '../../components/petsTable/petsTable'
import {VisitsTable} from '../../components/visitsTable/visitsTable'
import {VisitsTableToolbar} from '../../components/visitsTableToolbar/visitsTableToolbar'
import {useDispatchSelect} from '../../utilites/useDispatchSelect'
import {NewPetForm} from '../../components/newPetForm/newPetForm'
import {LoadingSpiner} from '../../components/loadingSpiner/LoadingSpiner'
import {WindowForAddingOptions} from '../../components/windowForAddingOptions/windowForAddingOptions'


interface IpartState {
  clientsPage: {
    showNewClientForm: boolean,
    showNewPetForm: boolean,
    IsFetching: boolean,
  },
}

export const Clients: React.FC = () => {
  const {partState: {showNewClientForm, showNewPetForm, IsFetching}} = useDispatchSelect(
    (partSate: IpartState) => ({
      showNewClientForm: partSate.clientsPage.showNewClientForm,
      showNewPetForm: partSate.clientsPage.showNewPetForm,
      IsFetching: partSate.clientsPage.IsFetching,
    })
  )
  const [showClientFormInside, showClientFormOutsid] = useShowNicely(showNewClientForm, 700)
  const [showPetFormInside, showPetFormOutsid] = useShowNicely(showNewPetForm, 700)
  return (
    <div className={cn('clientsConteiner')}>
      {IsFetching ? <LoadingSpiner /> : null}
      <ClientsHeader />
      <div className={cn('contentWrapper')}>
        {showClientFormInside ? <NewClientForm visible={showClientFormOutsid} /> : null}
        {showPetFormInside ? <NewPetForm visible={showPetFormOutsid}/> : null}
        <div className={cn('content')}>
          <div className={cn('clientsAndPet')}>
            <ClientsTable />
            <PetsTable />
          </div>
          <VisitsTableToolbar />
          <div className="visits">
            <VisitsTable />
          </div>
        </div>
      </div>
    </div>
  )
}
