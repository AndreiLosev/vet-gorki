import React from 'react'
import stls from './manyStateButton.module.scss'
import cn from 'classnames'

type Props = {
  symbol?: string | JSX.Element;
  tooltip?: string;
  currentOption: {[x: string]: string};
  responsiveStyle: 'color' | 'bacground' | 'text',
  option: Array<[string, {[x: string]: string}]>,
  pressHender: (arg1?: any, arg2?: any) => void,
}

export const ManyStateButton: React.FC<Props> = ({
  symbol, tooltip, currentOption, responsiveStyle, option, pressHender,
}) => {
  const [showOptions, setShowOptions] = React.useState(false)
  const VievOptions = (typeStyele: 'color' | 'bacground' | 'text') => {
    if (typeStyele === 'color') { return option.map(item => ({backgroundColor: Object.values(item[1])[0]})) }
    else if (typeStyele === 'text') { return option.map(_ => ({backgroundColor: '#e5f0f0'})) }
    else { return option.map(item => item[1]) }
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
        {symbol ? symbol : Object.values(currentOption)[0].slice(0, 2)}
      </div>
      {showOptions
        ? <div className={stls.options}>
            {option.map((item, index) => <div
              className={stls.item} key={index}
              style={VievOptions(responsiveStyle)[index]}
              onMouseDown={(e) => {
                e.preventDefault()
                pressHender(item[0], e)
                setShowOptions(false)
              }}>
                {responsiveStyle === "text" && Object.values(item[1])[0].slice(0, 2)}
            </div>)}
        </div>
        : null
      }
  </div>
}