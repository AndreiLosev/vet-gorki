import React from 'react'
import stls from './petCardForm.module.scss'
import {SquareButton} from '../squareButton/squareButton'
import {FormFild} from '../formFild/formFild'
import {FormFildWithOptions} from '../formFieldWithOptions/formFieldWithOptions'
import {Lib} from '../../utilites/lib'


export const PetCardForm = () => {
  const [now, setNow] = React.useState(Date.now())
  const [diagnoses, setDiagnoses] = React.useState('')
  return (
    <div className={stls.shortData}>
      <div className={stls.wrapp}>
        <div className={stls.space}>
          <SquareButton color="green" symbol="&#8987;" size="size1" tooltip="Обновить дату"
            pressHeadnler={() => setNow(Date.now())}
          />
          <FormFild value={Lib.converDate(now)}/>
        </div>
      </div>
      <div className={stls.wrapp}>
        <div className={stls.space}>
          <FormFild placeholder="Вес (кг)" tooltip="Вес (кг)"/>
          <FormFild placeholder="t (&#176;С)" tooltip="t (&#176;С)"/>
        </div>
      </div>
      <div className={stls.wrapp}>
        <FormFildWithOptions
          placeholder="Цель обращения" tooltip="Цель обращения"
          options={['проблемма', 'болит', 'прививку']}
        />
      </div>
      <div className={stls.wrapp}>
        <FormFildWithOptions
          placeholder="Результат посещения" tooltip="Результат посещения"
          options={['проблемма', 'болит', 'прививку']}
        />
      </div>
      <div className={stls.diagnoses}>
        <div className={stls.header}>
          <div>Диагноз:</div>
          <SquareButton color="green" symbol="+" size="size1"
            pressHeadnler={() => null}
          />
        </div>
        <textarea
          className={stls.diagnosesFild} rows={15}
          value={diagnoses} onChange={e => setDiagnoses(e.target.value)}
        />
      </div>
      <div className={stls.wrapp}>
        <FormFildWithOptions
          placeholder="Врач" tooltip="Врач"
          options={['доктор №1', 'доктор №2', 'Кристина']}
        />
      </div>
      <div className={stls.DateBirth}>
        <span>Дата рождения:</span>
        <span>01.02.2003</span>
      </div>
      <div className={stls.DateBirth}>
        <span>Возраст:</span>
        <span>99л 6м</span>
      </div>
    </div>
  )
}
