import React from 'react'
import './petCardHeader.scss'
import cn from 'classnames'


export const PetCardHeader = () => {
  return (
    <header className={cn('tooolbar')}>
      <div className={cn('buttonWrapPetCard')}>
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
    </header>
  )
}
