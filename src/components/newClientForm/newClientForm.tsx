import React from 'react'
import stls from './newClientForm.module.scss'
import {useDispatchSelect} from '../../utilites/useDispatchSelect'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import cn from 'classnames'
import {SquareButton} from '../squareButton/squareButton'
import {FormFild} from '../formFild/formFild'
import {FormSubmit} from '../formSubmit/formSubmit'
import {ClientsActionCreater} from '../../actions/clientsPageActions'
import {IClient} from '../../redusers/clientsPageReduser'
import {Lib} from '../../utilites/lib'

export interface IinitialClientForm {
  name: string;
  surname: string;
  patronymic: string;
  phone: string;
  locality: string;
  street: string;
  house: string;
  flat: string;
  notes: string;
}

type Props = { visible: boolean }

interface IpartState {
  clientsPage: {
    clientEditing: boolean,
    currentClient: string,
    clients: {[index: string]: IClient},
  },
}

export const NewClientForm: React.FC<Props> = ({visible}) => {
  const {partState: {clientEditing, currentClient, clients}, dispatch} = useDispatchSelect(
    (partState: IpartState) => ({
      clientEditing: partState.clientsPage.clientEditing,
      currentClient: partState.clientsPage.currentClient,
      clients: partState.clientsPage.clients,
    }),
  )
  const formik = useFormik<IinitialClientForm>({
    initialValues: {
      name: clientEditing ? clients[currentClient].name : '',
      surname: clientEditing ? clients[currentClient].surname : '',
      patronymic: clientEditing ? clients[currentClient].patronymic : '',
      locality: clientEditing ? clients[currentClient].locality : 'Горки',
      street: clientEditing ? clients[currentClient].street : '',
      house: clientEditing ? clients[currentClient].house : '',
      flat: clientEditing ? clients[currentClient].flat : '',
      notes: clientEditing ? clients[currentClient].notes : '',
      phone: clientEditing ? Lib.phoneToDisplay(clients[currentClient].phone) : '',
    },
    validationSchema: Yup.object({
      surname: Yup.string()
        .required('Это поле обязательно для заполнения'),
      locality: Yup.string()
        .required('Это поле обязательно для заполнения'),
    }),
    onSubmit: async values => {
      const convertedPhone = values.phone.match(/\d+/g)?.join('')
      const sentData = {...values, phone: convertedPhone ? convertedPhone : ''}
      if (clientEditing) { dispatch(ClientsActionCreater.createUpdateUser(sentData, currentClient)) }
      else { dispatch(ClientsActionCreater.createAddUser(sentData)) }
    },
  })
  const handleChangeFor = (fild: string) => (e: React.ChangeEvent<any>) => formik.setFieldValue(fild, e.target.value)
  const contentData = [
    {
      tooltip: "Имя клиента", placeholder: "Имя", error: formik.errors.name,
      id: 'name', name: 'name', onChange: handleChangeFor('name'), value: formik.values.name,
    },
    {
      tooltip: "Фамилия клиента", placeholder: "Фамилия", error: formik.errors.surname,
      id: 'surname', name: 'surname', onChange: handleChangeFor('surname'), value: formik.values.surname,
    },
    {
      tooltip: "Отчество клиента", placeholder: "Отчество", error: formik.errors.patronymic,
      id: 'patronymic', name: 'patronymic', onChange: handleChangeFor('patronymic'), value: formik.values.patronymic,
    },
    {
      tooltip: "Телефон клиента", placeholder: "Телефон", mask: "+375(99) 999 99 99", error: formik.errors.phone,
      id: 'phone', name: 'phone', onChange: handleChangeFor('phone'), value: formik.values.phone,
    },
    {
      tooltip: "Населённый пункт клиента", placeholder: "Населённый пункт", error: formik.errors.locality,
      id: 'locality', name: 'locality', onChange: handleChangeFor('locality'), value: formik.values.locality,
    },
    {
      tooltip: "Улица клиента", placeholder: "Улица", error: formik.errors.street,
      id: 'street', name: 'street', onChange: handleChangeFor('street'), value: formik.values.street,
    },
    {
      tooltip: "№ дома клиента", placeholder: "№ Дома", error: formik.errors.house,
      id: 'house', name: 'house', onChange: handleChangeFor('house'), value: formik.values.house,
    },
    {
      tooltip: "№ квартиры клиента", placeholder: "№ Квартиры", error: formik.errors.flat,
      id: 'flat', name: 'flat', onChange: handleChangeFor('flat'), value: formik.values.flat,
    },
  ]
  return (
    <form
      className={cn(stls.createNewClient, {[stls.deactiveNewClient]: !visible}, {[stls.activeNewClient]: visible})}
      onSubmit={formik.handleSubmit}>
      <div className={stls.closeForm}>
        <SquareButton color="green" symbol="&#215;" size="size1"
          pressHeadnler={() => {
            dispatch(ClientsActionCreater.createShowElement('showNewClientForm', false))
            dispatch(ClientsActionCreater.createShowElement('clientEditing', false))
          }}
        />
      </div>
      {contentData.map(item => (
        <div className={stls.wrapp} key={item.placeholder}>
          <FormFild
            tooltip={item.tooltip} placeholder={item.placeholder} mask={item.mask}
            id={item.id} name={item.name} onChange={item.onChange} value={item.value} error={item.error}
          />
        </div>
      ))}
      <div className={stls.wrapp}>
        <textarea
          className={stls.notes} rows={10} placeholder="Примечания" id='notes' name='notes'
          onChange={formik.handleChange} value={formik.values.notes}
        />
      </div>
      <div className={stls.wrapp}>
        <FormSubmit text={clientEditing ? 'Сохранить' : 'Создать'} />
      </div>
    </form>
  )
}
