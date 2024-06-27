import React from "react";
import FieldText from "../atoms/Field";

const TeacherForm = () => {
  const fields = [
    { id: "fullname", label: "Nama Lengkap", placeholder: "Nama Lengkap" },
    { id: "nip", label: "NIP", placeholder: "NIP" },
    { id: "address", label: "Alamat Lengkap", placeholder: "Alamat Lengkap" },
    { id: "position", label: "Jabatan", placeholder: "Jabatan" },
    { id: "subjects", label: "Mata Pelajaran", placeholder: "Mata Pelajaran" },
  ];

  return (
    <>
      {fields.map((field) => (
        <FieldText key={field.id} {...field} />
      ))}
    </>
  );
};

export default TeacherForm;
