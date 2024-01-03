import React, { useEffect, useRef, useState } from 'react'

import Img from './Img'
import Title from './Title'
// import Option from './Option'
// import Addetail from './Addetail'
import { CartStateContext, CartDispatchContext } from '../components/ContextReducer.jsx'
import { useContext } from 'react'
import Modal from '../Modal.jsx'
import Desc from '../components/Desc.jsx'

const Card = (props) => {

    let dispatch = useContext(CartDispatchContext);
    let data=useContext(CartStateContext);

    const [qty,setQty]=useState(1);
    const [size,setSize]=useState("");
    const [amount,setAmount]=useState(0)

    // state for showing the description
    const [descView,setDescView]=useState(false)
    

    // ===================================
    // to use while selecting size of order
    let option=props.data.options;
    // converting array of objects to one object
    let priceOption={}
    for(const key of option){
        priceOption[Object.keys(key)]=Object.values(key)
    }
    // console.log(priceOption)
    // ====================================

    const handleAddToCart=async()=>{
        const a=qty*amount
        if(size==='' || qty==0){
            alert("Select both Size and Quantity")
            return;
        }
        // for updating already existing items
        let food=[]
        // const temp=[]
        for(const item of data){
            if(item.id===props.data._id){
                food=item
                break
            }
        }
       
        if(food.length!==0){
            // if not empty
            if(size===food.size){
                // food.size will be the previous size of the same item added to cart
                await dispatch({type:'UPDATE',id:props.data._id,price:a,qty:qty})
                return
            }
            
        }
        else{
            await dispatch({
                // sending ingo of the item selected
                type:'ADD',
                id:props.data._id,
                name:props.data.name,
                img:props.data.img,
                qty:qty,
                size:size,
                price:a
    
            })
    }
        
    }


    return (
        <>

            <div className='text-center basis-[20%] bg-slate-300 rounded-t-lg hover:shadow-lg'>
                {/* img */}
                <Img src={props.data.img} />
                {/* name */}
                <Title title={props.data.name} />
                {/* size and quantity */}
                {/* <Option option={props.data.options}/> */}
                <div className='mt-4 p-2 flex justify-between flex-col md:flex-row '>
                    {/* for quantity */}
                    <div className='mx-[25%] md:mx-0 p-1 text-md md:text-lg flex text-center justify-between'>

                        <label htmlFor='quant'>Quantity</label>
                        <select name='quant' id='quant' className='text-center rounded-md mx-2' onChange={(e)=>setQty(e.target.value)}>

                            {/* <option key={0} value={0} >{0}</option> */}
                            {
                                Array.from(Array(6), (e, i) => {
                                    return <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                    {/* for size */}
                    {/* <Size option={props.data.options}/> */}
                    <div className='mt-4 md:mt-0 p-1 mx-[25%] md:mx-0 text-md md:text-lg flex text-center justify-between'>
                        <label htmlFor='size'>Size</label>
                        <select name='size' id='size' className='text-center rounded-md mx-2' onChange={(e)=>{
                            setSize(e.target.value)
                            
                            setAmount(priceOption[e.target.value])
                            }}>
                            <option value="">{" "}</option>
                            {props.data.options?.map(val => {
                                return <option value={Object.keys(val)}>{Object.keys(val)}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className='flex text-center justify-evenly'>
                    {/* ADD */}
                    <div className='p-1 m-1 text-center text-md md:text-lg w-[45%]'>
                        <button className='bg-slate-500 text-center p-2 my-2 rounded-md w-full
                        hover:text-white hover:bg-slate-800 hover:font-bold' onClick={handleAddToCart}>
                            ADD</button>
                    </div>
                    {/* See details */}
                    <div className='p-1 m-1 text-center text-md md:text-lg w-[45%]'
                    onClick={()=>{setDescView(true)}}>
                        <button className='bg-slate-500 text-center p-2 my-2 rounded-md w-full
                        hover:text-white hover:bg-slate-800 hover:font-bold'
                        >
                            See Details</button>
                    </div>
                    {descView?<Modal onClose={()=>{setDescView(false)}}><Desc details={props.data}/></Modal>:""}
                </div>
            </div>

        </>
    )
}

export default Card