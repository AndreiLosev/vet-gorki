import React from 'react'
import stls from './visitsTableToolbar.module.scss'
import {NavigatorContext} from '../../navigation'
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
  const {goTo} = React.useContext(NavigatorContext)
  React.useEffect(() => {
    dispatch(PetCardsActionCreater.createSetCurrentVisit(''))
  }, [currentPet, dispatch])
  return (
    <div className={stls.buttonWrap}>
        <SquareButton color="green" symbol="+" size="size1" tooltip="Добавить новую запись"
          pressHeadnler={() => {
            if (currentPet) {
              goTo('petCart')
              dispatch(PetCardsActionCreater.createAddVisits(currentPet))
            }
            else alert('Сначала выберети питомца')
          }}
        />
        <SquareButton color="green" symbol="♺" size="size1" tooltip="Редактировать выбраную запись"
          pressHeadnler={() => {
            if (currentVisit && currentPet) {
              dispatch(PetCardsActionCreater.createEditVisit())
              goTo('petCart')
            } else { alert('не выбран питомец или визит') }
          }}
        />
        <SquareButton color="green" symbol="&#215;" size="size1" tooltip="Удалить выбраную запись"
          pressHeadnler={() => {
            if (currentVisit && currentPet) dispatch(PetCardsActionCreater.createDeleteVisit(currentPet))
            else (alert('не выбран питомец или визит'))
          }}
        />
    </div>
  )
}
