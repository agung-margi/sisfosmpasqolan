import React from "react";
import HeaderLayout from "../../../layouts/admin/Header";
import SiderLayout from "../../../layouts/admin/Sider";
import AddTeacherLayout from "../../../layouts/admin/AddTeacherLayout";
import { TokenProvider } from "../../../components/data/AuthTokenContext"
// import EditTeacherLayout from "../../../layouts/admin/EditTeacherLayout";

function AddTeacherPage() {
  const titleMenu = "All Teachers";
  const rows = [];

  return (
    <TokenProvider>
      <div className="h-screen w-full bg-slate-100">
        <div className="flex flex-row">
          <SiderLayout />
          <div className="h-screen w-full">
            <HeaderLayout titleMenu={titleMenu} rows={rows} />
            <AddTeacherLayout />
          </div>
        </div>
      </div>
    </TokenProvider>
  );
}

export default AddTeacherPage;
