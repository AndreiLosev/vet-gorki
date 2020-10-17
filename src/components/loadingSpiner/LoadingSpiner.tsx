import React from 'react'
import stls from './LoadingSpiner.module.scss'
import spiner from './spiner.webp'


export const LoadingSpiner = () => {
  return <img src={spiner} alt="loading" className={stls.spiner} />
}
