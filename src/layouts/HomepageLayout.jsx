import React from "react";
import Nav from "../components/molecules/Nav";
import Footer from "../components/molecules/Footer";
import Hero from "../components/molecules/Hero";
import ProfileHome from "../components/molecules/ProfileHomeCont";
import EkskulHomeCont from "../components/molecules/EkskulHomeCont";
import PreatasiContainer from "../components/molecules/PrestasiContainer";
import GaleriFragment from "../fragments/GaleriFragment";
const HomepageLayout = () => {
  return (
    <div>
      <div className="absolute">
        <Nav />
      </div>
      <Hero />
      <ProfileHome />
      <EkskulHomeCont />
      <PreatasiContainer />
      <GaleriFragment />
      <Footer />
    </div>
  );
};

export default HomepageLayout;
