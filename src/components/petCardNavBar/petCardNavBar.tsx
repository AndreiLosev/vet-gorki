import React from 'react'
import stls from './petCardNavBar.module.scss'
import {TwoStateButton} from '../twoStateButton/twoStateButton'


type localState = {
  [index: string]: {symbol: string, active: boolean}
}

export const PetCardNavBar: React.FC<{}> = () => {
  const [activPage, setActivePage] = React.useState({
    description: {symbol: 'Описание лечения', active: true},
    recommendations: {symbol: 'Рекомендации и назначения', active: false},
    vaccinations: {symbol: 'Вакцинации', active: false},
    history: {symbol: 'История', active: false},
  } as localState)
  const switchPage = (key: string) => {
    setActivePage(prev => {
      for (let index in prev) prev[index].active = false
      prev[key].active = true
      return {...prev}
    })
  }
  return (
    <div className={stls.navBar}>
      {Object.keys(activPage).map(item => (
        <TwoStateButton
          symbol={activPage[item].symbol}
          active={activPage[item].active}
          pressHender={switchPage}
          key1={item} key={item}
        />
      ))}
    </div>
  )
}
