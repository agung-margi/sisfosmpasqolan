import React from "react";
import HeaderLayout from "../../layouts/admin/Header";
import SiderLayout from "../../layouts/admin/Sider";
import DashboardLayout from "../../layouts/admin/Dashboard";
function DashboardPage() {
  const rows = [];
  return (
    <div className="h-screen w-full bg-slate-100">
      <div className="flex flex-row">
        <SiderLayout />
        <div className="h-screen w-full">
          <HeaderLayout titleMenu="Dashboard" rows={rows} />
          <DashboardLayout />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
