import { useState } from 'react'
import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'

function MainLayouts() {

  return (
    <>
    <Header />
        <Outlet />
    <Footer />
    </>
  )
}

export default MainLayouts
