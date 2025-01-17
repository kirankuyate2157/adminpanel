import React from 'react';
import { Outlet } from "react-router";
import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';
import MobileBar from '../components/Mobilebar';
import Sidebar from '../components/Sidebar';

const HomeLayout = () => {
  return (

      <div className='w-full h-full flex relative '>
        <Sidebar/>
        <div className='w-full h-full bg-gray-100 max-[100vh] overflow-auto'>
            <TopBar />
            <Navbar />
            <div className='px-2  '>
            <Outlet />
            </div>
            <MobileBar/>
            </div>
          </div>

  )
}

export default HomeLayout
