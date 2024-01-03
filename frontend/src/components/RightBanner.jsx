import React from 'react'
import { FaSearch } from "react-icons/fa";

const RightBanner = () => {
  return (
    <div className='m-2 p-2 flex flex-col justify-evenly text-center sm:w-[50%]'>
        <div className='text-xl md:text-3xl font-bold text-center mx-[20%] capitalize'>Order from our Restaurants</div>
        <div className='text-center mt-6 flex justify-around'>
            <input type='text' placeholder='Enter what food you want' 
            className='p-2 text-center bg-slate-200 rounded-md w-[80%] focus:outline-none'/>
            <button className='p-2 bg-slate-200 rounded-md hover:bg-slate-700 hover:text-white flex justify-between'>
            
              <span className='hidden sm:block'>Search</span>
              <span className='p-1'><FaSearch/></span>
              
              </button>
        </div>
    </div>
  )
}

export default RightBanner