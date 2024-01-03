import React from 'react'
import { IoMdArrowRoundForward, IoMdHome } from "react-icons/io";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Password = () => {

    const nav=useNavigate();
    const location=useLocation();

    const from=location.state?.from?.pathname||'/admin/dashboard'

    const handleSubmit=(event)=>{
        event.preventDefault();

        const form=event.target;

        const password=form.password.value;

        const obj={password}

        const posting=async()=>{
            const response=await axios.post(`${import.meta.env.VITE_URL}/admin/login`,obj,
            {
                headers:{
                'Content-Type':'application/json'
              }
            }  )
            .then((res)=>{
                alert("Welcome Admin");
                localStorage.setItem("authToken",res.data.authToken)
                nav(from,{replace:true})
            })
            .catch((error)=>{
                alert(error.message)
                
            })
            // nav(-1)
        }

        posting();
    }


  return (
    <>
        <div className='flex flex-col justify-center sm:mx-auto sm:w-full sm:max-w-sm mt-12 md:mt-24'>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col justify-between'>
                <label htmlFor="password" className='text-center my-4 text-xl md:text-2xl font-bold text-slate-800'>
                    Enter the password to Login to Admin Panel
                </label>
                <input type="password" 
                name='password' id='password' 
                className='text-center p-2 bg-slate-200 my-4 mx-[10%] md:mx-0 rounded-md focus:outline-none'
                placeholder='Enter the password'/>
                </div>

            <div className='flex flex-row justify-evenly mt-12 md:mt-24'>
                <button className='bg-slate-300 p-2 text-lg md:text-xl rounded-md
                 hover:text-white hover:bg-slate-800 hover:font-bold hover:shadow-lg
                 flex' onClick={()=>{return nav(-1)}}>
                    <span className='p-1'><IoMdHome/></span>
                    <span>Home</span>
                </button>
                <button className='bg-slate-300 p-2 text-lg md:text-xl rounded-md
                 hover:text-white hover:bg-slate-800 hover:font-bold hover:shadow-lg
                 flex' type='submit'>
                    <span>Login</span>
                    <span className='p-1'><IoMdArrowRoundForward/></span>
                </button>
            </div>
            </form>
        </div>
    </>
  )
}

export default Password