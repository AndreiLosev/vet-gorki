import React from 'react'
import cn from 'classnames'
import './login.scss'
import {useDispatch} from 'react-redux'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useHistory} from 'react-router-dom'
import {StaticDataActionCreater} from '../../actions/staticDataActions'
import {ClientsActionCreater} from '../../actions/clientsPageActions'
import {FormFild} from '../../components/formFild/formFild'
import {FormSubmit} from '../../components/formSubmit/formSubmit'

export interface ILoginForm {
  name: string
  password: string
}

export const Login: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const formik = useFormik<ILoginForm>({
    initialValues: {
      name: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string(),
      password: Yup.string(),
    }),
    onSubmit: values => {
      dispatch(ClientsActionCreater.createShowElement('loggedIn', true))
      history.push('/clients')
    },
  })
  React.useEffect(() => {
    dispatch(StaticDataActionCreater.createGetStatickData())
  }, [dispatch])
  return (
    <div className={cn('loginConteiner')}>
      <form className={cn('formBorder')}  onSubmit={formik.handleSubmit}>
        <div className={cn('loginHeader')}>
          <span className={cn('text')}>VSI City department of the Goretsk district veterinary station</span>
        </div>
        <div className={cn('wrapp', 'text1')}>
          <FormFild
            placeholder="login" id="name" name="name" value={formik.values.name} error={formik.errors.name}
            onChange={(e: React.ChangeEvent<any>) => formik.setFieldValue('name', e.target.value)}
          />
        </div>
        <div className={cn('wrapp', 'text1')}>
          <FormFild
             placeholder="password" id="password" name="password" value={formik.values.password}
             error={formik.errors.password} type="password"
             onChange={(e: React.ChangeEvent<any>) => formik.setFieldValue('password', e.target.value)}
          />
        </div>
        <div className={cn('wrapp', 'submit1')}>
          <FormSubmit text="Sign in" />
        </div>
      </form>
      <div className={cn('buffer')}></div>
    </div>
  )
}
