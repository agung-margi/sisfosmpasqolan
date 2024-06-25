import React, { useEffect, useState } from "react";
import { Pagination, Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ContaintLayout() {
  const [studentData, setStudentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSize = 10;
  const userRole = "admin";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/students");
        setStudentData(response.data.students);
        console.log(response.data.students);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const navigate = useNavigate();
  const onProcess = (student) => {
    return navigate(`/editppdb/${student.userId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Pastikan studentData adalah sebuah array sebelum memprosesnya
  const dataToDisplay = Array.isArray(studentData) ? studentData.slice(startIndex, endIndex) : [];

  return (
    <div className="">
      <div className="px-2 border text-center">
        {/* <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List PPDB</Breadcrumb.Item>
        </Breadcrumb> */}
        <table className="table-auto w-full mt-2">
          <thead>
            <tr className="border h-10">
              <th>No</th>
              <th>Nama</th>
              <th>Tempat Lahir</th>
              <th>Tanggal Lahir</th>
              <th>Asal Sekolah</th>
              <th>Alamat</th>
              <th>Nomor Telepon</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataToDisplay.map((student, index) => (
              <tr key={student.id} className="border h-10">
                <td>{startIndex + index + 1}</td>
                <td>{student.fullName}</td>
                <td>{student.placeOfBirth}</td>
                <td>{student.dateOfBirth}</td>
                <td>{student.schoolFrom}</td>
                <td>{student.address}</td>
                <td>{student.phoneNumber}</td>
                <td>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
                    onClick={() => onProcess(student)}
                  >
                    Process
                  </button>
                  {userRole === "administrator" && (
                    <>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                        Edit
                      </button>
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded ml-2">
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 mb-4">
          <Pagination
            current={currentPage}
            total={studentData.length}
            pageSize={pageSize}
            onChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ContaintLayout;
