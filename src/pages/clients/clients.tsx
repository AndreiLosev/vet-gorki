import React from 'react'
import cn from 'classnames'
import './clients.scss'
import {ClientsHeader} from '../../components/clientsHeader/clientsHeader'
import {NewClientForm} from '../../components/newClientForm/newClientForm'
import {ClientsTable} from '../../components/clientsTable/clientsTable'
import {PetsTable} from '../../components/petsTable/petsTable'
import {VisitsTable} from '../../components/visitsTable/visitsTable'
import {VisitsTableToolbar} from '../../components/visitsTableToolbar/visitsTableToolbar'
import {useDispatchSelect} from '../../utilites/useDispatchSelect'
import {NewPetForm} from '../../components/newPetForm/newPetForm'


interface IpartState {
  clientsPage: {
    showNewClientForm: boolean,
    showNewPetForm: boolean,
  },
}

export const Clients: React.FC = () => {
  const {partState: {showNewClientForm, showNewPetForm}} = useDispatchSelect(
    (partSate: IpartState) => ({
      showNewClientForm: partSate.clientsPage.showNewClientForm,
      showNewPetForm: partSate.clientsPage.showNewPetForm,
    })
  )
  const [showNClientForm, setShowNClientForm] = React.useState(showNewClientForm)
  React.useEffect(() => {
    if (showNewClientForm) { setShowNClientForm(showNewClientForm) }
    else { setTimeout(() => setShowNClientForm(showNewClientForm), 750) }
  }, [showNewClientForm])
  return (
    <div className={cn('clientsConteiner')}>
      <ClientsHeader />
      <div className={cn('contentWrapper')}>
        {showNClientForm ? <NewClientForm visible={showNewClientForm} /> : null}
        {showNewPetForm ? <NewPetForm /> : null}
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
