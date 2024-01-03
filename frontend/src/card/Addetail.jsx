import React from 'react'

const Addetail = () => {
  return (
    <>
    <div className='flex text-center justify-evenly'>
                     {/* ADD */}
                    <div className='p-1 m-1 text-center text-md md:text-lg w-[45%]'>
                        <button className='bg-slate-500 text-center p-2 my-2 rounded-md w-full
                        hover:text-white hover:bg-slate-800 hover:font-bold'>
                            ADD</button>
                    </div>
                    {/* See details */}
                    <div className='p-1 m-1 text-center text-md md:text-lg w-[45%]'>
                            <button className='bg-slate-500 text-center p-2 my-2 rounded-md w-full
                        hover:text-white hover:bg-slate-800 hover:font-bold'>
                                See Details</button>
                    </div>
    </div>
    </>
  )
}

export default Addetail