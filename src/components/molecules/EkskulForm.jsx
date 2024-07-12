import React from 'react'
import FieldText from '../atoms/Field';

const EkskulForm = () => {
  const fields = [
        { id: "extraName", label: "Nama Ekskul", placeholder: "Nama Ekskul" },
        { id: "Catagory", label: "Katagori", placeholder: "Katagori" },
        { id: "shortDesc", label: "Deskripsi Singkat", placeholder: "Deskripsi Singkat" },
        { id: "fullDesc", label: "Deskripsi", placeholder: "Deskripsi" },
        { id: "meetingDays", label: "Jadwal", placeholder: "Jadwal" },
        { id: "coach", label: "Penanggung Jawab", placeholder: "Penanggung Jawab" },
        { id: "location", label: "Lokasi Ekskul", placeholder: "Lokasi Ekskul" },
        { id: "contactInfo", label: "Info Kontak", placeholder: "Info Kontak" },
  ];

  return (
  <>
    {fields.map((field) => (
      <FieldText key={field.id} {...field}/>
    ))}
  </>
  )
}

export default EkskulForm
