import React from 'react'
import Quantity from './Quantity'
import Size from './Size'

const Option = (props) => {
  
  return (
    <>
    <div className='mt-4 p-2 flex justify-between flex-col md:flex-row '>
                        {/* for quantity */}
                        <Quantity/>
                        {/* for size */}
                        <Size option={props.option}/>
    </div>
    </>
  )
}

export default Option