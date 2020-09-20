import React from 'react'
import stls from './formFild.module.scss'
// import cn from 'classnames'


type Props = {
  tooltip: string | undefined,
  placeholder: string | undefined,
}

export const FormFild: React.FC<Props> = ({tooltip, placeholder}) => {
  return (
    <div
      className={stls.wrapper}
      aria-label={tooltip}
      data-microtip-position="bottom-right"
      role="tooltip">
      <input className={stls.fild} type="text" placeholder={placeholder}/>
    </div>
  )
}
