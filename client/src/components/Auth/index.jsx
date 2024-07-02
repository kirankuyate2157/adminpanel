import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { FaUserCog } from "react-icons/fa";
const Auth = () => {
  const [type, setType] = useState("login");

  return (
    <div className='w-[100vw] bg-purple-50 flex justify-center'>
      <div className='w-full max-w-[1400px]  p-2 font-sans sm:p-6 lg:p-20 h-[100vh] flex flex-col justify-center '>
        <div className='w-full md:hidden text-slate-700 text-4xl font-serif font-bold p-3 flex justify-center text-center'>
          <h2 className='flex gap-3 '>
            User Management <FaUserCog className='animate-pulse' />
          </h2>
        </div>
        <div className='w-full flex  flex-col md:flex-row bg-white border border-gray-300 rounded-md overflow-hidden'>
          <div className='w-full lg:w-1/2 hidden md:block lg:h-full relative '>
            <img
              src='https://img.freepik.com/free-photo/social-network-connection-avatar-icon-vector_53876-121369.jpg?w=900&t=st=1719940618~exp=1719941218~hmac=6d1f5b9bd9f4e8c659c6d5c2500d7018326322f26642c1a639df4ded0aa248ac'
              alt=''
              className='pl-5   h-full'
            />
            <div className=' absolute gap-2  text-white flex text-center flex-col items-center justify-center py-5 px-5  z-30 bottom-0 '>
              <h1 className='text-4xl lg:text-5xl font-serif'> User Management</h1>
              <hr className='p-[2px] rounded w-[40%] bg-white' />
              <p className='text-sm p-2 font-sans text-gray-300'>
                Effortlessly manage user profiles and access privileges. Admins
                have special controls for efficient platform oversight. Enjoy
                seamless integration with all our tools and resources. Maintain
                secure and organized user data.
              </p>
            </div>
          </div>

          <div className='w-full lg:w-1/2 flex flex-col justify-center  p-5 sm:p-10'>
            {type === "signup" ? (
              <Signup setType={setType} />
            ) : (
              <Login setType={setType} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
