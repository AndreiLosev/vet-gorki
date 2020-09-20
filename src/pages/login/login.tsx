import React from 'react'
import cn from 'classnames'
import './login.scss'
import {FormSubmit} from '../../components/formSubmit/formSubmit'


export const Login: React.FC = () => {
  return (
    <div className={cn('loginConteiner')}>
      <div className="testFild">
        <FormSubmit text="hello" />
      </div>
      <form className={cn('formBorder')}>
        <div className={cn('loginHeader')}>
          <span className={cn('text')}>VSI City department of the Goretsk district veterinary station</span>
        </div>
        <div className={cn('wrapp', 'text1')}>
          <input className={'inputText'} type="text" placeholder="Username" />
        </div>
        <div className={cn('wrapp', 'text1')}>
          <input  className={'inputText'} type="password" placeholder="Password" />
        </div>
        <div className={cn('wrapp', 'submit1')}>
          <input className={'inputSubmit'} type="submit" value="Sign in" />
        </div>
      </form>
      <div className={cn('buffer')}></div>
    </div>
  )
}
