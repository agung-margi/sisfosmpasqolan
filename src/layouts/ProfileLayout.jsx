import React from 'react'
import Nav from '../components/molecules/Nav'
import EkskulContainer from '../components/molecules/EkskulContainer'
import VisiMisiContainer from '../components/molecules/VisiMisiContainer'
import DaftarGuruContainer from '../components/molecules/DaftarGuruContainer'
import Footer from "../components/molecules/Footer"
import StrukturOrganisasi from '../components/molecules/StrukturOrganisasiContainer'
import TentangKami from '../components/molecules/TentangKamiContainer'


const ProfileLayout = () => {
  return (
    <div>
      <Nav />
      <TentangKami/>
      <StrukturOrganisasi/>
      <DaftarGuruContainer/>
      <VisiMisiContainer/>
      <Footer />
    </div>
  )
}

export default ProfileLayout
