import React from 'react'
import stls from './twoStateButton.module.scss'
import cn from 'classnames'

type Props = {
  symbol: string | JSX.Element;
  tooltip?: string;
  active: boolean;
  square?: boolean;
  key1: string;
  pressHender: (arg1?: any, arg2?: any) => void
}

export const  TwoStateButton: React.FC<Props> = ({symbol, active, square, key1, tooltip, pressHender}) => {
  return <div
    aria-label={tooltip}
    data-microtip-position="bottom-right"
    role="tooltip"
    className={cn(stls.twoStateButton, {[stls.active]: active}, {[stls.deactive]: !active}, {[stls.square]: square})}
    onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => pressHender(key1, e)}>
    {symbol}
  </div>
}
