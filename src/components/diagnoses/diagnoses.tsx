import React from 'react'
import stls from './diagnoses.module.scss'
import cn from 'classnames'
import {useDispatchSelect} from '../../utilites/useDispatchSelect'
import {EditorActionCreater} from '../../actions/editorActions'
import {TShortData} from '../../redusers/editorReduser'
import {SquareButton} from '../squareButton/squareButton'
import {PetCardsActionCreater} from '../../actions/petCardActions'

type Props = { visible: boolean }

interface IpartState {
  staticData: { diagnoses: string[] },
  editor: { shortData: TShortData},
}
export const Diagnoses: React.FC<Props> = ({visible}) => {
  const {partState: {diagnoses, shortData}, dispatch} = useDispatchSelect((partState: IpartState) => ({
    diagnoses: partState.staticData.diagnoses,
    shortData: partState.editor.shortData,
  }))
  const [search, setSearch] = React.useState('')
  const [cheked, setCheked] = React.useState<boolean[]>(diagnoses.map(_ => false))
  const actualDuagnoses = diagnoses.filter(item => item.match(new RegExp(search, 'i'))?.input)
  React.useEffect(() => {
    setCheked(actualDuagnoses.map(_ => false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])
  return (
    <div className={cn(stls.conteiner, {[stls.activDiagnoses]: visible}, {[stls.deactivDiagnoses]: !visible})}>
      <div className={stls.toolbar}>
        <SquareButton color={'white'} symbol="+" size="size2"
          pressHeadnler={() => null} tooltip="Добавить диагноз"
        />
        <SquareButton color={'white'} symbol="&#215;" size="size2"
          pressHeadnler={() => null} tooltip="Удалить диагноз"
        />
        <input className={stls.search} type="text" placeholder="Диагноз"
          value={search} onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className={stls.content}>
        {actualDuagnoses.sort().map((item, index) => <div
            className={stls.item} key={item}
            onClick={() => setCheked(prev => {
              const nextState = [...prev]
              nextState[index] = !prev[index]
              return nextState
            })}>
            <input type="checkbox" checked={cheked[index]} readOnly={true}/>
            <span>{item}</span>
          </div>)}
      </div>
      <div className={stls.footer}>
        <div className={stls.button}
          onClick={() => {
            dispatch(EditorActionCreater.createSetShortData(
              'diagnosis',
              `${shortData.diagnosis}${shortData.diagnosis && '\n'}${actualDuagnoses
                  .filter((_, i) => cheked[i]).join('\n')}`,
            ))
            dispatch(PetCardsActionCreater.createShowDiagnosesList(false))
          }}>
          Добавить
        </div>
        <div className={stls.button}
          onClick={() => dispatch(PetCardsActionCreater.createShowDiagnosesList(false))}>
          Отмена
        </div>
      </div>
    </div>
  )
}
