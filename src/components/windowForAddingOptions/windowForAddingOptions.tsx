import React from 'react'
import stls from './windowForAddingOptions.module.scss'
import cn from 'classnames'
import {SquareButton} from '../squareButton/squareButton'

type Props = {
  visible: boolean,
  options: string[],
  tooltip?: string,
  pressAdd?: (actualOptions: string) => void,
  pressRemove: (actualOptions: string[]) => void,
  pressAddOptions: (selectedOptions: string[]) => void,
  pressClose: () => void,
}

export const WindowForAddingOptions: React.FC<Props> = ({
  visible, options, pressAdd, pressAddOptions, pressRemove, pressClose, tooltip
}) => {
  const [search, setSearch] = React.useState('')
  const [cheked, setCheked] = React.useState<boolean[]>(options.map(_ => false))
  const actualDuagnoses = options.filter(item => item.match(new RegExp(search, 'i'))?.input)
  const selectedOptions = actualDuagnoses.filter((_, index) => cheked[index])
  const selectedOptionsStr = selectedOptions.join('\n')
  return (
    <div className={cn(stls.conteiner, {[stls.activDiagnoses]: visible}, {[stls.deactivDiagnoses]: !visible})}>
      <div className={stls.toolbar}>
        <SquareButton color={'white'} symbol="+" size="size2"
          pressHeadnler={() => pressAddOptions([search])} tooltip={`Добавить ${tooltip}`}
        />
        <SquareButton color={'white'} symbol="&#215;" size="size2"
          pressHeadnler={() => pressRemove(selectedOptions)} tooltip={`Удалить ${tooltip}`}
        />
        <input className={stls.search} type="text" placeholder={tooltip}
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
            <input type="checkbox" checked={cheked[index]} readOnly={true} disabled={true}/>
            <span>{item}</span>
          </div>)}
      </div>
      <div className={stls.footer}>
        {pressAdd ? <div className={stls.button}
          onClick={() => pressAdd ? pressAdd(selectedOptionsStr) : null}>
          Добавить
        </div> : null}
        <div className={stls.button}
          onClick={pressClose}>
          Отмена
        </div>
      </div>
    </div>
  )
}
