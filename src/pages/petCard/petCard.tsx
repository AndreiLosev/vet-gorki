import React from 'react'
import cn from 'classnames'
import './petCard.scss'

export const PetCard = () => {
  return (
    <div className={cn('petCardConteiner')}>
      <div className={cn('tooolbar')}>
        <div className={cn('buttonWrap')}>
          <div aria-label="Назад" data-microtip-position="bottom-right" role="tooltip">
            <input type="button" value="&#8629;" />
          </div>
          <div aria-label="Сохранить" data-microtip-position="bottom-right" role="tooltip">
            <input type="button" value="&#128190;" />
          </div>
          <div aria-label="Печать" data-microtip-position="bottom-right" role="tooltip">
            <input type="button" value="&#128438;" />
          </div>
        </div>
        <div className={cn('clientAndPet')}>
          <span>Труша (хомяк, женский) Лосев Андрей Геннадьевич</span>
        </div>
      </div>
      <div className={cn('content')}>
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
        <div className={cn('longData')}>
          <div className={cn('navBar')}>
            <div className={cn('tabTreatmentDescription')}>Описание лечения</div>
            <div className={cn('tabRecommendationsAppointments', 'activTab')}>Рекомендации и назначения</div>
            <div className={cn('tabVaccinations')}>Вакцинации</div>
            <div className={cn('tabHistory')}>История</div>
          </div>
          <div className={cn('editorWrapper')}>
            <div className={cn('toolBar')}>
              <div>
                <span>Шрифт</span>
                <input type="number" className="fontSize" value="8" />
                <input type="button" className={cn('btn', 'activeBtn')} value="B"/>
                <input type="button" className={cn('btn', {'activeBtn': false})} value="I"/>
                <input type="button" className={cn('btn', {'activeBtn': false})} value="U&#818;"/>
              </div>
              <div>
                <input type="button" className={cn('btn', {'activeBtn': true})} value="A&#739;"/>
                <input type="button" className={cn('btn', {'activeBtn': false})} value="A&#7530;"/>
                <input type="button" className={cn('btn', {'activeBtn': false})} value="A"/>
                <input type="button" className={cn('btn', {'activeBtn': false})} value="A"/>
              </div>
              <div>
                <span>Выравнивание</span>
                <input type="button" className={cn('btn', {'activeBtn': true})} value="По левому краю"/>
                <input type="button" className={cn('btn', {'activeBtn': false})} value="По центру"/>
                <input type="button" className={cn('btn', {'activeBtn': false})} value="По правому краю"/>
                <input type="button" className={cn('btn', {'activeBtn': false})} value="По ширине"/>
              </div>
              <div>
                <span>Список</span>
                <input type="button" className={cn('btn', {'activeBtn': false})} value="Макрировочный"/>
                <input type="button" className={cn('btn', {'activeBtn': true})} value="Нумеровочный"/>
              </div>
            </div>
            <div className={cn('editorTextarea')}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
