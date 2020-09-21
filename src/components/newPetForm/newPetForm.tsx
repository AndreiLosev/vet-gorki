import React from 'react'
import stls from './newPetForm.module.scss'
import {useDispatch} from 'react-redux'
import {SquareButton} from '../squareButton/squareButton'
import {FormFild} from '../formFild/formFild'
import {FormFildWithOptions} from '../formFieldWithOptions/formFieldWithOptions'
import {FormFildAddOptions} from '../formFildAddOptions/formFildAddOptions'
import {FormSubmit} from '../formSubmit/formSubmit'
import {ClientsActionCreater} from '../../actions/clientsPageActions'


export const NewPetForm = () => {
  const dispatch = useDispatch()
  return (
    <form className={stls.createNewPet}>
      <div className={stls.closeForm}>
        <SquareButton color="green" symbol="&#215;" size="size1" tooltip={undefined}
          pressHeadnler={() => dispatch(ClientsActionCreater.createShowNewPetForm(false))}
        />
      </div>
      <div className={stls.wrapp}>
        <span className={stls.master}>Хозяин: {'Лосев Андрей Геннадтевич'}</span>
      </div>
      <div className={stls.wrapp}>
        <FormFild tooltip="Кличка" placeholder="Кличка" type="text"/>
      </div>
      <div className={stls.wrapp}>
        <FormFildAddOptions tooltip="Вид" placeholder="Вид" options={['кот', 'собака', 'хомяк']} />
      </div>
      <div className={stls.wrapp}>
        <FormFildWithOptions tooltip="Пол" placeholder="Пол" options={['М', 'Ж']}/>
      </div>
      <div className={stls.wrapp}>
        <FormFildAddOptions tooltip="Порода" placeholder="Порода"
          options={['бульдог', 'доберман', 'подмышка бомжачья']}
        />
      </div>
      <div className={stls.wrapp}>
        <FormFild tooltip="Окрас" placeholder="Окрас" type="text"/>
      </div>
      <div className={stls.petAge}>
        <FormFild tooltip="Лет" placeholder="Лет" type="text"/>
        <FormFild tooltip="Месяцев" placeholder="Месяцев" type="text"/>
        <FormFild tooltip="Дней" placeholder="Дней" type="text"/>
      </div>
      <div className={stls.wrapp}>
        <textarea className={stls.notes} rows={8} value={''} placeholder="Примечания" onChange={() => null}/>
      </div>
      <div className={stls.wrapp}>
        <FormSubmit text="Создать" />
      </div>
    </form>
  )
}
