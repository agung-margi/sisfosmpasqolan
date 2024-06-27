import React from "react";
import HeaderLayout from "../../../layouts/admin/Header";
import SiderLayout from "../../../layouts/admin/Sider";
import DetailPPDBLayout from "../../../layouts/admin/DetailPPDB";

function DashboardPage() {
  return (
    <div className="flex flex-row">
      <SiderLayout />
      <div className="h-screen w-full">
        <HeaderLayout />
        <DetailPPDBLayout />
      </div>
    </div>
  );
}

export default DashboardPage;
