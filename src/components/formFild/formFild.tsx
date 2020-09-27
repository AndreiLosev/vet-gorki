import React from 'react'
import stls from './formFild.module.scss'
import InputMask from "react-input-mask"


type Props = {
  tooltip?: string | undefined,
  placeholder?: string | undefined,
  type?: 'text' | 'password',
  value?: string,
  id?: string | undefined,
  name?: string | undefined,
  mask?: string | (string | RegExp)[],
  error?: string,
  onChange?: (e: React.ChangeEvent<any>) => void,
}

export const FormFild: React.FC<Props> = ({
  tooltip, placeholder, type='text', value='', mask=[/\W/i], onChange, error,
}) => {
  const [blure, setBlure] = React.useState(false);
  return (
    <div
      className={stls.wrapper}
      aria-label={tooltip}
      data-microtip-position="bottom-right"
      role="tooltip">
      <InputMask
        className={stls.fild} type={type} placeholder={placeholder}
        value={value} onChange={onChange} mask={mask} onBlur={() => setBlure(true)}
      />
      {error && blure
        ? <span className={stls.errorMessage}>{error}</span>
        : null}
    </div>
  )
}
