import React, { useContext } from "react";
import AuthContext from "../../data/AuthContext"

const IndexCardImg = () => {
  const { studentData, loading, error } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex justify-center items-center sm:mx-auto sm:w-full sm:max-w-sm space-y-2">
      {studentData ? (
        <div key={studentData.id} className="w-[250px] space-y-2">
          <img src={studentData.images} alt="Student" className='max-w-full bg-origin-padding p-4' />
        </div>
      ) : (
        <div>No Image found</div>
      )}
    </div>
  );
};

export default IndexCardImg;
