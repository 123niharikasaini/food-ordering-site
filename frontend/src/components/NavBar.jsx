import React, { useContext, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { CiLogin,CiLogout } from "react-icons/ci";
import { SiGnuprivacyguard } from "react-icons/si";
import { GiBeachBag } from "react-icons/gi";
import { IoIosCart } from "react-icons/io";
import { CartStateContext } from './ContextReducer';
import { FaHome } from "react-icons/fa";
import Modal from '../Modal';
import Cart from './Cart';

const NavBar = () => {

  const data=useContext(CartStateContext);
  // console.log(data)
  const [cartView,setCartView]=useState(false);

  const nav=useNavigate();
  const loc=useLocation();

  const from=loc.state?.from?.pathname||'/login'

  const handleLogOut=()=>{
    localStorage.removeItem("authToken")
    nav(from,{replace:true})
  }

    const notLoggedIn=[
        {name:"Log In", path:"/login", element:<CiLogin/>},
        {name:"Sign Up", path:"/signup", element:<SiGnuprivacyguard/>},
        // {name:"Cart", path:"/cart"}
    ]
  //   const loggedIn=[
  //     {name:"My Orders", path:"/myOrder", element:<CiLogin/>},
  //     {name:"My Cart", path:"/myCart", element:<SiGnuprivacyguard/>},
  //     {name:"LogOut",  element:<SiGnuprivacyguard/>,onclick:{handleLogOut}},
  // ]


  return (
    <>
    <div className='flex justify-around text-sm sm:text-lg md:text-xl gap-2'>
            {
              (localStorage.getItem('authToken'))?
            <>
            {/* if user is signned IN */}
            <Link to='/' >
                <button className='p-2 hover:bg-white hover:text-black rounded-md hover:font-semibold flex justify-between text-center
                transition-all duration-100 ease-in'>
                    <span className='text-center p-1'><FaHome/></span>
                    <span className='text-center '>Home</span>
                </button>
            </Link>
            <Link to='/myorder' >
                <button className='p-2 hover:bg-white hover:text-black rounded-md hover:font-semibold flex justify-between text-center
                transition-all duration-100 ease-in'>
                    <span className='text-center p-1'><GiBeachBag /></span>
                    <span className='text-center '>My Orders</span>
                </button>
            </Link>
            {/* <Link to='/mycart' > */}
            <button className='p-2 hover:bg-white hover:text-black rounded-md hover:font-semibold flex justify-between text-center
            transition-all duration-100 ease-in' onClick={()=>{setCartView(true)}}>
                <span className='text-center p-1'><IoIosCart /></span>
                <span className='text-center '>My Cart</span>
                {/* as superscript for telling number of items in cart */}
                <div className="relative inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full  dark:border-gray-900">
                  {data.length}
                  </div>
                  </button>
    {cartView?<Modal onClose={()=>{setCartView(false)}}><Cart/></Modal>:null}
            
        {/* </Link> */}
        <Link>
                <button className='p-2 hover:bg-white hover:text-black rounded-md hover:font-semibold flex justify-between text-center
                transition-all duration-100 ease-in' onClick={handleLogOut}>
                    <span className='text-center p-1'><CiLogout /></span>
                    <span className='text-center '>Log Out</span>
                </button>
        </Link>
        </>
            
            
            :
            // if user is not signned IN
            notLoggedIn?.map((val)=>{
              return <>
              <Link to={val.path} >
                  <button className='p-2 hover:bg-white hover:text-black rounded-md hover:font-semibold flex justify-between text-center
                  transition-all duration-100 ease-in'>
                      <span className='text-center p-1'>{val.element}</span>
                      <span className='text-center '>{val.name}</span>
                  </button>
              </Link>
              </>
              })
          }

    </div>
    </>

  )
}

export default NavBar