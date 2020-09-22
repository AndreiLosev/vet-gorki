import React from 'react'
import stls from './newClientForm.module.scss'
import {useDispatch} from 'react-redux'
import {useFormik} from 'formik'
import {SquareButton} from '../squareButton/squareButton'
import {FormFild} from '../formFild/formFild'
import {FormSubmit} from '../formSubmit/formSubmit'
import {ClientsActionCreater} from '../../actions/clientsPageActions'

interface IinitialFormValues {
  name: string;
  surname: string;
  patronymic: string;
}

export const NewClientForm: React.FC<{}> = () => {
  const dispatch = useDispatch()
  const [notesText, setNotesText] = React.useState('')
  const formik = useFormik<IinitialFormValues>({
    initialValues: {
      name: '',
      surname: '',
      patronymic: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  })
  const handleChangeFor = (fild: string) => (e: React.ChangeEvent<any>) => formik.setFieldValue(fild, e.target.value)
  const contentData = [
    {
      tooltip: "Имя клиента", placeholder: "Имя",
      id: 'name', name: 'name', onChange: handleChangeFor('name'), value: formik.values.name,
    },
    {
      tooltip: "Фамилия клиента", placeholder: "Фамилия",
      id: 'surname', name: 'surname', onChange: handleChangeFor('surname'), value: formik.values.surname,
    },
    {
      tooltip: "Отчество клиента", placeholder: "Отчество",
      id: 'patronymic', name: 'patronymic', onChange: handleChangeFor('patronymic'), value: formik.values.patronymic,
    },
    {
      tooltip: "Телефон клиента", placeholder: "Телефон",
      id: 'phone', name: 'phone', onChange: handleChangeFor('phone'), value: formik.values.patronymic,
    },
    {tooltip: "Населённый пункт клиента", placeholder: "Населённый пункт"},
    {tooltip: "Улица клиента", placeholder: "Улица"},
    {tooltip: "№ дома клиента", placeholder: "№ Дома"},
    {tooltip: "№ квартиры клиента", placeholder: "№ Квартиры"},
  ]
  return (
    <form className={stls.createNewClient} onSubmit={formik.handleSubmit}>
      <div className={stls.closeForm}>
        <SquareButton color="green" symbol="&#215;" size="size1"
          pressHeadnler={() => dispatch(ClientsActionCreater.createShowNewClientForm(false))}
        />
      </div>
      {contentData.map(item => (
        <div className={stls.wrapp} key={item.placeholder}>
          <FormFild
            tooltip={item.tooltip} placeholder={item.placeholder} type="text"
            id={item.id} name={item.name} onChange={item.onChange} value={item.value}
          />
        </div>
      ))}
      <div className={stls.wrapp}>
        <textarea
          className={stls.notes} rows={10} placeholder="Примечания"
          value={notesText} onChange={e => setNotesText(e.target.value)}
        />
      </div>
      <div className={stls.wrapp}>
        <FormSubmit text="Создать" />
      </div>
    </form>
  )
}
