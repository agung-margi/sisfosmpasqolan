import React from "react";
import HeaderLayout from "../../../layouts/admin/Header";
import SiderLayout from "../../../layouts/admin/Sider";
import EditTeacherLayout from "../../../layouts/admin/EditTeacherLayout";

function EditTeacherPage() {
  const titleMenu = "All Teachers";
  const rows = [];

  return (
    <div className="h-screen w-full bg-slate-100">
      <div className="flex flex-row">
        <SiderLayout />
        <div className="h-screen w-full">
          <HeaderLayout titleMenu={titleMenu} rows={rows} />
          <EditTeacherLayout />
        </div>
      </div>
    </div>
  );
}

export default EditTeacherPage;
