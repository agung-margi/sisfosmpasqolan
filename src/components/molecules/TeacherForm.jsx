import React from "react";
import FieldText from "../atoms/Field";

const TeacherForm = ({ initialValues, onChange, isEdit }) => {
  const fields = [
    { id: "fullName", label: "Nama Lengkap", placeholder: "Nama Lengkap" },
    { id: "NIP", label: "NIP", placeholder: "NIP", type: "number", disabled: isEdit },
    { id: "address", label: "Alamat Lengkap", placeholder: "Alamat Lengkap" },
    { id: "position", label: "Jabatan", placeholder: "Jabatan" },
    { id: "subjects", label: "Mata Pelajaran", placeholder: "Mata Pelajaran" },
  ];

  return (
    <>
      {fields.map((field) => (
        <FieldText key={field.id} {...field} value={initialValues[field.id]} onChange={onChange} disabled={field.disabled} />
      ))}
    </>
  );
};

export default TeacherForm;
