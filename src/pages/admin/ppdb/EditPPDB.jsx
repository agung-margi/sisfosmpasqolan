import React from "react";
import HeaderLayout from "../../../layouts/admin/Header";
import SiderLayout from "../../../layouts/admin/Sider";
import { TokenProvider } from "../../../components/data/AuthTokenContext";

function EditPPDB() {
  return (
    <TokenProvider>
      <div className="flex flex-row">
        <SiderLayout />
        <div className="h-screen w-full">
          <HeaderLayout />
        </div>
      </div>
    </TokenProvider>
  );
}

export default EditPPDB;
