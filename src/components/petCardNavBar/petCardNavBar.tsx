import React from 'react'
import stls from './petCardNavBar.module.scss'
import {useDispatchSelect} from '../../utilites/useDispatchSelect'
import {EditorActionCreater} from '../../actions/editorActions'
import {TwoStateButton} from '../twoStateButton/twoStateButton'
import {TEditorNames} from '../../redusers/editorReduser'

type localState = {[index: string]: {symbol: string, active: TEditorNames}}

interface IpartState {
  editor: {activeEditor: TEditorNames}
}

export const PetCardNavBar: React.FC<{}> = () => {
  const {partState: {activeEditor}, dispatch} = useDispatchSelect((partSate: IpartState) =>
    ({activeEditor: partSate.editor.activeEditor}))
  const activPage = {
    description: {symbol: 'Описание лечения', active: activeEditor},
    recommendations: {symbol: 'Рекомендации и назначения', active: activeEditor},
    vaccinations: {symbol: 'Вакцинации', active: activeEditor},
    history: {symbol: 'История', active: activeEditor},
  } as localState
  const switchPage = (pageName: TEditorNames) => {dispatch(EditorActionCreater.createSetPage(pageName))}
  return (
    <div className={stls.navBar}>
      {Object.keys(activPage).map(item => (
        <TwoStateButton
          symbol={activPage[item].symbol}
          active={activPage[item].active === item}
          pressHender={switchPage}
          key1={item} key={item}
        />
      ))}
    </div>
  )
}
