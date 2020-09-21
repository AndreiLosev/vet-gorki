import React from 'react'
import stls from './petCardForm.module.scss'
import cn from 'classnames'
import {SquareButton} from '../squareButton/squareButton'
import {FormFild} from '../formFild/formFild'
import {FormFildWithOptions} from '../formFieldWithOptions/formFieldWithOptions'
import {Lib} from '../../utilites/lib'


export const PetCardForm = () => {
  const [now, setNow] = React.useState(Date.now());
  return (
    <div className={stls.shortData}>
      <div className={stls.wrapp}>
      <SquareButton color="green" symbol="&#8987;" size="size1" tooltip="Обновить дату"
          pressHeadnler={() => setNow(Date.now())}
        />
        <FormFild value={Lib.converDate(now)}/>
      </div>
      <div className={stls.wrapp}>
        <FormFild placeholder="Вес (кг)" tooltip="Вес (кг)"/>
        <FormFild placeholder="t (&#176;С)" tooltip="t (&#176;С)"/>
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
        <div>Диагноз:</div>
        <SquareButton color="green" symbol="+" size="size1"
          pressHeadnler={() => null}
        />
        <textarea className={cn('diagnosesFild')} rows={5} value={'Блохи\nБешенство'} onChange={() => null}/>
      </div>
      <div
        className={cn('doctor')}
        aria-label="Врач"
        data-microtip-position="bottom-right"
        role="tooltip">
        <input type="text" className="fild" placeholder="Врач"/>
        <input type="button" className="openFild" value="&#8744;"/>
      </div>
      <div className={cn('DateBirth')}>
        <span>Дата рождения:</span>
        <span>01.02.2003</span>
      </div>
      <div className={cn('DateBirth')}>
        <span>Возраст:</span>
        <span>99л 6м</span>
      </div>
    </div>
  )
}
