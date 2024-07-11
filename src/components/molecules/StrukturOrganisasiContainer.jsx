import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const dataTeacher = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/teachers');
        if (response.status === 200) {
            const teacherData = response.data;
            return teacherData;
          } else {
            console.error(`Error fetching teacher data: ${response.statusText}`);
          }
        } catch (error) {
          console.error('Error fetching teacher data:', error);
        }
      };
     

(async () => {
    const positions = await dataTeacher();
  })();

  function StrukturOrganisasi() {
    const [positions, setPositions] = useState([]); // Assuming you want to manage state
  
    // Fetch data (if not already done)
    useEffect(() => {
      const fetchData = async () => {
        const teacherData = await dataTeacher();
        setPositions(teacherData.data.data); // Update state with actual teacher data
      };
      fetchData();
    }, []); // Empty dependency array to fetch data on component mount
  
    return (
      <div className="container mx-auto items-center justify-center">
        <h2 className="text-center font-bold text-2xl text-hijau1 my-4">Struktur Organisasi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {positions.map((position, index) => (
            <div key={index} className="bg-teal-700 rounded-lg p-4">
              <h3 className="text-lg font-bold text-white mb-4">{position.fullName} - {position.position}</h3>
              {/* Access other teacher data here if needed */}
              {position.subjects && <p>Subjects: {position.subjects}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  }
  

export default StrukturOrganisasi;