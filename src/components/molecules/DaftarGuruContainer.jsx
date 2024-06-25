import React from 'react';

const DaftarGuruContainer = () => {
  const gurus = [
    {
      nama: 'Imam Fauzi, S.Pd.',
      mapel: 'Matematika & IPA',
    },
    {
      nama: 'Yusrina Rahmatillah, S.S.',
      mapel: 'Bahasa Inggris',
    },
    {
      nama: 'Rina Andriani, S.Tr.S.',
      mapel: 'IPS & Seni Budaya',
    },
    {
      nama: 'Laeli Ramadhaniati, S.Pd.',
      mapel: 'Bahasa Indonesia & Prakarya',
    },
    {
      nama: 'Muhammad Ma\'shum',
      mapel: 'Tahfidz',
    },
    {
      nama: 'Arief Zaki',
      mapel: 'Fiqih & Hadist',
    },
    {
      nama: 'Alfiansyah. S.H.',
      mapel: 'Bahasa Arab',
    },
    {
      nama: 'Ahlil Mubarok, S.Pd.',
      mapel: 'Fiqih & Hadist1',
    },
  ];

  return (
    <div className="container mx-auto items-center justify-center lg:pb-20">
      <div className="md:mx-10">
        <h2 className="text-center font-bold text-2xl md:text-3xl lg:text-4xl text-dark my-20">Daftar Guru</h2>
      <table className="w-full bg-[#006666] rounded-lg overflow-hidden border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-[#004d4d] text-white uppercase font-semibold text-sm">Nama</th>
            <th className="py-2 px-4 bg-[#004d4d] text-white uppercase font-semibold text-sm">Mata Pelajaran</th>
          </tr>
        </thead>
        <tbody>
          {gurus.map((guru) => (
            <tr key={guru.nama} className="bg-white text-gray-700 border-b border-gray-300">
              <td className="py-3 px-10 border border-gray-300">{guru.nama}</td>
              <td className="py-3 px-10 border border-gray-300">{guru.mapel}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default DaftarGuruContainer;
