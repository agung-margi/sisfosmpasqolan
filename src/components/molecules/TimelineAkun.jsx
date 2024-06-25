import React, { useEffect, useState } from 'react';
import { Timeline } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TimelineAkun = () => {
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

  const timelineItems = [
    {
      children: 'Data pendaftaran sudah diterima',
    },
    {
      children: 'Pendaftaran diproses',
    },
    {
      children: `Pendaftaran berhasil, Keterangan:`,
    },
  ];

  return (
    <div>
{studentData?.length > 0 ? (
        studentData.map((student) => (
          <div key={student.id} className="space-y-2">

<Timeline items={
        [
    {
      children: 'Data pendaftaran sudah diterima',
    },
    {
      children: 'Pendaftaran diproses',
    },
    {
      children: `Pendaftaran berhasil, Keterangan: ${student.status}`,
    },
  ]
      }/>
          </div>
        ))
      ) : (
        <div>No status found</div>
      )}
    </div>
  );
}

export default TimelineAkun;
