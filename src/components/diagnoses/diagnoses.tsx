import React from 'react'
import stls from './diagnoses.module.scss'
import cn from 'classnames'
import {SquareButton} from '../squareButton/squareButton'
import {useSelector} from 'react-redux'

type Props = { visible: boolean }

interface IpartState {
  staticData: { diagnoses: string[] },
}
export const Diagnoses: React.FC<Props> = ({visible}) => {
  const {diagnoses} = useSelector((partState: IpartState) => ({diagnoses: partState.staticData.diagnoses}))
  const [search, setSearch] = React.useState('')
  return (
    <div className={cn(stls.conteiner, {[stls.activDiagnoses]: visible}, {[stls.deactivDiagnoses]: !visible})}>
      <div className={stls.toolbar}>
        <SquareButton color={'white'} symbol="+" size="size2" pressHeadnler={() => null}/>
        <input className={stls.search} type="text" placeholder="ФИО, Адрес, Телефон"
          value={search} onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className={stls.content}>
        {diagnoses.filter(_ => true).sort().map(item => <div>{item}</div>)}
      </div>
      <div className={stls.footer}>
        <div className={stls.buttonOk}>Добавить</div>
        <div className={stls.buttonNot}>Отмена</div>
      </div>
    </div>
  )
}
