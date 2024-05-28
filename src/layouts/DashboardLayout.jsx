import React from 'react'
import DashboardFragment from '../fragments/DashboardFragment'
import Nav from '../components/molecules/Nav'
import Footer from '../components/molecules/Footer'

const DashboardLayout = () => {
  return (
    <div>
      <Nav/>
      <DashboardFragment/>
      <Footer/>
    </div>
  )
}

export default DashboardLayout
