import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function HeaderLayout({ titleMenu, rows }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter rows based on searchQuery
  const filteredRows = rows.filter((row) => row.fullname.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <header className="p-4 flex justify-between items-center my-6">
      <h1 className="flex text-3xl font-semibold ml-10 items-center">{titleMenu}</h1>
      <div className="flex mr-10 items-center gap-12">
        <FaUser className="ml-4 cursor-pointer text-lg" onClick={toggleDropdown} />
        {isDropdownOpen && (
          <div className="flex absolute right-10 mt-32 bg-white border rounded shadow-lg z-10">
            <ul className="py-1">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
              <Link to="/login">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default HeaderLayout;
