import React from 'react'

const Desc = (props) => {
    const details=props.details
  return (
    <>
    <div className='m-0 p-2 flex flex-col justify-center'>
        <div className='text-center text-xl md:text-2xl p-2 text-slate-800'>
            {details.name}</div>
        <div className='h-[50%] md:h-[40%] w-[50%] md:w-[40%] mx-auto p-2'>
            <img src={details.img} alt="..."  className='rounded-md object-cover'/></div>
        <div className='p-2 text-slate-800 overflow-hidden text-lg md:text-xl'>{details.description}</div>
    </div>
    </>
  )
}

export default Desc