import React, { useState } from 'react'
import { useContext } from 'react'
import { CartDispatchContext, CartStateContext } from './ContextReducer'
import { IoSad } from "react-icons/io5";
import { IoMdArrowBack, IoMdArrowForward, IoMdHome } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom'
import Login from './Login';

const Cart = () => {
    const data = useContext(CartStateContext);
    const dispatch = useContext(CartDispatchContext)
    const nav = useNavigate()
    let totalPrice=0

    const back = () => {
        return nav(-1)
    }

    if (localStorage.getItem('authToken') === null) {
        return <Login/>
    }

    if (data.length === 0) {
        return (
            <>
                <div className='bg-slate-100 h-screen'>
                    <div className='flex flex-col justify-center sm:mx-auto sm:w-full sm:max-w-sm'>
                        <div className='mt-[30%] text-center font-semibold flex justify-center text-xl md:text-2xl'>
                            <span>Cart is Empty </span>
                            <span className='p-1'><IoSad /></span>
                        </div>
                        {/* <button className='flex justify-center text-center my-[20%]' onClick={back}>
                            <span>Home</span>
                            <span className='p-1'><IoMdHome /></span>
                        </button> */}
                    </div>
                </div>
            </>
        )
    }

    data?.map((item) => {
        totalPrice=totalPrice+item.price;
    })

    const handleCheckOut=async()=>{
        let userEmail=localStorage.getItem("userEmail")

        let response=await fetch(`${import.meta.env.VITE_URL}/orderdata`,
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    order_data:data,
                    userEmail:userEmail,
                    order_date:new Date().toDateString()
                })
            }).then((res)=>{
                console.log(data)
                dispatch({type:'DROP'})
            }).catch((error)=>{
                console.log(error)
            })
        
        
    }    

    return (
        <>
            <div className='m-0 p-2 '>
                <div className='bg-slate-800 text-center text-xl md:text-2xl p-1 md:p-2 font-bold text-white'>
                    My Cart</div>

                {/* table */}
                <div className='p-2 mx-[5%] w-[90%]'>
                    <table className='bg-slate-200 w-full grid grid-rows-1 gap-2'>
                        <tr className='grid grid-cols-6 border-b-2 border-black'>
                            <th className='text-center overflow-hidden p-1'>#</th>
                            <th className='text-center overflow-hidden p-1'>Item</th>
                            <th className='text-center overflow-hidden p-1'>Quantity</th>
                            <th className='text-center overflow-hidden p-1'>Size</th>
                            <th className='text-center overflow-hidden p-1'>Price</th>
                            <th className='text-center overflow-hidden p-1'>Action</th>
                        </tr>

                        {data?.map((item, index) => {
                            return (
                                <tr className='grid grid-cols-6 border-b-[1px] border-slate-400'>
                                    <td className='text-center overflow-hidden p-1'>{index + 1}</td>
                                    <td className='text-center overflow-hidden p-1'>{item.name}</td>
                                    <td className='text-center overflow-hidden p-1'>{item.qty}</td>
                                    <td className='text-center overflow-hidden p-1'>{item.size}</td>
                                    <td className='text-center overflow-hidden p-1'>&#8377;{item.price}</td>
                                    <td className='flex justify-center overflow-hidden p-1 hover:text-red-600'>
                                        <button onClick={async()=>{
                                            console.log("Clicked")
                                            await dispatch({
                                                type:'REMOVE',
                                                index:index})}} 
                                                className='w-full cursor-pointer text-center'>
                                                <MdDelete /></button>
                                    </td>
                                    
                                </tr>
                            )
                        })}
                    </table>
                    {/* showing total amount */}
                    <div className='p-2 mt-[2%] mx-[20%] w-[60%] md:mx-[35%] md:w-[30%] text-center bg-slate-200 rounded-md'>
                        <span className=''>Amount to pay:</span>
                        <span> &#8377;{totalPrice}</span>
                    </div>
                        {/* buttons for action */}
                    <div className='flex justify-between mt-[4%]'>
                    {/* <button className='flex justify-center text-center' onClick={back}>
                        <span className='p-1'><IoMdArrowBack/></span>
                        <span>Back</span>
                    </button> */}
                    <button className='flex justify-center text-center ' onClick={handleCheckOut}>
                        <span>CheckOut</span>
                        <span className='p-1'><IoMdArrowForward/></span>
                    </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Cart