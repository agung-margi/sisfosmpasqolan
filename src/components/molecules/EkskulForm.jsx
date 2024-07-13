import React from "react";
import FieldText from "../atoms/Field";

const EkskulForm = ({ initialValues, onChange }) => {
  const fields = [
    { id: "extraName", label: "Nama Ekskul", placeholder: "Nama Ekskul" },
    { id: "category", label: "Kategori", placeholder: "Kategori" },
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
        <FieldText key={field.id} id={field.id} label={field.label} placeholder={field.placeholder} value={initialValues[field.id] || ""} onChange={onChange} />
      ))}
    </>
  );
};

export default EkskulForm;
