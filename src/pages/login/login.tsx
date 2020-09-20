import React from 'react'
import cn from 'classnames'
import './login.scss'
import {FormFild} from '../../components/formFild/formFild'
import {FormSubmit} from '../../components/formSubmit/formSubmit'


export const Login: React.FC = () => {
  return (
    <div className={cn('loginConteiner')}>
      <form className={cn('formBorder')}>
        <div className={cn('loginHeader')}>
          <span className={cn('text')}>VSI City department of the Goretsk district veterinary station</span>
        </div>
        <div className={cn('wrapp', 'text1')}>
          <FormFild tooltip={undefined}  type="text" placeholder="Username" />
        </div>
        <div className={cn('wrapp', 'text1')}>
          <FormFild tooltip={undefined} type="password" placeholder="Password" />
        </div>
        <div className={cn('wrapp', 'submit1')}>
          <FormSubmit text="Sign in" />
        </div>
      </form>
      <div className={cn('buffer')}></div>
    </div>
  )
}
