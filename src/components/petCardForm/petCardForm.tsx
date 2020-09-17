import React from 'react'
import './petCardForm.scss'
import cn from 'classnames'


export const PetCardForm = () => {
  return (
    <div className={cn('shortData')}>
      <div className={cn('dataTime')}>
        <div aria-label="Обновить дату" data-microtip-position="bottom-right" role="tooltip">
          <input type="button" className={cn('refreshButton')} value="&#8987;"/>
        </div>
        <span className={'date'}>01.01.01 15:15</span>
      </div>
      <div className={cn('weightTemperature')}>
        <input type="text" placeholder="Вес (кг)"/>
        <input type="text" placeholder="t (&#176;С)"/>
      </div>
      <div
        className={cn('goalOfRequest')}
        aria-label="Цель обращения"
        data-microtip-position="bottom-right"
        role="tooltip">
        <input type="text" className="fild" placeholder="Цель обращения"/>
        <input type="button" className="openFild" value="&#8744;"/>
      </div>
      <div
        className={cn('visitResult')}
        aria-label="Результат посещения"
        data-microtip-position="bottom-right"
        role="tooltip">
        <input type="text" className="fild" placeholder="Результат посещения"/>
        <input type="button" className="openFild" value="&#8744;"/>
      </div>
      <div className={cn('diagnoses')}>
        <input type="text" className="fild" value="Диагнозы:" readOnly={true}/>
        <input type="button" className="openFild" value="+"/>
      </div>
      <textarea className={cn('diagnosesFild')} rows={5} value={'Блохи\nБешенство'} onChange={() => null}/>
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
