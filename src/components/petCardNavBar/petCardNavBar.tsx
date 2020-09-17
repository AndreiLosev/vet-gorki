import React from 'react'
import './petCardNavBar.scss'
import cn from 'classnames'


export const PetCardNavBar = () => {
  return (
    <div className={cn('navBar')}>
      <div className={cn('tabTreatmentDescription')}>Описание лечения</div>
      <div className={cn('tabRecommendationsAppointments', 'activTab')}>Рекомендации и назначения</div>
      <div className={cn('tabVaccinations')}>Вакцинации</div>
      <div className={cn('tabHistory')}>История</div>
    </div>
  )
}
