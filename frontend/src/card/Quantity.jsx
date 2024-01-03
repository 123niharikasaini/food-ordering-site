import React from 'react'

const Quantity = () => {
  return (
    <>
    <div className='mx-[25%] md:mx-0 p-1 text-md md:text-lg flex text-center justify-between'>
                
                <label htmlFor='quant'>Quantity</label>
                <select name='quant' id='quant' className='text-center rounded-md mx-2'>

                    <option key={0} value={0} >{0}</option>
                    {
                        Array.from(Array(6), (e, i) => {
                            return <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                        })
                    }
                </select>
            </div>
    </>
  )
}

export default Quantity