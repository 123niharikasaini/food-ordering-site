import React, { useState } from 'react'
import { IoFastFood } from 'react-icons/io5'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import axios from 'axios'


const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // const [obj,setObj]=useState({});

  const from = location.state?.from?.pathname || '/';
  const from2=location.state?.from?.pathname || '/login'

  const handleSubmit = async (event) => {
    event.preventDefault();
    
      const form = event.target;

      const name = form.name.value;
      const email = form.email.value;
      const password = form.password.value;
      const location = form.location.value;

      const obj = { name, email, password, location };

      const response=await axios.post(`${import.meta.env.VITE_URL}/auth/createUser`,obj,
      {
        headers:{
          'Content-Type':'application/json'
        }
      })
      .then((res)=>{
        alert("Account created")
        form.reset();
        navigate(from2,{replace:true})
        })

      .catch((error)=>{

          if(error.response.data.msg){
            if(error.response.data.msg==='E11000 duplicate key error collection: test.users index: email_1 dup key: { email: "ra@hontvmail.com" }'){
              alert("Aready have an account")
            }else if(error.response.data.msg==='Operation `users.findOne()` buffering timed out after 10000ms'){
              alert("Server not responding")
            }
            else {alert(error.response.data.msg)}
          }

          else if (error.response) {
            const errArray=error.response.data.error?.map((err)=>{return err.msg})
            alert(`Server Error: ${errArray?.map((val)=>{return val})}`);
          } 
          
          else if (error.request) {
            alert('Network Error:', error.request);
          } else {
            alert('Error:', error.message);
          }

        })


      
  
    } 
  



  return (
    <>
      <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>

        <div><button onClick={() => { return navigate(-1) }}><IoMdArrowRoundBack /></button></div>

        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>

          <div className='text-2xl md:text-5xl text-center mx-[45%]'><IoFastFood /></div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create account</h2>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

            <form className="space-y-6" onSubmit={handleSubmit}
            //  method="POST"
            >

              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                <div className="mt-2">
                  <input id="name" name="name" type="text" autoComplete="name" required className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div className="mt-2">
                  <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                </div>
                <div className="mt-2">
                  <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">Enter the location</label>
                </div>
                <div className="mt-2">
                  <input id="location" name="location" type="text" required className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 
        focus-visible:outline-offset-2 focus-visible:outline-slate-600">
                  Create Account
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?
              <Link to='/login' className="font-semibold leading-6 text-green-600 hover:text-green-500">Login</Link>
            </p>

            <div className='text-center mt-10'>
              <button className='flex mx-auto hover:bg-slate-500 p-2 rounded-md hover:text-white'
                onClick={() => { return navigate(from, { replace: true }) }}>
                <span className='p-1'><IoMdHome /></span>
                <span>Home</span>
              </button></div>
          </div>
        </div>
      </div>
    </>
  )
  }

export default SignUp