import React from 'react'
import stls from './formFild.module.scss'
// import cn from 'classnames'


type Props = {
  tooltip?: string | undefined,
  placeholder?: string | undefined,
  type?: 'text' | 'password',
  value?: string | undefined,
}

export const FormFild: React.FC<Props> = ({tooltip, placeholder, type='text', value=''}) => {
  return (
    <div
      className={stls.wrapper}
      aria-label={tooltip}
      data-microtip-position="bottom-right"
      role="tooltip">
      <input className={stls.fild} type={type} placeholder={placeholder} value={value}/>
    </div>
  )
}
