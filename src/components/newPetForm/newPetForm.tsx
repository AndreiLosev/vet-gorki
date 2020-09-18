import React from 'react'
import s from './newPetForm.module.scss'
import cn from 'classnames'
import {useDispatch} from 'react-redux'
import {ClientsActionCreater} from '../../actions/clientsPageActions'


export const NewPetForm = () => {
  const dispatch = useDispatch()
  return (
    <form className={cn(s.createNewClient)}>
      <div className={cn(s.closeForm)}>
        <input
          type="button" value="&#215;"
          onClick={() => dispatch(ClientsActionCreater.createShowNewPetForm(false))}
        />
      </div>
      <div className={cn(s.wrapp, s.text1)}>
        <span>Хозяин: {'Лосев Андрей Геннадьевич'}</span>
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
