import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "../../axios";

function DetailPPDBLayout() {
  const userId  = useParams();
  const [userData, setUserData] = useState({});
  const location = useLocation();
  const token = location.state?.token || localStorage.getItem('token');

  useEffect(() => {
    console.log("userId from useParams:", userId.id);  // Add logging to check userId
    const fetchStudentData = async () => {
      try {
        if (!userId.id) {
          throw new Error('Student data not found');
        }

        const response = await axios.get(`/student/${userId.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Response data:", response.data.data);
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, [userId, token]);

  if (!userId) {
    return <div>Error: Student ID is missing</div>;  // Add user-friendly error message
  }

  return (
    <div className="px-2 border text-center">
      <div className="pb-4">
        <h1 className="text-2xl text-start pb-2">Detail PPDB</h1>
        <form action="">
          <div className="border rounded-sm shadow-xl pb-4">
              {userData?.length > 0 ?(userData.map((student) => (
            <div key={student.id} className="grid grid-cols-2">
              {/* Sisi kiri */}
                <div className="flex flex-col text-start p-2">
                <div className="flex items-center py-2">
                  <label htmlFor="firstName" className="font-bold mr-2 w-1/3">Nama Lengkap</label>
                  <label htmlFor="titik" className="font-bold mr-2">:</label>
                  <input type="text" value={student.fullName || ''} className="text-black flex-1" readOnly />
                </div>
                <div className="flex items-center py-2">
                  <label htmlFor="lastName" className="font-bold mr-2 w-1/3">Tempat Lahir</label>
                  <label htmlFor="titik" className="font-bold mr-2">:</label>
                  <input type="text" value={student.placeOfBirth || ''} className="text-black flex-1" readOnly />
                </div>
                <div className="flex items-center py-2">
                  <label htmlFor="birthDate" className="font-bold mr-2 w-1/3">Tanggal Lahir</label>
                  <label htmlFor="titik" className="font-bold mr-2">:</label>
                  <input type="text" value={student.dateOfBirth || ''} className="text-black flex-1" readOnly />
                </div>
                <div className="flex items-center py-2">
                  <label htmlFor="university" className="font-bold mr-2 w-1/3">Asal Sekolah</label>
                  <label htmlFor="titik" className="font-bold mr-2">:</label>
                  <input type="text" value={student.schoolFrom || ''} className="text-black flex-1" readOnly />
                </div>
                <div className="flex items-center py-2">
                  <label htmlFor="university" className="font-bold mr-2 w-1/3">Alamat Lengkap</label>
                  <label htmlFor="titik" className="font-bold mr-2">:</label>
                  <input type="text" value={student.address || ''} className="text-black flex-1" readOnly />
                </div>
                <div className="flex items-center py-2">
                  <label htmlFor="university" className="font-bold mr-2 w-1/3">No Handphone</label>
                  <label htmlFor="titik" className="font-bold mr-2">:</label>
                  <input type="text" value={student.phoneNumber || ''} className="text-black flex-1" readOnly />
                </div>
              </div>

              {/* Sisi kanan */}
              <div className="flex flex-col text-start p-4">
                <p className="py-2 font-bold">Pas Photo :</p>
                {student.images ? (
                  <img src={student.images} alt="pas photo" className="h-28 w-28" />
                ) : (
                  <p>Image not available</p>
                )}
              </div>
</div>


))): (
        // Menampilkan pesan jika data student tidak ditemukan
        <div>No student data found</div>
        )}
              




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
