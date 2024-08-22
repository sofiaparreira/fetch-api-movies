import React from 'react'

const CardFilme = ({title, image, onClick}) => {
  return (
    <div className='mb-8' onClick={onClick} >
      <img className='w-80 mb-4' src={image} alt="" />
      <p className='text-xl text-center '>{title}</p>
      <button >Ver mais</button>
    </div>
  )
}

export default CardFilme
