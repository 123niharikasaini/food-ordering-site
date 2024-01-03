import React from 'react'
import img from '../../assest/profile.jpg'

const Profile = () => {
  return (
    <>
    <div className='pt-14 md:pt-20 min-h-screen flex w-[80%] mx-[10%] justify-evenly'>
       <div className='h-[20%] w-[20%] mt-10 md:mt-16'>
        <img src={img} alt="" className='rounded-full object-cover aspect-auto'/>
       </div>
       <div className='mt-10 md:mt-16 flex flex-col'>
        <span className='text-xl md:text-3xl text-slate-800 md:m-4 mx-2 my-1'>Welcome Back... </span>
        <span className='text-2xl md:text-4xl text-green-800 md:m-4 mx-2 my-1'>Admin</span>
       </div>
    </div>
    </>
  )
}

export default Profile