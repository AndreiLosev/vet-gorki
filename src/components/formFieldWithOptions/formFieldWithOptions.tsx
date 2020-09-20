import React from 'react'
import stls from './formFieldWithOptions.module.scss'
import cn from 'classnames'


type Props = {
  tooltip: string | undefined,
  placeholder: string | undefined,
  options: string[],
}

export const FormFildWithOptions: React.FC<Props> = ({tooltip, placeholder, options}) => {
  const [showOptions, setShowOptions] = React.useState(false);
  const [text, setText] = React.useState('');
  return (
    <div
      className={stls.wrapper}
      aria-label={tooltip}
      data-microtip-position="bottom-right"
      role="tooltip">
      <div>
        <input
          className={cn(stls.fild, {[stls.fildActive]: showOptions})}
          type="text" placeholder={placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="button"
          className={cn(stls.openFild, {[stls.openFildActive]: showOptions})}
          value="&#8744;"
          onClick={() => setShowOptions(true)}
        />
      </div>
      {showOptions
        ? <div className={stls.options}>
            {options.map(item => <span key={item} onClick={() => {
              setText(item);
              setShowOptions(false);
            }}>{item}</span>)}
        </div>
        : null}
    </div>
  )
}
