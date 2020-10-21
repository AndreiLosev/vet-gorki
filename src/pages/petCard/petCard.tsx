import React from 'react'
import cn from 'classnames'
import './petCard.scss'
import {Redirect} from 'react-router-dom'
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
  petCardPage: {
    showDiagnosesList: boolean,
    showDoctorList: boolean,
  },
  staticData: {
    diagnoses: string[],
    doctor: string[],
  },
  editor: { shortData: TShortData },
  clientsPage: { currentPet: string },
}

export const PetCard: React.FC<{}> = () => {
  const {partState: {
    showDiagnosesList, diagnoses, shortData, currentPet, showDoctorList, doctor,
  }, dispatch} = useDispatchSelect(
      (partSate: IpartState) => ({
        showDiagnosesList: partSate.petCardPage.showDiagnosesList,
        showDoctorList: partSate.petCardPage.showDoctorList,
        diagnoses: partSate.staticData.diagnoses,
        doctor: partSate.staticData.doctor,
        shortData: partSate.editor.shortData,
        currentPet: partSate.clientsPage.currentPet,
      }),
  )
  const [showDiagnosesListInside, showDiagnosesListOutsid] = useShowNicely(showDiagnosesList, 1000)
  const [showDoctorListInside, showDoctorListOutsid] = useShowNicely(showDoctorList, 1000)
  const [show, setShow] = React.useState(false)
  React.useEffect(() => { setShow(true) }, [])
  return (
    <div className={cn('petCardConteiner', {'activePetCard': show}, {'deactivePetCard': !show})}>
      {currentPet ? null : <Redirect to='/clients' />}
      <PetCardHeader />
      {showDiagnosesListInside ? <WindowForAddingOptions
        visible={showDiagnosesListOutsid}
        options={diagnoses}
        pressAdd={(selectedOptions: string) => {
          dispatch(EditorActionCreater.createSetShortData(
            'diagnosis',
            `${shortData.diagnosis}${shortData.diagnosis ? '\n' : ''}${selectedOptions}`,
          ))
          dispatch(PetCardsActionCreater.createSetBoolData('showDiagnosesList', false))
        }}
        pressAddOptions={() => null}
        pressClose={() => dispatch(PetCardsActionCreater.createSetBoolData('showDiagnosesList', false))}
        pressRemove={() => null}
        tooltip="диагноз"
      /> : null}
      {showDoctorListInside ? <WindowForAddingOptions
        visible={showDoctorListOutsid}
        options={doctor}
        pressAddOptions={() => null}
        pressClose={() => dispatch(PetCardsActionCreater.createSetBoolData('showDoctorList', false))}
        pressRemove={() => null}
        tooltip="Врачь"
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
