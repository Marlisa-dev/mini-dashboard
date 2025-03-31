import React from 'react'
import MainHeader from '../components/MainHeader'

const RootLayout = () => {
  return (
    <>
        <MainHeader />
        <Outlet />
    </>
  )
}

export default RootLayout