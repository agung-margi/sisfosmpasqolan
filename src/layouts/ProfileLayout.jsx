import React from 'react'
import Nav from '../components/molecules/Nav'
import EkskulContainer from '../components/molecules/EkskulContainer'
import DaftarGuruContainer from '../components/molecules/DaftarGuruContainer'
import Footer from "../components/molecules/Footer"
import StrukturOrganisasi from '../components/molecules/StrukturOrganisasiContainer'
import TentangKami from '../components/molecules/TentangKamiContainer'


const ProfileLayout = () => {
  return (
    <div>
      <Nav />
      <div>
      <TentangKami/>
      <StrukturOrganisasi/>
      <DaftarGuruContainer/>
      <EkskulContainer/>
      <Footer />
    </div>
    </div>
  )
}

export default ProfileLayout
