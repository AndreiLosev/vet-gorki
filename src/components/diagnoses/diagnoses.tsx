import React from 'react'
import stls from './diagnoses.module.scss'
import cn from 'classnames'
import {useDispatchSelect} from '../../utilites/useDispatchSelect'
import {SquareButton} from '../squareButton/squareButton'
import {PetCardsActionCreater} from '../../actions/petCardActions'

type Props = { visible: boolean }

interface IpartState {
  staticData: { diagnoses: string[] },
}
export const Diagnoses: React.FC<Props> = ({visible}) => {
  const {partState: {diagnoses}, dispatch} = useDispatchSelect((partState: IpartState) => ({diagnoses: partState.staticData.diagnoses}))
  const [search, setSearch] = React.useState('')
  return (
    <div className={cn(stls.conteiner, {[stls.activDiagnoses]: visible}, {[stls.deactivDiagnoses]: !visible})}>
      <div className={stls.toolbar}>
        <SquareButton color={'white'} symbol="+" size="size2" pressHeadnler={() => null} tooltip="Добавить диагноз"/>
        <SquareButton color={'white'} symbol="&#215;" size="size2" pressHeadnler={() => null} tooltip="Удалить диагноз"/>
        <input className={stls.search} type="text" placeholder="Диагноз"
          value={search} onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className={stls.content}>
        {diagnoses.filter(_ => true).sort().map(item => <div className={stls.item} key={item}>
            <input type="checkbox"/> <span>{item}</span>
          </div>)}
      </div>
      <div className={stls.footer}>
        <div className={stls.button}>Добавить</div>
        <div className={stls.button}
          onClick={() => dispatch(PetCardsActionCreater.createShowDiagnosesList(false))}>
          Отмена
        </div>
      </div>
    </div>
  )
}
