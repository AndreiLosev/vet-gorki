import React from 'react'
import cn from 'classnames'
import './petCard.scss'
import {useDispatchSelect} from '../../utilites/useDispatchSelect'
import {useShowNicely} from '../../utilites/useShowNicely'
import {PetCardHeader} from '../../components/petCardHeader/petCardHeader'
import {PetCardForm} from '../../components/petCardForm/petCardForm'
import {PetCardNavBar} from '../../components/petCardNavBar/petCardNavBar'
import {EditorConteiner} from '../../components/editor/editor'
import {WindowForAddingOptions} from '../../components/windowForAddingOptions/windowForAddingOptions'
import {TShortData} from '../../redusers/editorReduser'
import {EditorActionCreater} from '../../actions/editorActions'
import {PetCardsActionCreater} from '../../actions/petCardActions'


interface IpartState {
  petCardPage: { showDiagnosesList: boolean },
  staticData: { diagnoses: string[] },
  editor: {shortData: TShortData}
}

export const PetCard: React.FC<{}> = () => {
  const {partState: {showDiagnosesList, diagnoses, shortData}, dispatch} = useDispatchSelect(
    (partSate: IpartState) => ({
      showDiagnosesList: partSate.petCardPage.showDiagnosesList,
      diagnoses: partSate.staticData.diagnoses,
      shortData: partSate.editor.shortData,
    }),
  )
  const [showDiagnosesListInside, showDiagnosesListOutsid] = useShowNicely(showDiagnosesList, 1000)
  return (
    <div className={cn('petCardConteiner')}>
      <PetCardHeader />
      {showDiagnosesListInside ? <WindowForAddingOptions
        visible={showDiagnosesListOutsid}
        options={diagnoses}
        pressAdd={(selectedOptions: string) => {
          dispatch(EditorActionCreater.createSetShortData(
            'diagnosis',
            `${shortData.diagnosis}${shortData.diagnosis ? '\n' : ''}${selectedOptions}`,
          ))
          dispatch(PetCardsActionCreater.createShowDiagnosesList(false))
        }}
        pressAddOptions={() => null}
        pressClose={() => dispatch(PetCardsActionCreater.createShowDiagnosesList(false))}
        pressRemove={() => null}
        tooltip="диагноз"
      /> : null}
      <div className={cn('content')}>
        <PetCardForm />
        <div className={cn('longData')}>
          <PetCardNavBar />
          <EditorConteiner />
        </div>
      </div>
    </div>
  )
}
