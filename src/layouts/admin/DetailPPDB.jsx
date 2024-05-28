import { Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DetailPPDBLayout() {
  const { id } = useParams();
  const [userData, setUserData] = useState([]); // initialize userData as an empty object

  useEffect(() => {
    if (id) {
      axios
        .get(`https://dummyjson.com/users/${id}`)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  return (
    <div className="px-2 border text-center">
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>Detail PPDB</Breadcrumb.Item>
      </Breadcrumb>
      <div className="pb-4">
        <h1 className="text-2xl text-start pb-2">Detail PPDB</h1>
        <form action="">
          <div className="border rounded-sm shadow-xl pb-4">
            <div className="grid grid-cols-2 ">
              <div className="flex flex-col text-start p-2">
                <label htmlFor="firstName" className="py-2">
                  Nama Depan{" "}
                </label>
                <input type="text" value={userData.firstName} className=" text-black" />
                <label htmlFor="lastName" className="py-2">
                  Nama Belakang
                </label>
                <input type="text" value={userData.lastName} />
                <label htmlFor="firstName" className="py-2">
                  NISN{" "}
                </label>
                <input type="text" value={userData.ssn} className=" text-black" />
                <label htmlFor="tanggalLahir" className="py-2">
                  Tanggal Lahir
                </label>
                <input type="text" value={userData.birthDate} />
                <label htmlFor="tinggiBadan" className="py-2">
                  Tinggi Badan
                </label>
                <input type="text" value={userData.height} />
                <label htmlFor="beratBadan" className="py-2">
                  Berat Badan
                </label>
                <input type="text" value={userData.weight} />
                <label htmlFor="asalSekolah" className="py-2">
                  Asal Sekolah
                </label>
                <input type="text" value={userData.university} />
              </div>
              <div className="flex flex-col text-start p-4 ">
                <label htmlFor="tanggalLahir" className="py-2 font-bold">
                  Alamat
                </label>
                <p className="py-2">Jalan</p>
                <input type="text" value={userData.address?.address} />
                <p className="py-2">Kota</p>
                <input type="text" value={userData.address?.city} />
                <p className="py-2">Kode Pos</p>
                <input type="text" value={userData.address?.postalCode} />
                <p className="py-2">Pas Photo</p>
                <img src={userData.image} alt="pas photo" className="h-28 w-28" />
              </div>
            </div>
            <div className="justify-end flex gap-2 py-4 pr-8">
              <button className="bg-blue-600 px-4 py-2 rounded text-white">Konfirmasi Pendaftaran</button>
              <button className="bg-red-600 px-4 py-2 rounded text-white">Reject Pendaftaran</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DetailPPDBLayout;
