import React from 'react'
import stls from './petCardForm.module.scss'
import {useDispatchSelect} from '../../utilites/useDispatchSelect'
import {TShortData} from '../../redusers/editorReduser'
import {EditorActionCreater} from '../../actions/editorActions'
import {SquareButton} from '../squareButton/squareButton'
import {FormFild} from '../formFild/formFild'
import {FormFildWithOptions} from '../formFieldWithOptions/formFieldWithOptions'
import {Lib} from '../../utilites/lib'

interface IpartState {editor: {shortData: TShortData}}

export const PetCardForm = () => {
  const {partState: {shortData}, dispatch} = useDispatchSelect((partSate: IpartState) =>
    ({shortData: partSate.editor.shortData}))
  const inputRef = React.useRef<any>(null)
  React.useEffect(() => {
    dispatch(EditorActionCreater.createSetShortData('date', Lib.converDate(Date.now())))
  }, [dispatch])
  React.useEffect(() => {
    if (inputRef.current instanceof HTMLInputElement)
    inputRef.current.setSelectionRange(shortData.weight.length, shortData.weight.length)
  }, [shortData.weight])
  const [diagnoses, setDiagnoses] = React.useState('')
  const extractingMeaning = (str: string) => {
    const result = /\d*[.,]?[0-9]*/g.exec(str)
    return result ? result[0] : ''
  }
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
      <div className={stls.wrapp} ref={inputRef} onClick={(e) => { inputRef.current = e.target }}>
        <div className={stls.space}>
          <FormFild placeholder="Вес (кг)" tooltip="Вес (кг)"
          value={shortData.weight ? `${shortData.weight} кг` : ''}
            onChange={(e: React.ChangeEvent<any>) =>
              dispatch(EditorActionCreater.createSetShortData('weight', extractingMeaning(e.target.value)))
            }
          />
          <FormFild placeholder="t (&#176;С)" tooltip="t (&#176;С)"/>
        </div>
      </div>
      <div className={stls.wrapp}>
        <FormFildWithOptions
          placeholder="Цель обращения" tooltip="Цель обращения"
          options={['проблемма', 'болит', 'прививку']}
        />
      </div>
      <div className={stls.wrapp}>
        <FormFildWithOptions
          placeholder="Результат посещения" tooltip="Результат посещения"
          options={['проблемма', 'болит', 'прививку']}
        />
      </div>
      <div className={stls.diagnoses}>
        <div className={stls.header}>
          <div>Диагноз:</div>
          <SquareButton color="green" symbol="+" size="size1"
            pressHeadnler={() => null}
          />
        </div>
        <textarea
          className={stls.diagnosesFild} rows={15}
          value={diagnoses} onChange={e => setDiagnoses(e.target.value)}
        />
      </div>
      <div className={stls.wrapp}>
        <FormFildWithOptions
          placeholder="Врач" tooltip="Врач"
          options={['доктор №1', 'доктор №2', 'Кристина']}
        />
      </div>
      <div className={stls.DateBirth}>
        <span>Возраст:</span>
        <span>99л 6м</span>
      </div>
    </div>
  )
}
