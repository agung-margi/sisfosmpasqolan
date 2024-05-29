import React from "react";

const GaleriContainer = ({ images }) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-6 pb-8">Galeri</h1>
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-y-8  gap-x-4 h-auto ">
          {images.map((image, index) => (
            <div key={index} className="bg-gray-200 rounded-lg overflow-hidden shadow-lg shadow-gray-600 w-96">
              <img src={image} alt={`Image ${index + 1}`} className="w-full h-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GaleriContainer;
