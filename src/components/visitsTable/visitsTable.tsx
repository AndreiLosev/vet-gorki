import React from 'react'
import './visitsTable.scss'
import cn from 'classnames'
import {useDispatchSelect} from '../../utilites/useDispatchSelect'
import {IVisitsRaw} from '../../redusers/petCardPageReduser'
import { PetCardsActionCreater } from '../../actions/petCardActions'
import {Lib} from '../../utilites/lib'
import { IPet } from '../../redusers/clientsPageReduser'

interface IpartState{
  petCardPage: {
    visits: {[id: string]: IVisitsRaw },
    currentVisit: string,
  },
  clientsPage: {
    currentPet: string,
    pets: {[index: string]: IPet},
  }
}

export const VisitsTable = () => {
  const {partState: {
    visits, currentVisit, pets, currentPet
  }, dispatch} = useDispatchSelect((partState: IpartState) => ({
    visits: partState.petCardPage.visits,
    currentVisit: partState.petCardPage.currentVisit,
    pets: partState.clientsPage.pets,
    currentPet: partState.clientsPage.currentPet,
  }))
  const rows = Object.keys(visits).map(item => item).sort((a, b) => {
    const a1 = +Lib.dateFromString(visits[a].shortData.date)
    const b1 = +Lib.dateFromString(visits[b].shortData.date)
    return b1 - a1
  })
  return (
    <div className={cn('visitsTable')}>
      <div className={cn('row', 'header')}>
        <div>№</div>
        <div>Цель обращения</div>
        <div>Результат посещения</div>
        <div>Диагнозы</div>
        <div>Врач</div>
        <div>Кострация</div>
        <div>Возраст</div>
        <div>Вес</div>
        <div>Темпе<wbr />ратура</div>
        <div>Дата посещения</div>
      </div>
      <div className="scrol">
        {rows.map((item, index) => <div
          className={cn('row', 'body', {'activeRow': currentVisit === item})} key={item}
          onDoubleClick={() => dispatch(PetCardsActionCreater.createSetCurrentVisit(item))}>
          <div>{index + 1}</div>
          <div>{visits[item].shortData.goalOfRequest}</div>
          <div>{visits[item].shortData.visitResult}</div>
          <div>{visits[item].shortData.diagnosis}</div>
          <div>{visits[item].shortData.doctor}</div>
          <div>{pets[currentPet].castration}</div>
          <div>{visits[item].shortData.age}</div>
          <div>{visits[item].shortData.weight}</div>
          <div>{visits[item].shortData.temperature}</div>
          <div>{visits[item].shortData.date}</div>
        </div>)}
      </div>
    </div>
  )
}
