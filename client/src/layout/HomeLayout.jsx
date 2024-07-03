import React from 'react';
import { Outlet } from "react-router";
import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';
import MobileBar from '../components/Mobilebar';

const HomeLayout = () => {
  return (

      <div className='w-full h-full relative '>
            <TopBar />
            <Navbar />
            <div className='px-2 lg:px-10 '>
            <Outlet />
            </div>
            <MobileBar/>
          </div>

  )
}

export default HomeLayout
