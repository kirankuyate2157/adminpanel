import React, { useEffect, useState } from "react";
import { currentUser, logOutUser } from "./Auth/utils/authApi.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await currentUser();
        setUser(userData);
        // console.log("user data : ", userData);
      } catch (error) {
        navigate("/auth")
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const logout = async () => {
    try {
      const res = await logOutUser();

      console.log("Logout response:", res);
      if (res.success) {
       
        navigate("/");
      }
    } catch (error) {
      navigate("/");
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className='sm:hidden flex px-4 md:px-10 justify-between items-center w-full py-1 gap-5 border-slate-200 bg-slate-200 dark:border-slate-700 h-12'>
      <svg
        className='h-5 w-5'
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
      </svg>
      <div className='w-full max-w-md rounded border border-gray-400 px-2 p-1'>
        <input
          type='text'
          placeholder='Search'
          className='rounded w-full outline-none bg-gray-50 text-gray-700  dark:bg-transparent'
        />
      </div>
      <div className='relative'>
        <button
          onClick={toggleDropdown}
          className='p-0 bg-transparent flex items-center'
        >
          {user ? (
            <div className='inline-flex rounded-full h-8 w-8 bg-gray-500 justify-center items-center'>
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.firstName}
                  className='rounded-full h-full w-full object-cover'
                />
              ) : (
                <span className='text-gray-200'>
                  {user.firstName ? user.firstName.toUpperCase().charAt(0) : "U"}
                </span>
              )}
            </div>
          ) : (
            <div className='inline-flex rounded-full h-8 w-8 bg-gray-200 justify-center items-center'>
              <span className='text-gray-700'>U</span>
            </div>
          )}
        </button>
        {dropdownOpen && (
          <div className='absolute right-0 mt-2 w-48 bg-slate-100 z-30 text-black border border-gray-200 rounded shadow-lg'>
            <div className='px-4 py-2 '>My Account</div>
            <div className='border-t '></div>
            <button className='block px-4 py-2  '>Profile <span>{user?.firstName ?? ""}</span></button>
            <button className='block px-4 py-2  ' onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
