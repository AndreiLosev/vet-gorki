import React from 'react'
import stls from './formFieldWithOptions.module.scss'
import cn from 'classnames'
import InputMask from "react-input-mask"
import {useShowNicely} from '../../utilites/useShowNicely'


type Props = {
  tooltip?: string | undefined,
  placeholder?: string | undefined,
  type?: 'text' | 'password',
  value?: string,
  id?: string | undefined,
  name?: string | undefined,
  mask?: string | (string | RegExp)[],
  error?: string,
  options: string[],
  onChange?: (e: React.ChangeEvent<any>) => void,
  setValue?: (text: string) => void,
}

export const FormFildWithOptions: React.FC<Props> = ({
  tooltip, placeholder, value='', mask=[/\W/i], onChange, setValue, error, options,
}) => {
  const [showOptions, setShowOptions] = React.useState(false);
  const [blure, setBlure] = React.useState(false);
  const [showInside, showOutsid] = useShowNicely(showOptions, 500)
  return (
    <div
      className={stls.wrapper}
      aria-label={tooltip}
      data-microtip-position="top-right"
      role="tooltip">
      <div>
        <InputMask
          className={cn(stls.fild, {[stls.fildActive]: showOptions})}
          type="text" placeholder={placeholder}
          value={value} onChange={onChange} mask={mask} onBlur={() => setBlure(true)}
        />
        {error && blure
        ? <span className={stls.errorMessage}>{error}</span>
        : null}
        <input
          type="button"
          className={cn(stls.openFild, {[stls.openFildActive]: showOptions})}
          value="&#8744;"
          onClick={() => setShowOptions(!showOptions)}
        />
      </div>
      {showInside
        ? <div className={cn(stls.options, {[stls.active]: showOutsid}, {[stls.deactive]: !showOutsid})}>
            {options.map(item => <span key={item} onClick={() => {
              setValue ? setValue(item) : (() => undefined)()
              setShowOptions(false);
            }}>{item}</span>)}
        </div>
        : null}
    </div>
  )
}
