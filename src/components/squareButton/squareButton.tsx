import React from 'react'
import stls from './squareButton.module.scss'
import cn from 'classnames'

type Props = {
  color: 'green' | 'white',
  symbol: string,
  size: 'size1' | 'size2',
  tooltip?: string | undefined,
  pressHeadnler: (param: any) => void,
}

export const SquareButton: React.FC<Props> = ({color, symbol, size, tooltip=undefined, pressHeadnler}) => {
  return <div
    aria-label={tooltip}
    data-microtip-position="bottom-right"
    role="tooltip"
    className={cn(stls.SquareButton, stls[color], stls[size])}
    onClick={pressHeadnler}>
      {symbol}
    </div>
}
