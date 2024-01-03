import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoMdHome } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const DashNav = () => {
    const navigate=useNavigate();
    const location=useLocation();

    const from=location.state?.from?.pathname||'/'

    const [isOpen,setIsOpen]=useState(false);
    const nav=[
        {path:'/admin/create',name:'Create new'},
        {path:'/manage',name:'Manage'},
        {path:'/admin/dashboard',name:'Dashboard'},
        
    ]

    const toggle=()=>{
        setIsOpen(!isOpen);
    }

    const handleLogOut=()=>{
        localStorage.removeItem("authToken")
        navigate(from,{replace:true})
    }

  return (
    <>
    <div className='hidden md:flex justify-around text-sm sm:text-lg md:text-xl'>
        {nav?.map((val)=>{
            return <>
            {/* <Link to={val.path}> */}
                <button className='p-2 hover:bg-white hover:text-black rounded-md hover:font-semibold flex justify-between text-center
                transition-all duration-100 ease-in'>
                    {val.name}
                </button>
                {/* </Link> */}
            </>
        })}
        <button onClick={handleLogOut}>Logout</button>
    </div>

    {/* for small device view */}
    <div className={`${isOpen?'flex flex-col':'hidden'} transition-all duration-200 ease-in`}>
        {nav?.map((val)=>{
            return <>
            {/* <Link to={val.path}> */}
                <button className='p-2 hover:bg-white hover:text-black rounded-md hover:font-semibold flex justify-between text-center
                transition-all duration-100 ease-in'>
                    {val.name}
                </button>
                {/* </Link> */}
            </>
        })}
        </div>
    <div className='flex md:hidden'>
        <button className='hover:text-white hover:bg-slate-800 p-1' onClick={toggle}>
            <span className='text-xl sm:text-2xl'>{isOpen?<RxCross2/>:<IoMdHome />}</span>
        </button>
        
    </div>
    
    </>
  )
}

export default DashNav