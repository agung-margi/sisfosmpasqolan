import React from 'react'
import HeaderLayout from '../../../layouts/admin/Header'
import SiderLayout from '../../../layouts/admin/Sider'
import EditEkskulLayout from '../../../layouts/admin/EditEkskulLayout'
import { TokenProvider } from '../../../components/data/AuthTokenContext'

function EditEkskulPage() {
  const titleMenu = "Edit Ekstrakulilkuler";
  const rows = [];

  return (
    <TokenProvider>
      <div className="h-screen w-full bg-slate-100">
        <div className="flex flex-row">
          <SiderLayout />
          <div className="h-screen w-full">
            <HeaderLayout titleMenu={titleMenu} rows={rows} />
            <EditEkskulLayout />
          </div>
        </div>
      </div>
    </TokenProvider>
  )
}

export default EditEkskulPage;