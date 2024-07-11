import React from "react";
import HeaderLayout from "../../../layouts/admin/Header";
import SiderLayout from "../../../layouts/admin/Sider";
import PPDBLayout from "../../../layouts/admin/PPDB";
import { TokenProvider } from "../../../components/data/AuthTokenContext"

function PPDBPage() {
  const titleMenu = "All PPDB";
  const rows = [];

  return (
    <TokenProvider>
      <div className="h-screen w-full bg-slate-100">
        <div className="flex flex-row">
          <SiderLayout />
          <div className="h-screen w-full">
            <HeaderLayout titleMenu={titleMenu} rows={rows} />
            <PPDBLayout />
          </div>
        </div>
      </div>
    </TokenProvider>
  );
}

export default PPDBPage;
