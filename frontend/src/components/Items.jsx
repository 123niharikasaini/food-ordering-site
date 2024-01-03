import React, { useEffect, useState } from 'react'
import Card from '../card/Card'
import axios from 'axios';

const Items = () => {

    const [item,setItem]=useState([]);

    useEffect(()=>{
        const fetching=async()=>{
            const response=await axios.get(`${import.meta.env.VITE_URL}/items`)
            setItem([...response.data])
        }
        fetching();
        

    },[])

  return (
    <>
    <div className='grid grid-cols-2 md:grid-cols-4 mx-[5%] my-[5%] gap-4'>
        {
        item?.map((val)=>{
            return <Card data={val}/>
        })}
    </div>
    </>
  )
}

export default Items