import React from 'react'

const Img = (props) => {
  // console.log(props.src)
  return (
    <>
    <div className='mx-[5%] mt-2 text-center flex felx-col'>
        <img src={props.src} alt=".." loading='lazy'
        className='w-full h-36 md:h-48 aspect-auto rounded-lg object-cover' />
    </div>
    </>
  )
}

export default Img