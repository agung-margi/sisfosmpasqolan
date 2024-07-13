import React, { useContext } from 'react';
import { Timeline } from 'antd';
import AuthContext from "../data/AuthContext"


const TimelineAkun = () => {
  const { studentData, loading, error } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {studentData ? (
        <div key={studentData.id} className="">
          <Timeline items={
            [
              {
                children: 'Data pendaftaran sudah diterima',
              },
              {
                children: 'Pendaftaran diproses',
              },
              {
                children: (
                  <span>
                    Pendaftaran berhasil, Keterangan: 
                    <strong className='uppercase'> {studentData.status}</strong>
                  </span>
                ),
              },
            ]
          } />
        </div>
      ) : (
        <div>No status found</div>
      )}
    </div>
  );
}

export default TimelineAkun;
