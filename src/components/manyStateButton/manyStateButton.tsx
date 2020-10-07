import React from 'react'
import stls from './manyStateButton.module.scss'
import cn from 'classnames'

type Props = {
  symbol: string | JSX.Element;
  tooltip?: string;
  active: boolean;
  initColor: string;
  responsiveСolor: 'font' | 'bacground',
  pressHender: (key: string) => void
}

export const ManyStateButton: React.FC<Props> = ({
  symbol, tooltip, initColor, responsiveСolor, pressHender
}) => {
  const switchColor1 = responsiveСolor === 'font'
    ? 'color'
    : 'backgroundColor'
  const [showOptions, setShowOptions] = React.useState(false)
  const [color, setColor] = React.useState({[switchColor1]: initColor})
  const switchColor = (color: string) => {
    setShowOptions(false)
    setColor({[switchColor1]: color})
  }
  return <div
    className={stls.wrapp}
    aria-label={tooltip}
    data-microtip-position="bottom-right"
    role="tooltip">
      <div className={cn(stls.twoStateButton, stls.active)}
        style={color}
        onClick={() => setShowOptions(!showOptions)}>
        {symbol}
      </div>
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