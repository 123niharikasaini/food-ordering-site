import React from 'react'
import { IoFastFood } from "react-icons/io5";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import axios from 'axios';



const Login = () => {
    const navigate=useNavigate();
    const location=useLocation();

    const from=location.state?.from?.pathname||'/'

// ===============================================================================
    const handleSubmit=async(event)=>{
        event.preventDefault();

        const form=event.target;
        const email=form.email.value;
        const password=form.password.value;

        const obj={email,password}

        const response=await axios.post(`${import.meta.env.VITE_URL}/auth/login`,obj,
        {
          headers:{
          'Content-Type':'application/json'
        }
      }).then((response)=>{
          alert("Logged In successfully")
          // storing the token in the user browser/local storage
          localStorage.setItem("authToken",response.data.authToken)
          // storing email to use while checkout
          localStorage.setItem("userEmail",email)

          navigate(from,{replace:true})
          
        })
        .catch((error)=>{
            if(error.response.data.msg){
              if(error.response.data.msg==='Operation `users.findOne()` buffering timed out after 10000ms'){
                alert("server not responding")
              }
              else {
                alert(error.response.data.msg)
              }
            }else if (error.response) {
              const errArray=error.response.data.error?.map((err)=>{return err.msg})
              alert(`Server Error: ${errArray?.map((val)=>{return val})}`);
            } else if (error.request) {
              alert('Network Error:', error.request);
            } else {
              alert('Error:', error.message);
            }
          })
    }

// ====================================================================================

  return (
    <>
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div><button onClick={()=>{return navigate(-1)}}><IoMdArrowRoundBack/></button></div>
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <div className='text-2xl md:text-5xl text-center mx-[45%]'><IoFastFood/></div>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Log in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" onSubmit={handleSubmit}
    // method="POST"
    >
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="text-sm">
            <a href="#" className="font-semibold text-red-500 hover:text-red-700">Forgot password?</a>
          </div>
        </div>
        <div className="mt-2">
          <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600">Sign in</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Don't have an account?
      <Link to='/signup' className="font-semibold leading-6 text-green-600 hover:text-green-500">Create an account</Link>
    </p>

    <div className='text-center mt-10'>
        <button className='flex mx-auto'
        onClick={()=>{return navigate(from,{replace:true})}}>
            <span className='p-1'><IoMdHome/></span>
            <span>Home</span>
            </button></div>
  </div>
</div>
    </>
  )
}

export default Login