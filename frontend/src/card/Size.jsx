import React from 'react'

const Size = (props) => {
  const sizes=props.option
  // console.log(sizes)
  return (
    <>
    <div className='mt-4 md:mt-0 p-1 mx-[25%] md:mx-0 text-md md:text-lg flex text-center justify-between'>
        <label htmlFor='size'>Size</label>
            <select name='size' id='size' className='text-center rounded-md mx-2'>
              {sizes?.map(val=>{
                return <option value={Object.entries(val)}>{Object.keys(val)}</option>
              })}
    </select>
    </div>
    </>
  )
}

export default Size