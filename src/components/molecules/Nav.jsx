import React, { useState, useEffect } from "react";
import { FaTimes, FaSearch } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import { Link, Navigate } from "react-router-dom";

const Nav = () => {
  const [click, setClick] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Periksa apakah ada informasi pengguna yang tersimpan di local storage saat komponen dimuat
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleClick = () => setClick(!click);

  const handleLogout = () => {
    // Hapus informasi pengguna dari local storage saat logout
    localStorage.removeItem("user");
    setUser(null);
  };

  const renderMenuItems = (isMobile = false) => (
    <ul className={`flex ${isMobile ? "flex-col text-center text-xl p-20" : "gap-12 text-[1.2rem]"}`}>
      {["Home", "Ekstrakulikuler", "Profile", "Pendaftaran"].map((item, index) => (
        <Link key={index} spy={true} smooth={true} to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}>
          <li className={`hover:text-hovertxt transition ${isMobile ? "my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded" : "hover:border-b-2 border-primetxt hover:border-hovertxt hover:font-medium cursor-pointer"}`}>
            {item}
          </li>
        </Link>
      ))}
    </ul>
  );

  return (
    <nav>
      <div className="h-10vh flex justify-between z-999 w-screen bg-hijau1 text-hijau1txt lg:px-20 px-4 py-4">
        <div className="flex items-center flex-0">
          <Link to="/">
            <img
              className="w-[3em]"
              src="./src/assets/img/logo/asqolanlogo.png"
              alt="Logo SMP ISLAM ASQOLAN"
            />
          </Link>
        </div>
        <div className="lg:flex md:flex flex-1 items-center justify-center font-normal hidden">
          {renderMenuItems()}
        </div>
        <div className="flex gap-4">
          {click && (
            <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-slate-900 transition">
              {renderMenuItems(true)}
            </div>
          )}
          <Link className="flex" to="">
            <button>{click ? <FaSearch /> : <FaSearch size={25} />}</button>
          </Link>
          {user ? (
            <button className="flex items-center" onClick={handleLogout}>
              <img
                src={user.profilePicture}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="ml-2">{user.name}</span>
            </button>
          ) : (
            <Link className="flex" to="/login">
              <button>{click ? <VscAccount /> : <VscAccount size={25} />}</button>
            </Link>
          )}
          <button className="block md:hidden transition" onClick={handleClick}>
            {click ? <FaTimes /> : <CiMenuFries size={25} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
