import React from 'react'
import cn from 'classnames'
import './petCard.scss'
import {useDispatchSelect} from '../../utilites/useDispatchSelect'
import {Lib} from '../../utilites/lib'
import {PetCardHeader} from '../../components/petCardHeader/petCardHeader'
import {PetCardForm} from '../../components/petCardForm/petCardForm'
import {PetCardNavBar} from '../../components/petCardNavBar/petCardNavBar'
import {EditorConteiner} from '../../components/editor/editor'
import {Diagnoses} from '../../components/diagnoses/diagnoses'


interface IpartState {
  petCardPage: {
    showDiagnosesList: boolean,
  },
}

export const PetCard: React.FC<{}> = () => {
  const {partState: {showDiagnosesList}} = useDispatchSelect(
    (partSate: IpartState) => ({showDiagnosesList: partSate.petCardPage.showDiagnosesList}),
  )
  const [showDiagnosesListInside, setShowDiagnosesListInside] = React.useState(showDiagnosesList)
  const [showDiagnosesListOutsid, setShowDiagnosesListOutsid] = React.useState(showDiagnosesList)
  React.useEffect(() => {
    Lib.showNicely(showDiagnosesList, setShowDiagnosesListInside, setShowDiagnosesListOutsid)
  }, [showDiagnosesList])
  return (
    <div className={cn('petCardConteiner')}>
      <PetCardHeader />
      {showDiagnosesListInside ? <Diagnoses visible={showDiagnosesListOutsid} /> : null}
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
