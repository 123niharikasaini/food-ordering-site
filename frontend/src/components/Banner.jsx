import React from 'react'
import img from '../assest/dinning.png'

const Banner = () => {
  return (
    <>
    <div className='h-full w-full md:w-[50%]'>
        <img src={img} alt=".." className='aspect-auto h-full w-full object-contain'/>
    </div>
    </>
  )
}

export default Banner