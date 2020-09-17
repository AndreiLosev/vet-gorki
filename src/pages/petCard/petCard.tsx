import React from 'react'
import cn from 'classnames'
import './petCard.scss'
import {PetCardHeader} from '../../components/petCardHeader/petCardHeader'
import {PetCardForm} from '../../components/petCardForm/petCardForm'
import {PetCardNavBar} from '../../components/petCardNavBar/petCardNavBar'

export const PetCard = () => {
  return (
    <div className={cn('petCardConteiner')}>
      <PetCardHeader />
      <div className={cn('content')}>
        <PetCardForm />
        <div className={cn('longData')}>
          <PetCardNavBar />
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
