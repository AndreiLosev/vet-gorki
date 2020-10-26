import React from 'react'
import stls from './petCardHeader.module.scss'
import {useHistory} from 'react-router-dom'
import {useDispatchSelect} from '../../utilites/useDispatchSelect'
import {SquareButton} from '../squareButton/squareButton'
import {PetCardsActionCreater} from '../../actions/petCardActions'

interface IpartSttate {
  petCardPage: {
    saved: boolean,
    currentVisit: string,
  }
}

export const PetCardHeader = () => {
  const history = useHistory()
  const {partState: {saved, currentVisit}, dispatch} = useDispatchSelect((partState: IpartSttate) => ({
    saved: partState.petCardPage.saved,
    currentVisit: partState.petCardPage.currentVisit
  }))
  return (
    <header className={stls.tooolbar}>
      <SquareButton color="white" symbol="&#8629;" size="size2" tooltip="Назад"
        pressHeadnler={() => {
          if (!saved) {
            const answer = window.confirm('сохранить данные перед выходом')
            if (answer) dispatch(PetCardsActionCreater.createUpdateVisit(currentVisit))
          }
          history.push('/clients')
        }}
      />
      <SquareButton color="white" symbol="&#128190;" size="size2" tooltip="Сохранить"
        pressHeadnler={() => dispatch(PetCardsActionCreater.createUpdateVisit(currentVisit))}
      />
      <SquareButton color="white" symbol="&#128199;" size="size2" tooltip="Печать"
        pressHeadnler={() => undefined}
      />
      <div className={stls.clientAndPet}>
        <span>Труша (хомяк, женский) Лосев Андрей Геннадьевич</span>
      </div>
    </header>
  )
}
