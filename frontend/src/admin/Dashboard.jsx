import React from 'react'
import DashHeader from './comp/DashHeader'
import Profile from './comp/Profile'
import Footer from '../components/Footer'
import Password from './comp/Password'

const Dashboard = () => {
  if(localStorage.getItem('authToken')===null){
    return <Password/>
  }
  // console.log(localStorage.getItem('authToken'))
  return (
    <>
    <DashHeader/>
    <Profile/>
    <Footer/>
    </>
  )
}

export default Dashboard