import React, { useEffect, useState } from "react";
import { currentUser, logOutUser } from "./Auth/utils/authApi.js";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const TopBar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user) {
          const userData = await currentUser();
          setUser(userData);
        }
      } catch (error) {
        navigate("/auth")
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  
  const logout = async () => {
    try {
      const res = await logOutUser();

      console.log("Logout response:", res);
      if (res.success) {
       
        navigate("/auth");
      }
    } catch (error) {
      navigate("/auth");
    }
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  console.log("user : ", user);
  return (
    <div className='hidden bg-slate-200 sm:flex px-12 justify-between items-center w-full py-1 gap-5 border-slate-200 bg-background dark:border-slate-700 h-12'>
      <div className='w-full max-w-md rounded border border-gray-600  text-gray-300 px-2 p-1'>
        <input
          type='text'
          placeholder='Search'
          className='rounded w-full outline-none bg-gray-50 text-gray-300 dark:bg-transparent'
        />
      </div>
      <div className='relative'>
        <button
          onClick={toggleDropdown}
          className='p-0 bg-transparent flex items-center'
        >
          {user ? (
            <div className='inline-flex rounded-full h-8 w-8 bg-gray-500 justify-center items-center'>
              {user?.avatar ? (
                <img
                  src={user?.avatar}
                  alt={user?.firstName}
                  className='rounded-full h-full w-full object-cover'
                />
              ) : (
                <span className='text-gray-200'>
                  {user?.firstName
                    ? user?.firstName.toUpperCase().charAt(0)
                    : "U"}
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
          <div className='absolute right-0 mt-2 w-48 z-30 text-black bg-slate-100 border border-gray-200 rounded shadow-lg'>
            <div className='px-4 py-2 '>My Account</div>
            <div className='border-t '></div>
            <button className='block px-4 py-2  '>
              Profile <span>{user?.firstName ?? ""}</span>
            </button>
            <button className='block px-4 py-2  ' onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
