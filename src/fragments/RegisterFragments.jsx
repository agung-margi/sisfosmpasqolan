import React, { useEffect, useState, useContext } from "react";
import InputFormLabel from "../components/atoms/Input";
import IndexButton from "../components/atoms/Button";
import { Result } from "antd";
import RegisterContainer from "../components/molecules/RegisterContainer";
import { Link, useNavigate } from "react-router-dom";
import DataForm from "../components/data/DataForm";
import instance from "../axiosConfig";
import TokenContext from "../components/data/AuthTokenContext"

const RegisterFragments = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { tokenInfo, refreshToken } = useContext(TokenContext);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = e.target.NamaLengkap?.value || "";
    const placeOfBirth = e.target.TempatLahir?.value || "";
    const dateOfBirth = e.target.TanggalLahir?.value || "";
    const schoolFrom = e.target.AsalSekolah?.value || "";
    const address = e.target.AlamatRumah?.value || "";
    const phoneNumber = e.target.phoneNumber?.value || "";

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('placeOfBirth', placeOfBirth);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('schoolFrom', schoolFrom);
    formData.append('address', address);
    formData.append('phoneNumber', phoneNumber);
    formData.append('userId', tokenInfo.userId);

    if (e.target.image?.files[0]) {
      formData.append('image', e.target.image.files[0]);
    }

    try {
      const response = await instance.post('/studentRegis', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${tokenInfo.token}`
        },
      });

      if (response.data.success) {
        setIsSuccess(true);
        navigate('/dashboard');
      } else {
        console.error("Gagal mengirim data:", response.data.message);
      }
    } catch (error) {
      console.error("Gagal mengirim data:", error.response ? error.response.data : error.message);
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