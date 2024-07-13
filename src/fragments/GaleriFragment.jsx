import React from "react";
import GaleriContainer from "../components/molecules/GaleriContainer";

const GaleriFragment = () => {
  const images = [
    "https://www.smpkasihananda1.sch.id/upload/picture/50021457CAM4(53).jpg",
    "https://www.smpkasihananda1.sch.id/upload/picture/50021457CAM4(53).jpg",
    "https://www.smpkasihananda1.sch.id/upload/picture/50021457CAM4(53).jpg",
    "https://www.smpkasihananda1.sch.id/upload/picture/50021457CAM4(53).jpg",
    "https://www.smpkasihananda1.sch.id/upload/picture/50021457CAM4(53).jpg",
    "https://www.smpkasihananda1.sch.id/upload/picture/50021457CAM4(53).jpg",
  ];
  return (
    <div className="flex flex-wrap gap-10 bg-green-400">
      <GaleriContainer images={images} />
    </div>
  );
};

export default GaleriFragment;
