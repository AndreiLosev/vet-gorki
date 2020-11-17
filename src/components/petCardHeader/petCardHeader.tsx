import React from 'react'
import stls from './petCardHeader.module.scss'
import {NavigatorContext} from '../../navigation'
import {useDispatchSelect} from '../../utilites/useDispatchSelect'
import {IClient, IPet} from '../../redusers/clientsPageReduser'
import {SquareButton} from '../squareButton/squareButton'
import {PetCardsActionCreater} from '../../actions/petCardActions'
import {TEditorState} from '../../redusers/editorReduser'
import {EditorState} from 'draft-js'
import {EditorActionCreater} from '../../actions/editorActions'

interface IpartSttate {
  petCardPage: {
    saved: boolean,
    currentVisit: string,
  }
  clientsPage: {
    currentClient: string,
    currentPet: string,
    clients: {[index: string]: IClient},
    pets: {[index: string]: IPet},
  }
}

export const PetCardHeader = () => {
  const {goTo} = React.useContext(NavigatorContext)
  const {partState: {
    saved, currentVisit, currentClient, currentPet, clients, pets
  }, dispatch} = useDispatchSelect((partState: IpartSttate) => ({
    saved: partState.petCardPage.saved,
    currentVisit: partState.petCardPage.currentVisit,
    currentClient: partState.clientsPage.currentClient,
    currentPet: partState.clientsPage.currentPet,
    clients: partState.clientsPage.clients,
    pets: partState.clientsPage.pets,
  }))
  const client = clients[currentClient]
  const pet = pets[currentPet]
  return (
    <header className={stls.tooolbar}>
      <SquareButton color="white" symbol="&#8629;" size="size2" tooltip="Назад"
        pressHeadnler={() => {
          if (!saved) {
            const answer = window.confirm('сохранить данные перед выходом')
            if (answer) dispatch(PetCardsActionCreater.createUpdateVisit(currentVisit))
          }
          goTo('clients')
          const clearEditor: TEditorState = {
            description: EditorState.createEmpty(),
            recommendations: EditorState.createEmpty(),
            vaccinations: EditorState.createEmpty(),
            history: EditorState.createEmpty(),
            activeEditor: 'description',
            shortData: {
              date: '', weight: '', temperature: '', diagnosis: '',
              goalOfRequest: '', visitResult: '', age: '', doctor: '',
            }
          }
          dispatch(EditorActionCreater.createLoadEditorsfromRaw(clearEditor))
        }}
      />
      <SquareButton color="white" symbol="&#8721;" size="size2" tooltip="Сохранить"
        pressHeadnler={() => dispatch(PetCardsActionCreater.createUpdateVisit(currentVisit))}
      />
      <SquareButton color="white" symbol="&#128438;" size="size2" tooltip="Подготовка к печати"
        pressHeadnler={() => {
          if (currentVisit && currentPet) {
            dispatch(PetCardsActionCreater.createSetBoolData('showPrintOptions', true))
          } else alert('не выбран питомец или клиент')
        }}
      />
      <SquareButton color="white" symbol="&#916;" size="size2" tooltip="Шаблоны"
        pressHeadnler={() => dispatch(PetCardsActionCreater.createSetBoolData('showTemplate', true))}
      />
      <div className={stls.clientAndPet}>
        <span>
          {`${pet.petName} (${pet.petType}, ${pet.petGender}) ${client.surname} ${client.name} ${client.patronymic}`}
        </span>
      </div>
    </header>
  )
}
