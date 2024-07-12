import React, { useState, useEffect } from "react";
import { FaTimes, FaSearch } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";

const Nav = () => {
  const [click, setClick] = useState(false);
  const [user, setUser] = useState(null);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) setUser(JSON.parse(loggedInUser));

    const handleScroll = () => setScroll(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => setClick(!click);
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const menuItems = ["Home", "Ekstrakulikuler", "Profile", "Pendaftaran"];

  return (
    <nav
      className={`fixed top-0 w-full z-50 bg-hijau1 text-hijau1txt transition duration-300 ${
        scroll ? "bg-opacity-90 backdrop-blur-lg" : "bg-opacity-100"
      }`}
    >
      <div className="flex justify-between h-10vh lg:px-20 px-4 py-4">
        <Link to="/">
          <img
            className="w-[3em]"
            src="./src/assets/img/logo/asqolanlogo.png"
            alt="Logo SMP ISLAM ASQOLAN"
          />
        </Link>
        <div className="lg:flex md:flex lg:flex-1 items-center justify-center font-normal hidden">
          <ul className="flex gap-12 text-[1.2rem]">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
              >
                <li className="hover:text-hovertxt transition hover:border-b-2 border-primetxt hover:border-hovertxt hover:font-medium cursor-pointer">
                  {item}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="flex gap-4">
          {click && (
            <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-slate-900 transition">
              <ul className="text-center text-xl p-20">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                  >
                    <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
                      {item}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
          <Link className="flex" to="">
            <button><FaSearch size={25} /></button>
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
              <button><VscAccount size={25} /></button>
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
