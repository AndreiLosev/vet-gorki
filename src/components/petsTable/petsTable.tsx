import React from 'react'
import './petsTable.scss'
import cn from 'classnames'
import {useDispatchSelect} from '../../utilites/useDispatchSelect'
import {IPet} from '../../redusers/clientsPageReduser'
import {ClientsActionCreater} from '../../actions/clientsPageActions'
import {PetCardsActionCreater} from '../../actions/petCardActions'

interface IpartState {
  clientsPage: {
    currentClient: string,
    pets: {[index: string]: IPet},
    currentPet: string,
  },
}

export const PetsTable = () => {
  const {partState: {currentClient, pets, currentPet},  dispatch} = useDispatchSelect((partStae: IpartState) => ({
    currentClient: partStae.clientsPage.currentClient,
    pets: partStae.clientsPage.pets,
    currentPet: partStae.clientsPage.currentPet,
  }))
  React.useEffect(() => {
    if (currentPet) dispatch(PetCardsActionCreater.createGetVisits())
  }, [currentPet, dispatch])
  return (
    <div className={cn('petsTable')}>
      <div className={cn('row', 'header')}>
        <div>№</div>
        <div>Кличка</div>
        <div>Вид</div>
        <div>Порода</div>
        <div>Пол</div>
      </div>
      <div className="scrol">
        {currentClient ? Object.keys(pets).map((item, index) => <div
          className={cn('row', 'body', {'activeRow': currentPet === item})} key={item}
          onDoubleClick={() => dispatch(ClientsActionCreater.createSetCurrentPet(item))}>
          <div>{index + 1}</div>
          <div>{pets[item].petName}</div>
          <div>{pets[item].petType}</div>
          <div>{pets[item].breed}</div>
          <div>{pets[item].petGender}</div>
        </div>) : null}
      </div>
    </div>
  )
}
