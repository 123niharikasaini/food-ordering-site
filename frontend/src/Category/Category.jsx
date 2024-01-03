import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Call from './Call';
import Items from '../components/Items';

const Category = () => {

    const [category,setCategory]=useState();
    const [opt,setOpt]=useState("");

    useEffect(()=>{
        const fetching=async()=>{
            const response=await axios.get(`${import.meta.env.VITE_URL}/category`)
            setCategory(response.data)
        }
        fetching();
    },[])

    const calling=(obj)=>{
        // console.log(obj.target.value)
        setOpt(obj.target.value)
    }

  return (
    <>
    <div>
        <div className='text-center capitalize mt-12 md:mt-24 text-xl md:text-2xl
        text-black font-semibold'>
            Filter by Category</div>

            <div className='mx-[10%] grid grid-cols-3 md:grid-cols-4 gap-4 mt-6 md:mt-8 '>
                {category?.map((val)=>{
                    return <>
                    <button className='p-2 bg-slate-300 rounded-md text-center text-md md:text-lg
                    hover:shadow-lg cursor-pointer hover:text-white hover:bg-slate-800'
                    onClick={calling} value={val.categoryName}>
                        {val.categoryName}
                        </button>
                    </>
                })}
                <button className='p-2 bg-slate-300 rounded-md text-center text-md md:text-lg
                    hover:shadow-lg cursor-pointer hover:text-white hover:bg-slate-800'
                    onClick={calling} value=''>
                        All Items
                        </button>
            </div>

            {opt?<Call opt={opt}/>:<Items/>}
    </div>
    </>
  )
}

export default Category