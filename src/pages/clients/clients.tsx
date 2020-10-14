import React from 'react'
import cn from 'classnames'
import './clients.scss'
import {Lib} from '../../utilites/lib'
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
  const [showClientFormInside, setShowClientFormInside] = React.useState(showNewClientForm)
  const [showClientFormOutsid, setShowClientFormOutsid] = React.useState(showNewClientForm)
  const [showPetFormInside, setShowPetFormInside] = React.useState(showNewPetForm)
  const [showPetFormOutsid, setShowPetFormOutsid] = React.useState(showNewPetForm)
  React.useEffect(() => {
    Lib.showNicely(showNewClientForm, setShowClientFormInside, setShowClientFormOutsid)
  }, [showNewClientForm])
  React.useEffect(() => {
    Lib.showNicely(showNewPetForm, setShowPetFormInside, setShowPetFormOutsid)
  }, [showNewPetForm])
  return (
    <div className={cn('clientsConteiner')}>
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
