import React from 'react'
import stls from './formFild.module.scss'


type Props = {
  tooltip?: string | undefined,
  placeholder?: string | undefined,
  type?: 'text' | 'password',
  value?: string,
}

export const FormFild: React.FC<Props> = ({tooltip, placeholder, type='text', value=''}) => {
  const [text, setText] = React.useState(value);
  React.useEffect(() => setText(value), [value])
  return (
    <div
      className={stls.wrapper}
      aria-label={tooltip}
      data-microtip-position="bottom-right"
      role="tooltip">
      <input
        className={stls.fild} type={type} placeholder={placeholder}
        value={text} onChange={(e) => setText(e.target.value)}
      />
    </div>
  )
}
