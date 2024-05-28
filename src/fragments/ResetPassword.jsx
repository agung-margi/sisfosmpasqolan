import InputFormLabel from "../components/atoms/Input/index";
import IndexButton from "../components/atoms/Button";
import { useState, useEffect } from "react";

const FormResetPassword = () => {
  const [title, setTitle] = useState("Reset Password");

  useEffect(() => {
    document.title = title;
  }, [setTitle]);

  const handleReset = (e) => {
    e.preventDefault();

    const emailValue = e.target.email.value;
    if (emailValue === "") {
      alert("Email harus diisi");
    } else {
      alert(`Reset Password Telah dikirim ke email ${emailValue}`);
      window.location.href = "/login";
    }
  };

  return (
    <form onSubmit={handleReset}>
      <InputFormLabel label="Email" name="email" placeholder="Example@example.com" type="email" />
      <div className="text-sm text-end mt-4 mb-4">
        <IndexButton name="Reset Password" />
      </div>
    </form>
  );
};

export default FormResetPassword;
