import React from 'react'
import './newPetForm.scss'
import cn from 'classnames'
import {useDispatch} from 'react-redux'
import {ClientsActionCreater} from '../../actions/clientsPageActions'


export const NewPetForm = () => {
  const dispatch = useDispatch()
  return (
    <form className={cn('createNewPet')}>
      <div className={cn('closeForm')}>
        <input
          type="button" value="&#215;" className={cn('сloseForm')}
          onClick={() => dispatch(ClientsActionCreater.createShowNewPetForm(false))}
        />
      </div>
      <div className={cn('master')}>
        <span>Хозяин: {'Лосев Андрей Геннадтевич'}</span>
      </div>
      <div className={cn('petName')}>
        <div aria-label="Кличка" data-microtip-position="bottom-right" role="tooltip">
          <input className={'inputText'} type="text" placeholder="Кличка" />
        </div>
      </div>
      <div
        className={cn('type')}
        aria-label="Вид"
        data-microtip-position="bottom-right"
        role="tooltip">
        <input type="text" className="fild" placeholder="Вид"/>
        <input type="button" className="openFild" value="&#8744;"/>
        <input type="button" value="+" className={cn('addTypePet')}/>
      </div>
      <div className={cn('gender')}
        aria-label="Пол"
        data-microtip-position="bottom-right"
        role="tooltip">
        <input type="text" className="fild" placeholder="Пол"/>
        <input type="button" className="openFild" value="&#8744;"/>
      </div>
      <div
        className={cn('breed')}
        aria-label="Порода"
        data-microtip-position="bottom-right"
        role="tooltip">
        <input type="text" className="fild" placeholder="Порода"/>
        <input type="button" className="openFild" value="&#8744;"/>
        <input type="button" value="+" className={cn('addBreed')}/>
      </div>
      <div className={cn('petColor')}>
        <div aria-label="Окрас" data-microtip-position="bottom-right" role="tooltip">
          <input className={'inputText'} type="text" placeholder="Окрас" />
        </div>
      </div>
      <div className={cn('petAge')}>
        <span className={cn('labelSpan')}>Возраст</span>
        <div aria-label="Лет" data-microtip-position="bottom-right" role="tooltip">
          <input type="number" placeholder="Лет"/>
        </div>
        <div aria-label="Месяцев" data-microtip-position="bottom-right" role="tooltip">
          <input type="number" placeholder="Месяцев"/>
        </div>
        <div aria-label="Дней" data-microtip-position="bottom-right" role="tooltip">
          <input type="number" placeholder="Дней"/>
        </div>
      </div>
      <div>
        <textarea className={cn('notes')} rows={5} value={''} placeholder="Примечания" onChange={() => null}/>
      </div>
      <div className={cn('wrapp', 'submit1')}>
        <input className={'inputSubmit'} type="submit" value="Создать" />
      </div>
    </form>  
  )  
}
