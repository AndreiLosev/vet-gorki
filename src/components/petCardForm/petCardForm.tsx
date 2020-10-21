import React from 'react'
import stls from './petCardForm.module.scss'
import {useDispatchSelect} from '../../utilites/useDispatchSelect'
import {TShortData} from '../../redusers/editorReduser'
import {TStaticDataState} from '../../redusers/staticDataReduser'
import {EditorActionCreater} from '../../actions/editorActions'
import {PetCardsActionCreater} from '../../actions/petCardActions'
import {SquareButton} from '../squareButton/squareButton'
import {FormFild} from '../formFild/formFild'
import {FormFildWithOptions} from '../formFieldWithOptions/formFieldWithOptions'
import {Lib} from '../../utilites/lib'

interface IpartState {
  editor: {shortData: TShortData},
  staticData: TStaticDataState,
}

export const PetCardForm = () => {
  const {partState: {shortData, staticData}, dispatch} = useDispatchSelect((partState: IpartState) => ({
    shortData: partState.editor.shortData,
    staticData: partState.staticData,
  }))

  const inputRef = React.useRef<any>(null)

  React.useEffect(() => {
    dispatch(EditorActionCreater.createSetShortData('date', Lib.converDate(Date.now())))
  }, [dispatch])

  React.useEffect(() => {
    if (inputRef.current instanceof HTMLInputElement)
    inputRef.current.setSelectionRange(shortData.weight.length, shortData.weight.length)
  }, [shortData.weight])
  React.useEffect(() => {
    if (inputRef.current instanceof HTMLInputElement)
    inputRef.current.setSelectionRange(shortData.temperature.length, shortData.temperature.length)
  }, [shortData.temperature])
  return (
    <div className={stls.shortData}>
      <div className={stls.wrapp}>
        <div className={stls.space}>
          <SquareButton color="green" symbol="&#8987;" size="size1" tooltip="Обновить дату"
            pressHeadnler={() => dispatch(EditorActionCreater.createSetShortData('date', Lib.converDate(Date.now())))}
          />
          <FormFild value={shortData.date} mask='99:99 99.99.9999'
            onChange={(e: React.ChangeEvent<any>) =>
              dispatch(EditorActionCreater.createSetShortData('date', e.target.value))}
          />
        </div>
      </div>
      <div className={stls.wrapp} ref={inputRef} onFocus={(e) => { inputRef.current = e.target }}>
        <div className={stls.space}>
          <FormFild placeholder="Вес (кг)" tooltip="Вес (кг)"
          value={shortData.weight ? `${shortData.weight} кг` : ''}
            onChange={(e: React.ChangeEvent<any>) =>
              dispatch(EditorActionCreater.createSetShortData('weight', Lib.extractingMeaning(e.target.value)))
            }
          />
          <FormFild placeholder="t (&#176;С)" tooltip="t (&#176;С)"
            value={shortData.temperature ? `${shortData.temperature} ${String.fromCharCode(parseInt('B0', 16))}С` : ''}
            onChange={(e: React.ChangeEvent<any>) =>
              dispatch(EditorActionCreater.createSetShortData('temperature', Lib.extractingMeaning(e.target.value)))}
          />
        </div>
      </div>
      <div className={stls.wrapp}>
        <FormFildWithOptions
          placeholder="Цель обращения" tooltip="Цель обращения"
          value={shortData.goalOfRequest}
          onChange={(e: React.ChangeEvent<any>) =>
            dispatch(EditorActionCreater.createSetShortData('goalOfRequest', e.target.value))}
          setValue={(option: string) => dispatch(EditorActionCreater.createSetShortData('goalOfRequest', option))}
          options={staticData.goalOfRequest}
        />
      </div>
      <div className={stls.wrapp}>
        <FormFildWithOptions
          placeholder="Результат посещения" tooltip="Результат посещения"
          value={shortData.visitResult}
          onChange={(e: React.ChangeEvent<any>) =>
            dispatch(EditorActionCreater.createSetShortData('visitResult', e.target.value))}
          setValue={(option: string) => dispatch(EditorActionCreater.createSetShortData('visitResult', option))}
          options={staticData.visitResult}
        />
      </div>
      <div className={stls.diagnoses}>
        <div className={stls.header}>
          <div>Диагноз:</div>
          <SquareButton color="green" symbol="+" size="size1"
            pressHeadnler={() => dispatch(PetCardsActionCreater.createSetBoolData('showDiagnosesList', true))}
          />
        </div>
        <textarea
          className={stls.diagnosesFild} rows={15}
          value={shortData.diagnosis}
          onChange={e => dispatch(EditorActionCreater.createSetShortData('diagnosis', e.target.value))}
        />
      </div>
      <div className={stls.wrapp}>
        <FormFildWithOptions
          placeholder="Врач" tooltip="Врач"
          value={shortData.doctor}
          onChange={(e: React.ChangeEvent<any>) =>
            dispatch(EditorActionCreater.createSetShortData('doctor', e.target.value))}
            setValue={(option: string) => dispatch(EditorActionCreater.createSetShortData('doctor', option))}
          options={staticData.doctor}
        />
      </div>
      <div className={stls.DateBirth}>
        <span>Возраст:</span>
        <span>99л 6м</span>
      </div>
      <div className={stls.DateBirth}>
        <span>Кострация:</span>
        <span>Да</span>
      </div>
    </div>
  )
}
