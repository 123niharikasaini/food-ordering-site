import React from 'react'

const Title = (props) => {
  return (
    <>
    <div className='mt-2 p-2 m-1 text-center text-md md:text-lg overflow-x-scroll capitalize'>
        {props.title}
    </div>
    </>
  )
}

export default Title