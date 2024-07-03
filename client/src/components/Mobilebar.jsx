import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUsers, FaBuilding, FaBell, FaChartBar, FaCog } from "react-icons/fa";
import { SiGoogleforms } from "react-icons/si";

const MobileBar = () => {
  return (
    <div id="mobile-bottom-bar" className="fixed sm:hidden bottom-3 left-3 right-3 py-3 px-1 m-auto shadow-md bg-slate-900 rounded-full flex justify-center max-w-[700px]">
      <div className="flex w-full justify-evenly">
        <Link to="/home" className="text-center">
          <FaHome className="text-2xl text-white" />
        </Link>
        <Link to="/members" className="text-center">
          <FaUsers className="text-2xl text-white" />
        </Link>
     
        <Link className="text-center">
          <FaBell className="text-2xl text-white" />
        </Link>
       
        
        <Link to="/setting" className="text-center">
          <FaCog className="text-2xl text-white" />
        </Link>
      </div>
    </div>
  );
};

export default MobileBar;
