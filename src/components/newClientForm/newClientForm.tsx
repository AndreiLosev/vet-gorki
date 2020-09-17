import React from 'react'
import './newClientForm.scss'
import cn from 'classnames'


export const NewClientForm = () => {
  return (
    <form className={cn('createNewClient')}>
      <div className={cn('wrapp', 'text1')}>
        <div aria-label="Имя клиента" data-microtip-position="bottom-right" role="tooltip">
          <input className={'inputText'} type="text" placeholder="Имя" />
        </div>
      </div>
      <div className={cn('wrapp', 'text1')}>
        <div aria-label="Фамилия клиента" data-microtip-position="bottom-right" role="tooltip">
          <input className={'inputText'} type="text" placeholder="фамилия" />
        </div>
      </div>
      <div className={cn('wrapp', 'text1')}>
        <div aria-label="Отчество клиента" data-microtip-position="bottom-right" role="tooltip">
          <input className={'inputText'} type="text" placeholder="Отчество" />
        </div>
      </div>
      <div className={cn('wrapp', 'text1')}>
        <div aria-label="Телефон клиента" data-microtip-position="bottom-right" role="tooltip">
          <input className={'inputText'} type="text" placeholder="Телефон" />
        </div>
      </div>
      <div className={cn('wrapp', 'text1')}>
        <div aria-label="Населённый пункт клиента" data-microtip-position="bottom-right" role="tooltip">
          <input className={'inputText'} type="text" placeholder="Населённый пункт" />
        </div>
      </div>
      <div className={cn('wrapp', 'text1')}>
        <div aria-label="Улица клиента" data-microtip-position="bottom-right" role="tooltip">
          <input className={'inputText'} type="text" placeholder="Улица" />
        </div>
      </div>
      <div className={cn('wrapp', 'text1')}>
        <div aria-label="№ дома клиента" data-microtip-position="bottom-right" role="tooltip">
          <input className={'inputText'} type="text" placeholder="№ дома" />
        </div>
      </div>
      <div className={cn('wrapp', 'text1')}>
        <div aria-label="№ квартиры клиента" data-microtip-position="bottom-right" role="tooltip">
          <input className={'inputText'} type="text" placeholder="№ Квартиры" />
        </div>
      </div>
      <div className={cn('wrapp', 'submit1')}>
        <input className={'inputSubmit'} type="submit" value="Создать" />
      </div>
    </form>  
  )  
}
