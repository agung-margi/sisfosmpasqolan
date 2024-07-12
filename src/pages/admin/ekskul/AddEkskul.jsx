import React from 'react'
import HeaderLayout from '../../../layouts/admin/Header'
import SiderLayout from '../../../layouts/admin/Sider'
import AddEkskulLayout from '../../../layouts/admin/AddEkskulLayout'
import { TokenProvider } from '../../../components/data/AuthTokenContext'

export default function AddEkskulPage() {
  const titleMenu = "All Teachers";
  const rows = [];

  return (
    <TokenProvider>
      <div className="h-screen w-full bg-slate-100">
        <div className="flex flex-row">
          <SiderLayout />
          <div className="h-screen w-full">
            <HeaderLayout titleMenu={titleMenu} rows={rows} />
            <AddEkskulLayout />
          </div>
        </div>
      </div>
    </TokenProvider>
  )
}
