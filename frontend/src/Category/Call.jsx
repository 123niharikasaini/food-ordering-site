import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '../card/Card';

const Call = (props) => {
    let category=props.opt;
    const [item,setItem]=useState([]);

    useEffect(()=>{
        const fetching=async()=>{
            setItem([])
            const response=await axios.get(`${import.meta.env.VITE_URL}/filter?category=${category}`)
            setItem([...response.data])
            // console.log(response.data)
        }
        fetching();
    },[category])

  return (
    <>
    <div className='grid grid-cols-2 md:grid-cols-4 mx-[5%] my-[5%] gap-4'>
      {item?.map((val)=>{
          return <Card data={val}/>
      })}
    </div>
    </>
  )
}

export default Call