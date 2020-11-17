import React from 'react'
import stls from './clientsHeader.module.scss'
import {useDispatchSelect} from '../../utilites/useDispatchSelect'
import {SquareButton} from '../squareButton/squareButton'
import {ClientsActionCreater} from '../../actions/clientsPageActions'
import {PetCardsActionCreater} from '../../actions/petCardActions'


interface IpartState {
  clientsPage: {
    currentClient: string,
    currentPet: string,
    clientEditing: boolean,
    petEditing: boolean,
  },
  petCardPage: {
    currentVisit: string,
  },
}

export const ClientsHeader = () => {
  const {partState: {currentClient, currentPet, clientEditing, petEditing, currentVisit}, dispatch} = useDispatchSelect(
    (partState: IpartState) => ({
      currentClient: partState.clientsPage.currentClient,
      currentPet: partState.clientsPage.currentPet,
      clientEditing: partState.clientsPage.clientEditing,
      petEditing: partState.clientsPage.petEditing,
      currentVisit: partState.petCardPage.currentVisit,
    }),
  )
  const [searchLine, setSearchLine] = React.useState('')
  React.useEffect(() => {
    if (clientEditing && currentClient)
      dispatch(ClientsActionCreater.createShowElement('showNewClientForm', true))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientEditing])
  React.useEffect(() => {
    if (petEditing && currentPet)
      dispatch(ClientsActionCreater.createShowElement('showNewPetForm', true))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petEditing])
  return (
    <header className={stls.tooolbar}>
      <SquareButton color="white" symbol="+" size="size2" tooltip="Создать нового клиента"
        pressHeadnler={() => dispatch(ClientsActionCreater.createShowElement('showNewClientForm', true))}
      />
      <SquareButton color="white" symbol="♺" size="size2" tooltip="Редактировать выброного клиента"
        pressHeadnler={() => {
          if (currentClient) dispatch(ClientsActionCreater.createShowElement('clientEditing', true))
        }}
      />
      <SquareButton color="white" symbol="&#215;" size="size2" tooltip="Удалить выброного клиента"
        pressHeadnler={() => {
          if (currentClient) dispatch(ClientsActionCreater.createDeleteUser(currentClient))
        }}
      />
      <SquareButton color="white" symbol="&#128438;" size="size2" tooltip="Подготовка к печати"
        pressHeadnler={() => {
          if (currentPet && currentVisit) {
            dispatch(PetCardsActionCreater.createSetBoolData('showPrintOptions', true))
          } else alert('не выбран питомец или визит')
        }}
      />
      <input className={stls.search} type="text" placeholder="Фамилия, Адрес, Телефон"
        value={searchLine} onChange={e => setSearchLine(e.target.value)}
      />
      <SquareButton color="white" symbol="&#128269;" size="size2" tooltip="Поиск"
        pressHeadnler={() => dispatch(ClientsActionCreater.createSearch(searchLine))}
      />
      <SquareButton color="white" symbol="+1" size="size2" tooltip="Добавить питомца клиенту"
        pressHeadnler={() => {
          if (currentClient) dispatch(ClientsActionCreater.createShowElement('showNewPetForm', true))
          else alert('Сначала выберете клиента')
        }}
      />
      <SquareButton color="white" symbol="&#9998;" size="size2" tooltip="Редактировать питомца клиенту"
        pressHeadnler={() => {
          if (currentPet) dispatch(ClientsActionCreater.createShowElement('petEditing', true))
        }}
      />
      <SquareButton color="white" symbol="-1" size="size2" tooltip="Удалить выброного питомца"
        pressHeadnler={() => undefined}
      />
    </header>
  )
}