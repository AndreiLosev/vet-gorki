import React from 'react'
import cn from 'classnames'
import './petCard.scss'
import {PetCardHeader} from '../../components/petCardHeader/petCardHeader'
import {PetCardForm} from '../../components/petCardForm/petCardForm'
import {PetCardNavBar} from '../../components/petCardNavBar/petCardNavBar'
import {Editor} from '../../components/editor/editor'

export const PetCard = () => {
  return (
    <div className={cn('petCardConteiner')}>
      <PetCardHeader />
      <div className={cn('content')}>
        <PetCardForm />
        <div className={cn('longData')}>
          <PetCardNavBar />
          <Editor />
        </div>
      </div>
    </div>
  )
}
