import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Top from '../Home/Top';
import Footer from '../components/Footer';

const MyOrder = () => {
    const [data,setData]=useState();
    // const [total,setTotal]=useState(0);

    const fetching=async()=>{
        let email=localStorage.getItem('userEmail')
        // console.log(email)
        let obj={email}
        const response=await axios.post(`${import.meta.env.VITE_URL}/myorderdata`,
            obj,
            {headers:{
                'Content-Type':'application/json'
            }}
            )         
        .then((res)=>{
            // console.log(res.data)
            setData(res.data)
        })
        .catch((error)=>{console.log(error)})
    }
    useEffect(()=>{
        fetching()
    },[])

    // converting data into array
    const rows=[]
    const converting=()=>{
        for(let key in data){
            let obj={}
            obj[key]=data[key]
            // console.log(data[key])
            rows.push(obj)
        }
        // console.log(rows)
    }
    converting()


  return (
    <>
    <div className='m-0 p-0'>
      <Top/>
      
      {rows.length===0?
    //   when not ordered
      <div className='m-auto min-h-screen pt-[10%] text-center
      text-slate-900 font-bold text-xl md:text-2xl'>
        You haven't order yet
        </div>
        :
        // when ordered
      <div className='min-h-screen'>
      <div className='m-auto pt-[10%] text-center
      text-slate-900 font-bold text-xl md:text-3xl'>
        My Orders
        </div>

        <div className='p-2 flex flex-col'>
            {
                rows?.map((key,index)=>{
                    return (<>
                    <div className='bg-slate-300 text-slate-800 p-2 text-md md:text-xl
                    rounded-t-md my-2'>
                    {Object.keys(key)[0]}
                    </div>
                    {/* {console.log(Object.values(key))} */}
                    {/* values are as array of array of object */}
                    <div>
                        {Object.values(key).map((value)=>{
                            return <>
                            {value?.map((val)=>{
                                
                                return (<>
                                <div className='flex w-full p-4'>

                                    <div className='flex flex-col basis-[60%]'>
                                        {/* showing details */}
                                        <span className='text-lg md:text-xl bg-slate-200 overflow-hidden p-2'>
                                             {val.name}</span>
                                        <span className='flex justify-evenly p-2'>
                                        <span>Quantity: {val.qty}</span>
                                        <span>Size: {val.size}</span>
                                        </span>
                                        <span className='text-center p-2 bg-slate-100'>Price: &#8377;{val.price}</span>
                                    </div>

                                    <div className='basis-[40%] p-2 flex justify-center'>
                                        {/* showing images */}
                                        <div className='w-[50%] text-center '>
                                            <img src={val.img} alt="" className='rounded-md'/></div>
                                    </div>
                                </div>
                                <hr />
                                </>)
                            })}
                            </>
                        })}
                    </div>
                    </>)
                })
            }
        </div>
        </div>
        }
      <Footer/>
    </div>
    </>
  )
}

export default MyOrder