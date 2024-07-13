import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DaftarGuruContainer = () => {
  const [gurus, setGurus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/teachers?page=1&limit=8&orderBy=2');
        console.log("response guru", response)
        if (response.status === 200) {
          const teacherData = response.data.data;
          setGurus(teacherData.data); // Update state with actual teacher data
        } else {
          console.error(`Error fetching teacher data: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error fetching teacher data:', error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching (success or error)
      }
    };
    fetchData();
  }, []); // Empty dependency array to fetch data on component mount

  return (
    <div className="container my-24 mx-auto px-auto items-center justify-center">
      <h2 className="text-center font-bold text-2xl lg:text-4xl text-hijau1 my-10 lg:my-24">Daftar Guru</h2>
      {isLoading ? (
        <p>Loading teachers...</p>
      ) : (
        <table className="w-full bg-[#006666] rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-[#004d4d] text-white uppercase font-semibold text-sm">Nama</th>
              <th className="py-2 px-4 bg-[#004d4d] text-white uppercase font-semibold text-sm">Mata Pelajaran</th>
            </tr>
          </thead>
          <tbody>
            {gurus && gurus.length > 0 ? (
              gurus.map((guru) => (
                <tr key={guru.id} className="bg-white text-gray-700">
                  <td className="py-3 px-10">{guru.fullName}</td>
                  <td className="py-3 px-10">{guru.subjects}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="py-3 px-10 text-center">No teachers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DaftarGuruContainer;
