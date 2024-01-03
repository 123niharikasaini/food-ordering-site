import React from 'react'
import Top from './Top'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import RightBanner from '../components/RightBanner'
import Category from '../Category/Category'
import Items from '../components/Items'


const Home = () => {
  return (
    <>
    <div className='m-0 p-0'>
      <Top/>
      <div className='flex pt-12 text-center flex-col 
      md:flex-row transition-all duration-100 ease-in
      w-full'>
        <Banner/>
        <RightBanner/>
      </div>
       {/* <Animation1/> */}
       <Category/>
       {/* <Items/> */}
      <Footer/>
    </div>
    </>
  )
}

export default Home