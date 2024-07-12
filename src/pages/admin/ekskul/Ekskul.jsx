import React from 'react'
import HeaderLayout from '../../../layouts/admin/Header'
import SiderLayout from '../../../layouts/admin/Sider'
import Ekskul from '../../../layouts/admin/Ekskul'

export default function EkskulPage() {
  const titleMenu = "All Ekskuls";
  const rows = [];
  
  return (
  <div className="h-screen w-full bg-slate-100">
    <div className="flex flex-row">
      <SiderLayout />
      <div className="h-screen w-full">
        <HeaderLayout titleMenu={titleMenu} rows={rows} />
        <Ekskul />
      </div>
    </div>
  </div>
  )
}
