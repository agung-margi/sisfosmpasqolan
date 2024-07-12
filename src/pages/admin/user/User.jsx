import React from "react";
import HeaderLayout from "../../../layouts/admin/Header";
import SiderLayout from "../../../layouts/admin/Sider";
import UserLayout from "../../../layouts/admin/User";
// import { TokenContext } from "../../../components/data/AuthTokenContext"

function UserPage() {
  const titleMenu = "All Users";
  const rows = [];

  return (
    // <TokenProvider>
    <div className="h-screen w-full bg-slate-100">
      <div className="flex flex-row">
        <SiderLayout />
        <div className="h-screen w-full">
          <HeaderLayout titleMenu={titleMenu} rows={rows} />
          <UserLayout />
        </div>
      </div>
    </div>
    // </TokenProvider>
  );
}

export default UserPage;
