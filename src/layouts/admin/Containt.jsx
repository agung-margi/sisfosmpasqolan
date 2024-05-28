import React, { useEffect, useState } from "react";
import { Pagination, Breadcrumb } from "antd";
import { redirect, useNavigate } from "react-router-dom";

function ContaintLayout() {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const userRole = "admin";

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => setUserData(data.users));
  }, []);

  // menampilkan data yang sesuai dengan halaman yang dipilih
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const navigate = useNavigate();
  const onProcess = (user) => {
    return navigate(`/editppdb/${user.id}`);
  };
  // Mencari index awal dan akhir data yang ditampilkan di halaman saat ini

  return (
    <div className="">
      <div className="px-2 border text-center">
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List PPDB</Breadcrumb.Item>
        </Breadcrumb>
        <table className="table-auto w-full mt-2">
          <thead>
            <tr className="border h-10">
              <th>No</th>
              <th>Nama</th>
              <th>Alamat</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.slice(startIndex, endIndex).map((user, index) => (
              <tr key={user.id} className="border h-10">
                <td>{startIndex + index + 1}</td>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{`${user.address.address}, ${user.address.city}, ${user.address.postalCode}`}</td>
                <td>
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded">Process</button>
                  {userRole == "administrator" && (
                    <>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">Edit</button>
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded ml-2">Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 mb-4">
          <Pagination current={currentPage} total={userData.length} pageSize={pageSize} onChange={onPageChange} />
        </div>
      </div>
    </div>
  );
}

export default ContaintLayout;
