import axios from '../../../axios'
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

const IndexCardImg = () => {
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
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

    return (
      <div className="sm:mx-auto sm:w-full sm:max-w-sm space-y-2 mx-10">
      {studentData?.length > 0 ? (
        studentData.map((student) => (
          <div key={student.id} className="space-y-2">
    <img src={student.images} alt="Student" />
</div>

        ))
      ) : (
        <div>No Image found</div>
      )}
    </div>
  );
};

export default IndexCardImg;
