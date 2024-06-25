import React, { useState } from "react";
import InputFormLabel from "../components/atoms/Input";
import IndexButton from "../components/atoms/Button";
import { Result } from "antd";
import RegisterContainer from "../components/molecules/RegisterContainer";
import { Link } from "react-router-dom";
import DataForm from "../components/data/DataForm";

const RegisterFragments = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        NamaLengkap: e.target.NamaLengkap?.value || "",
        TempatLahir: e.target.TempatLahir?.value || "",
        TanggalLahir: e.target.TanggalLahir?.value || "",
        AsalSekolah: e.target.AsalSekolah?.value || "",
        AlamatRumah: e.target.AlamatRumah?.value || "",
        NomorHP: e.target.NomorHP?.value || "",
        UploadFoto: e.target.PasFoto?.files[0]?.name || "",
      };
      // Simpan data ke local storage
      Object.keys(formData).forEach((key) => {
        localStorage.setItem(key, formData[key]);
      });
      // Redirect ke halaman dashboard setelah data disimpan
      setIsSuccess(true);
      window.location.href = "/dashboard";
      console.log("Data berhasil terkirim");
    } catch (error) {
      console.error("Gagal mengirim data:", error);
    }
  };

  return (
    <>
      {isSuccess ? (
        <div className="flex flex-col justify-center">
          <Result
            status="success"
            title="Pendaftaran Berhasil!"
            subTitle="Data Anda telah berhasil terkirim."
          />
          <p className="pt-2 mt-2 text-center text-sm text-gray-500">
            Kembali ke{" "}
            <Link
              to="/"
              className="font-semibold text-blue-600 hover:text-md hover:font-bold"
            >
              Home
            </Link>
          </p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-10 py-10 my-auto mx-10 lg:flex-row lg:my-auto">
          <RegisterContainer />
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h1 className="flex font-bold text-hijau1 text-2xl text-center md:text-left">
              Pendaftaran Calon Peserta Didik Tahun Pelajaran 2024
            </h1>
            {DataForm.map((input, index) => (
              <InputFormLabel
                key={index}
                label={input.label}
                name={input.name}
                placeholder={input.placeholder}
                type={input.type}
              />
            ))}
            <div className="flex flex-col justify-center space-x-10">
              <IndexButton type="submit" name="Daftar" />
              <p className="pt-2 mt-2 text-center text-sm text-gray-500">
                atau ke halaman{" "}
                <Link
                  to="/"
                  className="font-semibold text-blue-600 hover:text-md hover:font-bold"
                >
                  Home
                </Link>
              </p>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default RegisterFragments;
