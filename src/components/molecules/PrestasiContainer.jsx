import React from "react";

function PrestasiContainer() {
  return (
    <div className="pb-12">
      <h1 className="text-center text-3xl font-semibold py-8 bg-slate-200">Prestasi Kami</h1>
      <div className="flex justify-center flex-wrap mx-auto px-4 py-16">
        <div className="flex flex-wrap justify-center item-center gap-12">
          <div className="bg-white rounded-md w-52 shadow-2xl shadow-gray-800 border-2">
            <div className="flex justify-center">
              <img src="./src/assets/img/prestasi/2.jpg" alt="Image 3" className="w-50 p-2 h-auto rounded-2xl" />
            </div>
            <p className="px-2 pb-2 text-center font-bold">Juara 3 Lomba Tahfidz Remaja 2022</p>
          </div>
          <div className="bg-white rounded-md shadow-2xl shadow-gray-800 w-52 border-2">
            <div className="flex justify-center">
              <img src="./src/assets/img/prestasi/1.jpg" alt="Image 3" className="w-50 p-2 h-auto rounded-2xl" />
            </div>
            <p className="px-2 pb-2 text-center font-bold">Juara 3 Lomba Tahfidz Remaja 2023</p>
          </div>
          <div className="bg-white rounded-md shadow-2xl shadow-gray-800 w-52 border-2">
            <div className="flex justify-center ">
              <img src="./src/assets/img/prestasi/3.jpg" alt="Image 3" className="w-50 p-2 h-auto rounded-2xl " />
            </div>
            <p className="px-2 pb-2 text-center font-bold">Juara 3 Lomba Tahfidz Remaja 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrestasiContainer;
