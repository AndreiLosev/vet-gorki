import React from 'react'
import cn from 'classnames'
import './clients.scss'
import {NavigatorContext} from '../../navigation'
import {useShowNicely} from '../../utilites/useShowNicely'
import {ClientsActionCreater} from '../../actions/clientsPageActions'
import {PetCardsActionCreater} from '../../actions/petCardActions'
import {StaticDataActionCreater} from '../../actions/staticDataActions'
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
    loggedIn: boolean,
    selectedPetType: string,
  },
  staticData: {
    petType: string[],
    breed: { [index: string]: string[] },
  },
  petCardPage: {
    showPrintOptions: boolean,
    currentVisit: string,
  },
}

export const Clients: React.FC<{}> = () => {
  const {partState: {
    showNewClientForm, showNewPetForm, IsFetching, showPetTypeOptions, currentVisit,
    showBreedOptions, selectedPetType, petType, breed, loggedIn, showPrintOptions,
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
      loggedIn: partSate.clientsPage.loggedIn,
      showPrintOptions: partSate.petCardPage.showPrintOptions,
      currentVisit: partSate.petCardPage.currentVisit,
    })
  )
  const {goTo} = React.useContext(NavigatorContext)
  const [showClientFormInside, showClientFormOutsid] = useShowNicely(showNewClientForm, 700)
  const [showPetFormInside, showPetFormOutsid] = useShowNicely(showNewPetForm, 700)
  const [showPetTypeOptionsInside, showPetTypeOptionsOutsid] = useShowNicely(showPetTypeOptions, 1000)
  const [showBreedOptionsInside, showBreedOptionsOutsid] = useShowNicely(showBreedOptions, 1000)
  const [showPrintOptionsInside, showPrintOptionsOutsid] = useShowNicely(showPrintOptions, 1000)
  if (!loggedIn) goTo('login')
  const [show, setShow] = React.useState(false)
  React.useEffect(() => setShow(true), [])
  const data = [
    {
      visible1: showPetTypeOptionsInside, visible: showPetTypeOptionsOutsid, options: petType, tooltip: "Вид",
      pressAddOptions: (options: string[]) => dispatch(StaticDataActionCreater.createSetNewData('petType', options)),
      pressClose: () => dispatch(ClientsActionCreater.createShowElement('showPetTypeOptions', false)),
      pressRemove: (options: string[]) => dispatch(StaticDataActionCreater.createSetNewData('petType', options, true)),
    },
    {
      visible1: showBreedOptionsInside, visible: showBreedOptionsOutsid, tooltip: "Порода",
      options: breed[selectedPetType] ? breed[selectedPetType] : [],
      pressAddOptions: (options: string[]) =>
        dispatch(StaticDataActionCreater.createSetNewData(undefined, options, false, selectedPetType)),
      pressClose: () => dispatch(ClientsActionCreater.createShowElement('showBreedOptions', false)),
      pressRemove: (options: string[]) =>
        dispatch(StaticDataActionCreater.createSetNewData(undefined, options, true, selectedPetType)),
    },
    {
      visible1: showPrintOptionsInside, visible: showPrintOptionsOutsid, searchVisible: false, tooltip: "печать",
      options: ['Общие данные', 'Описание лечения', 'Рекомендации и назначения', 'Вакцинация', 'Истрория'],
      pressAdd : (selectedOptions: string) => {
        dispatch(PetCardsActionCreater.createPrintData(currentVisit, selectedOptions.split('\n')))
        goTo('print')
      },
      pressClose: () => dispatch(PetCardsActionCreater.createSetBoolData('showPrintOptions', false)),
    },
  ]
  return (
    <div className={cn('clientsConteiner', {'activeClients': show}, {'deactiveClients': !show})}>
      {IsFetching ? <LoadingSpiner /> : null}
      {data.map(item => item.visible1 ? <WindowForAddingOptions key={item.tooltip}
        visible={item.visible} options={item.options} tooltip={item.tooltip}
        pressAddOptions={item.pressAddOptions} pressAdd={item.pressAdd}
        pressRemove={item.pressRemove} pressClose={item.pressClose}
        // singleChoice={item.singleChoice}
        searchVisible={item.searchVisible}
      /> : null)}
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
