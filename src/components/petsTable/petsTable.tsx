import React from 'react'
import './petsTable.scss'
import cn from 'classnames'
import {useDispatchSelect} from '../../utilites/useDispatchSelect'
import {IPets} from '../../redusers/clientsPageReduser'

interface IpartState {
  clientsPage: {
    currentClient: string,
    pets: IPets[],
  },
}

export const PetsTable = () => {
  const {partState: {currentClient, pets}} = useDispatchSelect((partStae: IpartState) => ({
    currentClient: partStae.clientsPage.currentClient,
    pets: partStae.clientsPage.pets,
  }))
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
        {currentClient ? pets.map((item, index) => <div className={cn('row', 'body')}>
          <div>{index + 1}</div>
          <div>{item.petName}</div>
          <div>{item.petType}</div>
          <div>{item.ageYear}</div>
          <div>{item.petGender}</div>
        </div>) : null}
      </div>
    </div>
  )
}
