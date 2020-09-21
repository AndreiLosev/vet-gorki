import React from 'react'
import stls from './newClientForm.module.scss'
import {useDispatch} from 'react-redux'
import {SquareButton} from '../squareButton/squareButton'
import {FormFild} from '../formFild/formFild'
import {FormSubmit} from '../formSubmit/formSubmit'
import {ClientsActionCreater} from '../../actions/clientsPageActions'


export const NewClientForm = () => {
  const dispatch = useDispatch()
  const contentData = [
    {tooltip: "Имя клиента", placeholder: "Имя"},
    {tooltip: "Фамилия клиента", placeholder: "Фамилия"},
    {tooltip: "Отчество клиента", placeholder: "Отчество"},
    {tooltip: "Телефон клиента", placeholder: "Телефон"},
    {tooltip: "Населённый пункт клиента", placeholder: "Населённый пункт"},
    {tooltip: "Улица клиента", placeholder: "Улица"},
    {tooltip: "№ дома клиента", placeholder: "№ Дома"},
    {tooltip: "№ квартиры клиента", placeholder: "№ Квартиры"},
  ]
  return (
    <form className={stls.createNewClient}>
      <div className={stls.closeForm}>
        <SquareButton color="green" symbol="&#215;" size="size1" tooltip={undefined}
          pressHeadnler={() => dispatch(ClientsActionCreater.createShowNewClientForm(false))}
        />
      </div>
      {contentData.map(item => (
        <div className={stls.wrapp} key={item.placeholder}>
          <FormFild tooltip={item.tooltip} placeholder={item.placeholder} />
        </div>
      ))}
      <div className={stls.wrapp}>
        <FormSubmit text="Создать" />
      </div>
    </form>
  )
}
