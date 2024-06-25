import axios from '../../axios'
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

const BiodataContainer = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Mengambil userId, token, dan studentRegisId dari state atau localStorage
  const userId = location.state?.userId || localStorage.getItem('userId');
  const token = location.state?.token || localStorage.getItem('token');
  const studentRegisId = location.state?.studentRegisId || localStorage.getItem('studentRegisId');

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // Memastikan user memiliki studentRegisId
        if (!studentRegisId) {
          throw new Error('User has no student registration data');
        }

        // Mengambil data student dari API
        const response = await axios.get(`/student/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('responses :', response.data.data);

        // Mengatur data student ke state
        setStudentData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    // Memanggil fungsi fetchStudentData
    fetchStudentData();
  }, [userId, studentRegisId, token]);

  if (loading) {
    // Menampilkan loading jika data sedang diambil
    return <div>Loading...</div>;
  }

  if (error) {
    // Menampilkan error jika terjadi kesalahan
    return <div>Error: {error}</div>;
  }

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm space-y-2 mx-10">
      {studentData?.length > 0 ? (
        studentData.map((student) => (
          <div key={student.id} className="space-y-2">
    <table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    <tr>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Field
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Details
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Nama Lengkap</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">:</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.fullName}</td>
    </tr>
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tempat Lahir</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">:</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.placeOfBirth}</td>
    </tr>
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tanggal lahir</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">:</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.dateOfBirth}</td>
    </tr>
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Asal Sekolah</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">:</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.schoolFrom}</td>
    </tr>
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Alamat</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">:</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.address}</td>
    </tr>
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Nomor Hp</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">:</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.phoneNumber}</td>
    </tr>
  </tbody>
</table>
</div>
        ))
      ) : (
        <div>No student data found</div>
      )}
    </div>
  );
};

export default BiodataContainer;
