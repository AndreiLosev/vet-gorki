import React from 'react'
import './visitsTable.scss'
import cn from 'classnames'
import {useDispatchSelect} from '../../utilites/useDispatchSelect'
import {IVisitsRaw} from '../../redusers/petCardPageReduser'
import {Lib} from '../../utilites/lib'
import { PetCardsActionCreater } from '../../actions/petCardActions'

interface IpartState{
  petCardPage: {
    visits: {[id: string]: IVisitsRaw },
    currentVisit: string,
  }
}

export const VisitsTable = () => {
  const {partState: {visits, currentVisit}, dispatch} = useDispatchSelect((partState: IpartState) => ({
    visits: partState.petCardPage.visits,
    currentVisit: partState.petCardPage.currentVisit,
  }))
  Object.keys(visits).forEach(item => {
    console.log(visits[item].shortData.age)
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
        {Object.keys(visits).map((item, index) => <div
          className={cn('row', 'body', {'activeRow': currentVisit === item})} key={item}
          onDoubleClick={() => dispatch(PetCardsActionCreater.createSetCurrentVisit(item))}>
          <div>{index + 1}</div>
          <div>{visits[item].shortData.goalOfRequest}</div>
          <div>{visits[item].shortData.visitResult}</div>
          <div>{visits[item].shortData.diagnosis}</div>
          <div>{visits[item].shortData.doctor}</div>
          <div>{visits[item].shortData.date}</div>
          <div>
            {Object.values(Lib.convertDateOfBirthToAge(new Date(visits[item].shortData.age)))}
          </div>
          <div>{visits[item].shortData.weight}</div>
          <div>{visits[item].shortData.temperature}</div>
          <div>{visits[item].shortData.date}</div>
        </div>)}
      </div>
    </div>
  )
}
