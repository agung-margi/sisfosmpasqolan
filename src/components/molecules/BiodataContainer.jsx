import React, { useState, useEffect } from "react";

const BiodataContainer = () => {
  // State untuk menyimpan data dari local storage
  const [userData, setUserData] = useState({});

  // Mengambil data dari local storage saat komponen dimount
  useEffect(() => {
    const dataFromLocalStorage = {
      NamaLengkap: localStorage.getItem("NamaLengkap"),
      TempatLahir: localStorage.getItem("TempatLahir"),
      TanggalLahir: localStorage.getItem("TanggalLahir"),
      AsalSekolah: localStorage.getItem("AsalSekolah"),
      AlamatRumah: localStorage.getItem("AlamatRumah"),
      NomorHPWA: localStorage.getItem("NomorHP/WA"),
      UploadFoto: localStorage.getItem("UploadFoto"),
    };

    // Set data ke dalam state
    setUserData(dataFromLocalStorage);
  }, []);

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm space-y-2 mx-10">
      <p>Nama Lengkap: {userData.NamaLengkap}</p>
      <p>Tempat Lahir: {userData.TempatLahir}</p>
      <p>Tanggal Lahir: {userData.TanggalLahir}</p>
      <p>Asal Sekolah: {userData.AsalSekolah}</p>
      <p>Alamat Rumah: {userData.AlamatRumah}</p>
      <p>Nomor HP/WA: {userData.NomorHPWA}</p>
    </div>
  );
};

export default BiodataContainer;
