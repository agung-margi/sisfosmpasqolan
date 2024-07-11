import React, { useContext } from "react";
import AuthContext from "../data/AuthContext"

const BiodataContainer = () => {
  const { studentData, loading, error } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm space-y-2 mx-10">
      {studentData ? <StudentTable studentData={studentData} /> : <div>No student data found</div>}
    </div>
  );
};

const fieldsToShow = [
  { key: 'fullName', label: 'Nama Lengkap' },
  { key: 'placeOfBirth', label: 'Tempat Lahir' },
  { key: 'dateOfBirth', label: 'Tanggal Lahir' },
  { key: 'schoolFrom', label: 'Asal Sekolah' },
  { key: 'address', label: 'Alamat' },
  { key: 'phoneNumber', label: 'Nomor Hp' },
];

const StudentTable = ({ studentData }) => (
  <div key={studentData.id} className="space-y-2">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {fieldsToShow.map(({ key, label }) => (
          <tr key={key}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{label}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">:</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{studentData[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default BiodataContainer;
