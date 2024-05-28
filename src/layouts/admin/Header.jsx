import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [showSubNav, setShowSubNav] = useState(false);
  const navigate = useNavigate();

  const toggleSubNav = () => {
    setShowSubNav(!showSubNav);
  };

  const handleLogout = () => {
    return navigate("/login");
  };

  return (
    <div className="text-3xl w-full h-14 bg-blue-600">
      <div className="flex justify-end py-2.5 pr-10 text-lg relative">
        <div onClick={toggleSubNav}>
          <div className="flex items-center gap-4 bg-blue-800 text-white py-1 px-4">
            <p>Administrator</p>
            <FaUserAlt className="cursor-pointer" />
          </div>
        </div>
        {showSubNav && (
          <div className="absolute top-full right-0 bg-white border border-gray-200 rounded shadow-md mt-1 ml-2 mr-8">
            <ul className="">
              <li>
                <button onClick={handleLogout} className="block px-6 py-2 text-gray-800 hover:bg-gray-200 w-full text-left ">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
