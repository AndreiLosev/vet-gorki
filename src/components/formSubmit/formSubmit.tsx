import React from 'react'
import stls from './formSubmit.module.scss'
// import cn from 'classnames'


type Props = {
  text: string,
}

export const FormSubmit: React.FC<Props> = ({text}) => {
  return (
    <div className={stls.wrapper}>
      <input type="button" value={text}/>    
    </div>
  )
}
