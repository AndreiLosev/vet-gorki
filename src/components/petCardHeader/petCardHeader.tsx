import React from 'react'
import stls from './petCardHeader.module.scss'
import {useHistory} from 'react-router-dom'
import {SquareButton} from '../squareButton/squareButton'


export const PetCardHeader = () => {
  const history = useHistory();
  return (
    <header className={stls.tooolbar}>
      <SquareButton color="white" symbol="&#8629;" size="size2" tooltip="Назад"
        pressHeadnler={() => history.push('/clients')}
      />
      <SquareButton color="white" symbol="&#128190;" size="size2" tooltip="Сохранить"
        pressHeadnler={() => undefined}
      />
      <SquareButton color="white" symbol="&#128438;" size="size2" tooltip="Печать"
        pressHeadnler={() => undefined}
      />
      <div className={stls.clientAndPet}>
        <span>Труша (хомяк, женский) Лосев Андрей Геннадьевич</span>
      </div>
    </header>
  )
}
