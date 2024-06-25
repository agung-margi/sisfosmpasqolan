import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

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
        <div className="relative">
          <input type="search" placeholder="   Search" className="border rounded p-2 pl-10 w-56 focus:outline-0 focus:drop-shadow-md" value={searchQuery} onChange={handleInputChange} />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CiSearch />
          </div>
        </div>
        <FaUser className="ml-4 cursor-pointer text-lg" onClick={toggleDropdown} />
        {isDropdownOpen && (
          <div className="flex absolute right-10 mt-32 bg-white border rounded shadow-lg z-10">
            <ul className="py-1">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default HeaderLayout;
