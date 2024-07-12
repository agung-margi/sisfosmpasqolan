import React from "react";
import HeaderLayout from "../../../layouts/admin/Header";
import SiderLayout from "../../../layouts/admin/Sider";
import DetailPPDBLayout from "../../../layouts/admin/DetailPPDB";
import { TokenProvider } from "../../../components/data/AuthTokenContext";

function DashboardPage() {
  return (
    <TokenProvider>
      <div className="flex flex-row">
        <SiderLayout />
        <div className="h-screen w-full">
          <HeaderLayout />
          <DetailPPDBLayout />
        </div>
      </div>
    </TokenProvider>
  );
}

export default DashboardPage;
