import React, { useContext } from "react";
import AuthContext from "../../data/AuthContext"

const IndexCardImg = () => {
  const { studentData, loading, error } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm space-y-2 mx-10">
      {studentData ? (
        <div key={studentData.id} className="space-y-2">
          <img src={studentData.images} alt="Student" className='w-1/2 float-right' />
        </div>
      ) : (
        <div>No Image found</div>
      )}
    </div>
  );
};

export default IndexCardImg;
