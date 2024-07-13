import React from 'react'
import Nav from '../components/molecules/Nav'
import DaftarGuruContainer from '../components/molecules/DaftarGuruContainer'
import Footer from "../components/molecules/Footer"
import StrukturOrganisasi from '../components/molecules/StrukturOrganisasiContainer'
import TentangKami from '../components/molecules/TentangKamiContainer'


const ProfileLayout = () => {
  return (
    <div>
      <Nav />
      <div className="container px-4 lg:px-10">
        <TentangKami />
        <StrukturOrganisasi />
        <DaftarGuruContainer />
      </div>
      <Footer />
    </div>
  );
};

export default ProfileLayout;
