import React from 'react'
import cn from 'classnames'
import './clients.scss'
import {useShowNicely} from '../../utilites/useShowNicely'
import {ClientsActionCreater} from '../../actions/clientsPageActions'
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
    showPetTypeOptions: boolean,
    showBreedOptions: boolean,
    selectedPetType: string,
  },
  staticData: {
    petType: string[],
    breed: { [index: string]: string[] },
  }
}

type Props = {
  location: { pathname: string }
}

export const Clients: React.FC<Props> = ({location: {pathname}}) => {
  const {partState: {
    showNewClientForm, showNewPetForm, IsFetching, showPetTypeOptions,
    showBreedOptions, selectedPetType, petType, breed,
  }, dispatch} = useDispatchSelect(
    (partSate: IpartState) => ({
      showNewClientForm: partSate.clientsPage.showNewClientForm,
      showNewPetForm: partSate.clientsPage.showNewPetForm,
      IsFetching: partSate.clientsPage.IsFetching,
      showPetTypeOptions: partSate.clientsPage.showPetTypeOptions,
      showBreedOptions: partSate.clientsPage.showBreedOptions,
      selectedPetType: partSate.clientsPage.selectedPetType,
      petType: partSate.staticData.petType,
      breed: partSate.staticData.breed,
    })
  )
  const [showClientFormInside, showClientFormOutsid] = useShowNicely(showNewClientForm, 700)
  const [showPetFormInside, showPetFormOutsid] = useShowNicely(showNewPetForm, 700)
  const [showPetTypeOptionsInside, showPetTypeOptionsOutsid] = useShowNicely(showPetTypeOptions, 1000)
  const [showBreedOptionsInside, showBreedOptionsOutsid] = useShowNicely(showBreedOptions, 1000)
  const [show, setShow] = React.useState(false)
  React.useEffect(() => { setShow(true) }, [])
  return (
    <div className={cn('clientsConteiner', {'activeClients': show}, {'deactiveClients': !show})}>
      {IsFetching ? <LoadingSpiner /> : null}
      {showPetTypeOptionsInside ? <WindowForAddingOptions
        visible={showPetTypeOptionsOutsid}
        tooltip="Вид"
        options={petType}
        pressAddOptions={() => null}
        pressRemove={() => null}
        pressClose={() => dispatch(ClientsActionCreater.createShowElement('showPetTypeOptions', false))}
      /> : null}
      {showBreedOptionsInside ? <WindowForAddingOptions
        visible={showBreedOptionsOutsid}
        tooltip="Вид"
        options={breed[selectedPetType] ? breed[selectedPetType] : []}
        pressAddOptions={() => null}
        pressRemove={() => null}
        pressClose={() => dispatch(ClientsActionCreater.createShowElement('showBreedOptions', false))}
      /> : null}
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
