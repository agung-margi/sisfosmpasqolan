import React, { useState, useEffect } from 'react';
import axios from 'axios';

const dataTeacher = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/teachers?page=1&limit=6&orderBy=1');
    console.log("response", response.data.data)
    if (response.status === 200) {
      return response.data.data;
    } else {
      console.error(`Error fetching teacher data: ${response.statusText}`);
      return [];
    }
  } catch (error) {
    console.error('Error fetching teacher data:', error);
    return [];
  }
};




function StrukturOrganisasi() {
  const [position, setPosition] = useState([]);

  console.log("position", position)

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherData = await dataTeacher();
        setPosition(teacherData.data); // Assuming teacherData.data contains the array of positions
      } catch (error) {
        console.error('Error fetching teacher data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-20 items-center justify-center">
      <h2 className="text-center font-bold text-2xl md:text-3xl lg:text-4xl text-dark my-20">Struktur Organisasi</h2>
      <div className="w-full flex flex-col items-center">
        {/* Container khusus untuk kepala sekolah */}
        <div className="w-full flex justify-center mb-8">
          <div className="w-1/2 md:w-1/3 p-4 border rounded shadow text-center">
            <h3 className="text-xl font-bold">Kepala Sekolah</h3>
            <p className="text-gray-600">Alfiansyah</p>
          </div>
        </div>
        {/* Container untuk grid jabatan lainnya */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          {position.map((x) => (
            <div key={x.id} className="p-4 border rounded shadow text-center">
              <h3 className="text-xl font-bold">{x.position}</h3>
              <p className="text-gray-600">{x.fullName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StrukturOrganisasi;
