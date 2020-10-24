import React from 'react'
import stls from './visitsTableToolbar.module.scss'
import {useHistory} from 'react-router-dom'
import {useDispatchSelect} from '../../utilites/useDispatchSelect'
import {SquareButton} from '../squareButton/squareButton'
import {PetCardsActionCreater} from '../../actions/petCardActions'


interface IpartState {
  clientsPage: { currentPet: string },
  petCardPage: { currentVisit: string },
}

export const VisitsTableToolbar: React.FC<{}> = () => {
  const {partState: {currentPet, currentVisit}, dispatch} = useDispatchSelect((partState: IpartState) => ({
    currentPet: partState.clientsPage.currentPet,
    currentVisit: partState.petCardPage.currentVisit,
  }))
  const history = useHistory()
  return (
    <div className={stls.buttonWrap}>
        <SquareButton color="green" symbol="+" size="size1" tooltip="Добавить новую запись"
          pressHeadnler={() => {
            if (currentPet) {
              history.push('/petCard')
              dispatch(PetCardsActionCreater.createAddVisits())
            }
            else alert('Сначала выберети питомца')
          }}
        />
        <SquareButton color="green" symbol="♺" size="size1" tooltip="Редактировать выбраную запись"
          pressHeadnler={() => {
            if (currentVisit) {
              dispatch(PetCardsActionCreater.createEditVisit())
              history.push('/petCard')
            }
          }}
        />
        <SquareButton color="green" symbol="&#215;" size="size1" tooltip="Удалить выбраную запись"
          pressHeadnler={() => { if (currentVisit) dispatch(PetCardsActionCreater.createDeleteVisit()) }}
        />
    </div>
  )
}
