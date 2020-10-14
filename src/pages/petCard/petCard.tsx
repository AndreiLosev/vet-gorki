import React from 'react'
import cn from 'classnames'
import './petCard.scss'
import {PetCardHeader} from '../../components/petCardHeader/petCardHeader'
import {PetCardForm} from '../../components/petCardForm/petCardForm'
import {PetCardNavBar} from '../../components/petCardNavBar/petCardNavBar'
import {EditorConteiner} from '../../components/editor/editor'
import {Diagnoses} from '../../components/diagnoses/diagnoses'

export const PetCard: React.FC<{}> = () => {
  return (
    <div className={cn('petCardConteiner')}>
      <PetCardHeader />
      <Diagnoses visible={true}/>
      <div className={cn('content')}>
        <PetCardForm />
        <div className={cn('longData')}>
          <PetCardNavBar />
          <EditorConteiner />
        </div>
      </div>
    </div>
  )
}
