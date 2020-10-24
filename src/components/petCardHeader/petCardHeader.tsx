import React from 'react'
import stls from './petCardHeader.module.scss'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {SquareButton} from '../squareButton/squareButton'
import {PetCardsActionCreater} from '../../actions/petCardActions'


export const PetCardHeader = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  return (
    <header className={stls.tooolbar}>
      <SquareButton color="white" symbol="&#8629;" size="size2" tooltip="Назад"
        pressHeadnler={() => history.push('/clients')}
      />
      <SquareButton color="white" symbol="&#128190;" size="size2" tooltip="Сохранить"
        pressHeadnler={() => dispatch(PetCardsActionCreater.createAddVisit())}
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
