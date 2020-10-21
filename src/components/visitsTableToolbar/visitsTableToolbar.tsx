import React from 'react'
import stls from './visitsTableToolbar.module.scss'
import {useHistory} from 'react-router-dom'
import {useDispatchSelect} from '../../utilites/useDispatchSelect'
import {SquareButton} from '../squareButton/squareButton'


interface IpartState {
  clientsPage: { currentPet: string },
}

export const VisitsTableToolbar: React.FC<{}> = (props) => {
  const {partState: {currentPet}} = useDispatchSelect((partState: IpartState) => ({
    currentPet: partState.clientsPage.currentPet,
  }))
  const history = useHistory()
  return (
    <div className={stls.buttonWrap}>
        <SquareButton color="green" symbol="+" size="size1" tooltip="Добавить новую запись"
          pressHeadnler={() => {
            if (currentPet) history.push('/petCard')
            else alert('Сначала выберети питомца')
          }}
        />
        <SquareButton color="green" symbol="♺" size="size1" tooltip="Редактировать выбраную запись"
          pressHeadnler={() => null}
        />
        <SquareButton color="green" symbol="&#215;" size="size1" tooltip="Удалить выбраную запись"
          pressHeadnler={() => null}
        />
    </div>
  )
}
