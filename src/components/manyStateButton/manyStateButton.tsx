import React from 'react'
import stls from './manyStateButton.module.scss'
import cn from 'classnames'

type Props = {
  symbol: string | JSX.Element;
  tooltip?: string;
  initOption: {[x: string]: string};
  responsiveStyle: 'color' | 'bacground' | 'text',
  option: Array<{[x: string]: string}>,
  pressHender: (key: string) => void,
}

export const ManyStateButton: React.FC<Props> = ({
  symbol, tooltip, initOption, responsiveStyle, option, pressHender,
}) => {
  const [showOptions, setShowOptions] = React.useState(false)
  const [currentOption, setOptions] = React.useState(initOption)
  const switchOptions = (style: {[x: string]: string}, e: React.MouseEvent) => {
    e.preventDefault()
    setShowOptions(false)
    setOptions(style)
  }
  const VievOptions = (typeStyele: 'color' | 'bacground' | 'text') => {
    if (typeStyele === 'color') {return option.map(item => ({backgroundColor: Object.values(item)[0]}))}
    else if (typeStyele === 'text') { return option.map(_ => ({backgroundColor: '#e5f0f0'}))}
    else { return option }
  }
  return <div
    className={stls.wrapp}
    aria-label={tooltip}
    data-microtip-position="bottom-right"
    role="tooltip">
      <div className={cn(stls.twoStateButton, stls.active)}
        style={currentOption}
        onMouseDown={(e) => {
          e.preventDefault()
          setShowOptions(!showOptions)
        }}>
        {symbol}
      </div>
      {showOptions
        ? <div className={stls.options}>
            {option.map((item, index) => <div
              className={stls.item} key={index}
              style={VievOptions(responsiveStyle)[index]}
              onMouseDown={(e) => switchOptions(item, e)}>
                {responsiveStyle === "text" && Object.values(item)[0].slice(0, 2)}
            </div>)}
        </div>
        : null
      }
  </div>
}