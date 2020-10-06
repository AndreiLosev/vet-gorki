import React from 'react'
import stls from './twoStateButtonWithOption.module.scss'
import cn from 'classnames'

type Props = {
  symbol: string | JSX.Element;
  tooltip?: string;
  active: boolean;
  square?: boolean;
  key1: string;
  initColor: string;
  pressHender: (key: string) => void
}

export const TwoStateButtonWithOption: React.FC<Props> = ({
  symbol, active, square, key1, tooltip, initColor, pressHender
}) => {
  const [showOptions, setShowOptions] = React.useState(false)
  const [color, setColor] = React.useState({backgroundColor: initColor})
  const switchColor = (color: string) => {
    setShowOptions(false)
    setColor({backgroundColor: color})
  }
  return <div
    className={stls.wrapp}
    aria-label={tooltip}
    data-microtip-position="bottom-right"
    role="tooltip">
      <div className={cn(
        stls.twoStateButton, {[stls.active]: active}, {[stls.deactive]: !active}, {[stls.square]: square}
        )}
        onClick={() => pressHender(key1)}>
        {symbol}
      </div>
      <input
        type="button"
        style={color}
        className={cn(stls.openFild, {[stls.openFildActive]: showOptions})}
        value="&#8744;"
        onClick={() => setShowOptions(!showOptions)}
      />
      {showOptions
        ? <div className={stls.options}>
            <div className={stls.item} onClick={() => switchColor('#800')} />
            <div className={stls.item} onClick={() => switchColor('#ffa500')} />
            <div className={stls.item} onClick={() => switchColor('#ff0')} />
            <div className={stls.item} onClick={() => switchColor('#080')} />
            <div className={stls.item} onClick={() => switchColor('#00f')} />
            <div className={stls.item} onClick={() => switchColor('#0ff')} />
            <div className={stls.item} onClick={() => switchColor('#ee8aee')} />
            <div className={stls.item} onClick={() => switchColor('#fff')} />
            <div className={stls.item} onClick={() => switchColor('#000')} />
        </div>
        : null
      }
  </div>
}