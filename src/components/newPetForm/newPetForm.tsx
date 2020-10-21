import React from 'react'
import stls from './newPetForm.module.scss'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import cn from 'classnames'
import {useDispatchSelect} from '../../utilites/useDispatchSelect'
import {IClient, IPet} from '../../redusers/clientsPageReduser'
import {SquareButton} from '../squareButton/squareButton'
import {FormFild} from '../formFild/formFild'
import {FormFildWithOptions} from '../formFieldWithOptions/formFieldWithOptions'
import {FormFildAddOptions} from '../formFildAddOptions/formFildAddOptions'
import {FormSubmit} from '../formSubmit/formSubmit'
import {ClientsActionCreater} from '../../actions/clientsPageActions'

export interface IPetFormValues {
  petName: string;
  petType: string;
  petGender: string;
  castration: string;
  breed: string;
  color: string;
  ageYear: string;
  ageMonth: string;
  notes: string;
}

interface IpartState {
  clientsPage: {
    currentClient: string,
    clients: {[index: string]: IClient},
    selectedPetType: string,
    currentPet: string,
    pets: {[index: string]: IPet},
    petEditing: boolean,
  },
  staticData: {
    petType: string[],
    breed: {[index: string]: string[]}
  }
}

type Props = { visible: boolean }

export const NewPetForm: React.FC<Props> = ({visible}) => {
  const {partState: {
    currentClient, clients, selectedPetType, petType, breed, currentPet, pets, petEditing,
  }, dispatch} = useDispatchSelect((partState: IpartState) => ({
    currentClient: partState.clientsPage.currentClient,
    clients: partState.clientsPage.clients,
    selectedPetType: partState.clientsPage.selectedPetType,
    currentPet: partState.clientsPage.currentPet,
    pets: partState.clientsPage.pets,
    petEditing: partState.clientsPage.petEditing,
    petType: partState.staticData.petType,
    breed: partState.staticData.breed,
  }))
  const owner = clients[currentClient]
  const formik = useFormik<IPetFormValues>({
    initialValues: {
      petName: currentPet ? pets[currentPet].petName : '',
      petType: currentPet ? pets[currentPet].petType : '',
      petGender: currentPet ? pets[currentPet].petGender : '',
      castration: currentPet ? pets[currentPet].castration : '',
      breed: currentPet ? pets[currentPet].breed : '',
      color: currentPet ? pets[currentPet].color : '',
      ageYear: currentPet ? pets[currentPet].ageYear : '',
      ageMonth: currentPet ? pets[currentPet].ageMonth : '',
      notes: currentPet ? pets[currentPet].notes : '',
    },
    validationSchema: Yup.object({
      petType: Yup.string()
        .required('Это поле обязательно для заполнения'),
        breed: Yup.string()
        .required('Это поле обязательно для заполнения'),
        ageYear: Yup.number()
          .typeError('должго быть числом')
          .positive('дожно быть положительное число')
          .integer('должно быть целое число')
          .max(50, 'дожно быть не больше 50'),
        ageMonth: Yup.number()
          .typeError('должго быть числом')
          .positive('дожно быть положительное число')
          .integer('должно быть целое число')
          .max(11, 'дожно быть не больше 11'),
        petGender: Yup.string()
          .matches(/Ж|М/i, 'Дожно быть М или Ж')
          .max(1, 'Дожно быть М или Ж'),
        castration: Yup.string()
          .matches(/Да|Нет/i, 'должно быть Да или Нет')
          .max(3, 'должно быть Да или Нет')
          .min(2, 'должно быть Да или Нет')
    }),
    onSubmit: values => {
      if (petEditing) dispatch(
        ClientsActionCreater.createUpdatePet({...values, visits: pets[currentPet].visits}, currentPet)
      )
      else dispatch(ClientsActionCreater.createAddPet({...values, visits: [] as string[]}))
    },
  })
  React.useEffect(() => {
    dispatch(ClientsActionCreater.createSelectedPetType(formik.values.petType))
  }, [dispatch, formik.values.petType])
  const handleChangeFor = (fild: string) => (e: React.ChangeEvent<any>) => formik.setFieldValue(fild, e.target.value)
  const setValueFor = (fild: string) => (text: string) => formik.setFieldValue(fild, text)
  return (
    <form className={cn(
        stls.createNewPet,
        {[stls.activeCreateNewPet]: visible},
        {[stls.deactivecreateNewPet]: !visible},
      )}
      onSubmit={formik.handleSubmit}>
      <div className={stls.closeForm}>
        <SquareButton color="green" symbol="&#215;" size="size1" tooltip={undefined}
          pressHeadnler={() => dispatch(ClientsActionCreater.createShowElement('showNewPetForm', false))}
        />
      </div>
      <div className={stls.wrapp}>
        <span className={stls.master}>
          Хозяин: {`${owner.surname} ${owner.name} ${owner.patronymic}`}
        </span>
      </div>
      <div className={stls.wrapp}>
        <FormFild tooltip="Кличка" placeholder="Кличка" id="petName" name="petName"
          onChange={handleChangeFor('petName')} value={formik.values.petName} error={formik.errors.petName}
        />
      </div>
      <div className={stls.wrapp}>
        <FormFildAddOptions tooltip="Вид" placeholder="Вид" options={petType}
          id="petType" name="petType" value={formik.values.petType} error={formik.errors.petType}
          onChange={handleChangeFor('petType')} setValue={setValueFor('petType')}
          addOptions={() => dispatch(ClientsActionCreater.createShowElement('showPetTypeOptions', true))}
        />
      </div>
      <div className={stls.wrapp}>
        <FormFildAddOptions tooltip="Порода" placeholder="Порода"
          options={breed[selectedPetType] ? breed[selectedPetType] : []}
          id="breed" name="breed" value={formik.values.breed} error={formik.errors.breed}
          onChange={handleChangeFor('breed')} setValue={setValueFor('breed')}
          addOptions={() => dispatch(ClientsActionCreater.createShowElement('showBreedOptions', true))}
        />
      </div>
      <div className={stls.wrapp}>
        <FormFild tooltip="Окрас" placeholder="Окрас" id="color" name="color"
          onChange={handleChangeFor('color')} value={formik.values.color} error={formik.errors.color}
        />
      </div>
      <div className={stls.wrapp}>
        <FormFildWithOptions tooltip="Пол" placeholder="Пол" options={['М', 'Ж']}
          id="petGender" name="petGender" value={formik.values.petGender} error={formik.errors.petGender}
          onChange={handleChangeFor('petGender')} setValue={setValueFor('petGender')}
        />
      </div>
      <div className={stls.wrapp}>
        <FormFildWithOptions tooltip="Кострация" placeholder="Кострация" options={['Да', 'Нет']}
          id="castration" name="castration" value={formik.values.castration} error={formik.errors.castration}
          onChange={handleChangeFor('castration')} setValue={setValueFor('castration')}
        />
      </div>
      <div className={stls.petAge}>
        <span className={stls.labelAge}>Возраст: </span>
        <FormFild tooltip="Лет" placeholder="Лет" id="ageYear" name="ageYear"
          onChange={handleChangeFor('ageYear')} value={formik.values.ageYear} error={formik.errors.ageYear}
        />
        <FormFild tooltip="Месяцев" placeholder="Месяцев" id="ageMonth" name="ageMonth"
          onChange={handleChangeFor('ageMonth')} value={formik.values.ageMonth} error={formik.errors.ageMonth}
        />
        {/* <FormFild tooltip="Дней" placeholder="Дней" type="text"/> */}
      </div>
      <div className={stls.wrapp}>
        <textarea
          className={stls.notes} rows={10} placeholder="Примечания" id='notes' name='notes'
          onChange={formik.handleChange} value={formik.values.notes}
        />
      </div>
      <div className={stls.wrapp}>
        <FormSubmit text={petEditing ? 'Сохранить' : 'Создать'} />
      </div>
    </form>
  )
}
