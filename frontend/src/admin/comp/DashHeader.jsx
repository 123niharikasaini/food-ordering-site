import React,{useState,useEffect} from 'react'
import { IoFastFood } from 'react-icons/io5'
import DashNav from './DashNav.jsx'

const DashHeader = () => {
    const [isSticky,setIsSticky]=useState(false)

  useEffect(()=>{
    const handleScroll=()=>{
      if(window.scrollY>100){
        setIsSticky(true)
      }
      else {
        setIsSticky(false)
      }
    }

    window.addEventListener("scroll",handleScroll)
  },[])
  return (
    <>
    <div className={`p-2 flex justify-between fixed w-full ${isSticky?'bg-slate-800 text-white':'bg-slate-300'} transition-all duration-100 ease-in`}>
        <div className='flex'>
          <span className='p-1 md:p-0 text-lg sm:text-2xl md:text-3xl'><IoFastFood/></span>
          <span className='text-lg sm:text-2xl md:text-3xl font-bold'>OnTime</span>
        </div>

       <DashNav/>
        
    </div>
    </>
  )
}

export default DashHeader