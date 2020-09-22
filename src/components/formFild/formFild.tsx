import React from 'react'
import stls from './formFild.module.scss'


type Props = {
  tooltip?: string | undefined,
  placeholder?: string | undefined,
  type?: 'text' | 'password',
  value?: string,
  id?: string | undefined,
  name?: string | undefined,
  onChange?: (e: React.ChangeEvent<any>) => void,
  // onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void | undefined,
}
// const defoltOnChange = (event: React.ChangeEvent<any>) => event.target.value
export const FormFild: React.FC<Props> = ({tooltip, placeholder, type='text', value='', onChange}) => {
  // const [text, setText] = React.useState(value);
  // React.useEffect(() => setText(value), [value])
  return (
    <div
      className={stls.wrapper}
      aria-label={tooltip}
      data-microtip-position="bottom-right"
      role="tooltip">
      <input
        className={stls.fild} type={type} placeholder={placeholder}
        value={value} onChange={onChange}
      />
    </div>
  )
}
