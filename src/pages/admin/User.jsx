import React from "react";
import HeaderLayout from "../../layouts/admin/Header";
import SiderLayout from "../../layouts/admin/Sider";
import UserLayout from "../../layouts/admin/User";

function UserPage() {
  const titleMenu = "All Users";
  const rows = [];

  return (
    <div className="h-screen w-full bg-slate-100">
      <div className="flex flex-row">
        <SiderLayout />
        <div className="h-screen w-full">
          <HeaderLayout titleMenu={titleMenu} rows={rows} />
          <UserLayout />
        </div>
      </div>
    </div>
  );
}

export default UserPage;
