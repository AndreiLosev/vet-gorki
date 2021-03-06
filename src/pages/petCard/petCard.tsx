import React from 'react'
import cn from 'classnames'
import './petCard.scss'
import {NavigatorContext} from '../../navigation'
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
import {StaticDataActionCreater} from '../../actions/staticDataActions'
import {LoadingSpiner} from '../../components/loadingSpiner/LoadingSpiner'


interface IpartState {
  petCardPage: {
    showDiagnosesList: boolean,
    showDoctorList: boolean,
    showGoalOfRequest: boolean,
    showVisitResult: boolean,
    IsFetching: boolean,
    showTemplate: boolean,
    showPrintOptions: boolean,
    currentVisit: string,
  },
  staticData: {
    diagnoses: string[],
    doctor: string[],
    goalOfRequest: string[],
    visitResult: string[],
    templateNames: string[],
  },
  editor: { shortData: TShortData },
  clientsPage: { currentPet: string },
}

export const PetCard: React.FC<{}> = () => {
  const {partState: {
    showDiagnosesList, diagnoses, shortData, currentPet, showDoctorList, doctor, templateNames, currentVisit,
    showGoalOfRequest, showVisitResult, goalOfRequest, visitResult, IsFetching, showTemplate, showPrintOptions,
  }, dispatch} = useDispatchSelect(
      (partSate: IpartState) => ({
        showDiagnosesList: partSate.petCardPage.showDiagnosesList,
        showDoctorList: partSate.petCardPage.showDoctorList,
        showGoalOfRequest: partSate.petCardPage.showGoalOfRequest,
        showVisitResult: partSate.petCardPage.showVisitResult,
        diagnoses: partSate.staticData.diagnoses,
        doctor: partSate.staticData.doctor,
        shortData: partSate.editor.shortData,
        currentPet: partSate.clientsPage.currentPet,
        goalOfRequest: partSate.staticData.goalOfRequest,
        visitResult: partSate.staticData.visitResult,
        IsFetching: partSate.petCardPage.IsFetching,
        showTemplate: partSate.petCardPage.showTemplate,
        templateNames: partSate.staticData.templateNames,
        showPrintOptions: partSate.petCardPage.showPrintOptions,
        currentVisit: partSate.petCardPage.currentVisit,
      }),
  )
  const {goTo} = React.useContext(NavigatorContext)
  const [showDiagnosesListInside, showDiagnosesListOutsid] = useShowNicely(showDiagnosesList, 1000)
  const [showDoctorListInside, showDoctorListOutsid] = useShowNicely(showDoctorList, 1000)
  const [showGoalOfRequestInside, showGoalOfRequestOutsid] = useShowNicely(showGoalOfRequest, 1000)
  const [showVisitResultInside, showVisitResultOutsid] = useShowNicely(showVisitResult, 1000)
  const [showTemplateInside, showTemplateOutsid] = useShowNicely(showTemplate, 1000)
  const [showPrintOptionsInside, showPrintOptionsOutsid] = useShowNicely(showPrintOptions, 1000)
  if (!currentPet) goTo('clients')
  const [show, setShow] = React.useState(false)
  React.useEffect(() => setShow(true), [])
  const data = [
    {
      visible1: showDiagnosesListInside, visible: showDiagnosesListOutsid, options: diagnoses, tooltip: "диагноз",
      pressAdd : (selectedOptions: string) => {
        dispatch(EditorActionCreater.createSetShortData(
          'diagnosis',
          `${shortData.diagnosis}${shortData.diagnosis ? '\n' : ''}${selectedOptions}`,
        ))
        dispatch(PetCardsActionCreater.createSetBoolData('showDiagnosesList', false))
      },
      pressAddOptions: (options: string[]) =>
        dispatch(StaticDataActionCreater.createSetNewData('diagnoses', options)),
      pressClose: () => dispatch(PetCardsActionCreater.createSetBoolData('showDiagnosesList', false)),
      pressRemove: (options: string[]) =>
        dispatch(StaticDataActionCreater.createSetNewData('doctor', options, true))
    },
    {
      visible1: showDoctorListInside, visible: showDoctorListOutsid, options: doctor, tooltip: "Врачь",
      pressAddOptions: (options: string[]) =>
        dispatch(StaticDataActionCreater.createSetNewData('doctor', options)),
      pressClose: () => dispatch(PetCardsActionCreater.createSetBoolData('showDoctorList', false)),
      pressRemove: (options: string[]) =>
        dispatch(StaticDataActionCreater.createSetNewData('doctor', options, true)),
    },
    {
      visible1: showGoalOfRequestInside, visible: showGoalOfRequestOutsid,
      options: goalOfRequest, tooltip: "Цель везита",
      pressAddOptions: (options: string[]) =>
        dispatch(StaticDataActionCreater.createSetNewData('goalOfRequest', options)),
      pressClose: () => dispatch(PetCardsActionCreater.createSetBoolData('showGoalOfRequest', false)),
      pressRemove: (options: string[]) =>
        dispatch(StaticDataActionCreater.createSetNewData('goalOfRequest', options, true)),
    },
    {
      visible1: showVisitResultInside, visible: showVisitResultOutsid,
      options: visitResult, tooltip: "Результат посещения",
      pressAddOptions: (options: string[]) =>
        dispatch(StaticDataActionCreater.createSetNewData('visitResult', options)),
      pressClose: () => dispatch(PetCardsActionCreater.createSetBoolData('showVisitResult', false)),
      pressRemove: (options: string[]) =>
        dispatch(StaticDataActionCreater.createSetNewData('visitResult', options, true)),
    },
    {
      visible1: showTemplateInside, visible: showTemplateOutsid, options: templateNames, tooltip: "шаблон",
      pressAdd : (selectedOptions: string) => {
        dispatch(StaticDataActionCreater.createGetTemplate(selectedOptions.slice(0, selectedOptions.length)))
        dispatch(PetCardsActionCreater.createSetBoolData('showTemplate', false))
      },
      pressAddOptions: (options: string[]) =>
        dispatch(StaticDataActionCreater.createSetTemplate(options[0])),
      pressClose: () => dispatch(PetCardsActionCreater.createSetBoolData('showTemplate', false)),
      pressRemove: (options: string[]) =>
        dispatch(StaticDataActionCreater.createRemoveTemplate(options[0])),
      singleChoice: true,
    },
    {
      visible1: showPrintOptionsInside, visible: showPrintOptionsOutsid, searchVisible: false, tooltip: "печать",
      options: ['Общие данные', 'Описание лечения', 'Рекомендации и назначения', 'Вакцинация', 'Истрория'],
      pressAdd : (selectedOptions: string) => {
        dispatch(PetCardsActionCreater.createPrintData(currentVisit, selectedOptions.split('\n')))
        goTo('print')
      },
      pressClose: () => dispatch(PetCardsActionCreater.createSetBoolData('showPrintOptions', false)),
    },
  ]
  return (
    <div className={cn('petCardConteiner', {'activePetCard': show}, {'deactivePetCard': !show})}>
      {data.map(item => item.visible1 ? <WindowForAddingOptions key={item.tooltip}
        visible={item.visible} options={item.options} tooltip={item.tooltip}
        pressAddOptions={item.pressAddOptions} pressAdd={item.pressAdd}
        pressRemove={item.pressRemove} pressClose={item.pressClose}
        singleChoice={item.singleChoice}
        searchVisible={item.searchVisible}
      /> : null)}
      {IsFetching ? <LoadingSpiner /> : null}
      <PetCardHeader />
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
