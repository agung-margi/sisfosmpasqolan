import React from "react";
import { RiDashboardHorizontalLine } from "react-icons/ri";

import { PiStudentBold, PiChalkboardTeacherBold, PiUserCircleCheckFill } from "react-icons/pi";

function SiderLayout() {
  return (
    <aside className="w-1/5 bg-white flex flex-col">
      <div className="p-4 font-bold text-sm flex items-center pb-4 mt-4">
        <img src="./src/assets/img/logo/asqolanlogo.png" alt="Evano" className="w-10 h-10 rounded-full mr-2" />
        <div>
          <p>SMP ISLAM ASQOLAN</p>
          <p>BOARDING SCHOOL</p>
        </div>
      </div>
      <div className="mt-6 p-4 flex items-center border-b">
        <img src="https://res.cloudinary.com/dnhxlvlmi/image/upload/v1718810700/zamqjujsnqmgswegy432.png" alt="Foto profil" className="w-10 h-10 rounded-full mr-2" />
        <div>
          <div className="font-bold">Mimin</div>
          <div>Administrator</div>
        </div>
      </div>
      <nav className="flex-1 mt-6 px-2 gap-y-4">
        <ul>
          <li className="mt-2 flex gap-2 items-center p-4 hover:bg-green-800 hover:border hover:rounded-lg hover:text-white hover:shadow-right-bottom">
            <RiDashboardHorizontalLine className="text-2xl" />
            <a href="/dashboardPage">Dashboard</a>
          </li>
          <li className="flex gap-2 items-center p-4 hover:bg-green-800 hover:border hover:rounded-lg hover:text-white">
            <PiStudentBold className="text-2xl" />
            <a href="/ppdb">PPDB</a>
          </li>
          <li className="flex gap-2 items-center p-4 hover:bg-green-800 hover:border hover:rounded-lg hover:text-white">
            <PiChalkboardTeacherBold className="text-2xl" />
            <a href="/teacher">Teacher</a>
          </li>
          <li className="flex gap-2 items-center p-4 hover:bg-green-800 hover:border hover:rounded-lg hover:text-white">
            <PiUserCircleCheckFill className="text-2xl" />
            <a href="/user">User</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default SiderLayout;
