import { useState, useEffect } from "react";
import InputFormLabel from "../components/atoms/Input/index";
import IndexButton from "../components/atoms/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";

const RegisterAccountFragment = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = {
      fullName: e.target.fullName.value,
      emailValue: e.target.email.value,
      passwordValue: e.target.password.value,
    };

    if (data.passwordValue !== e.target.konfirmasiPassword.value) {
      setErrorMessage("Konfirmasi Password tidak sesuai");
      return;
    }

    try {
      const response = await axios.post("/register", {
        fullName: data.fullName,
        email: data.emailValue,
        password: data.passwordValue,
      });

      if (response.data.success) {
        navigate("/login");
      } else {
        setErrorMessage(response.data.message || "Terjadi kesalahan saat pendaftaran");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Terjadi kesalahan pada server");
      }
    }
  };

  useEffect(() => {
    document.title = "Daftar Akun";
  }, []);

  return (
    <>
      <form onSubmit={handleRegister}>
        <InputFormLabel label="Nama Lengkap" name="fullName" placeholder="Nama Lengkap" type="text" />
        <InputFormLabel label="Email" name="email" placeholder="Example@example.com" type="email" />
        <InputFormLabel label="Password" name="password" placeholder="Password" type="password" />
        <InputFormLabel label="Konfirmasi Password" name="konfirmasiPassword" placeholder="Konfirmasi Password" type="password" />
        {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
        <div className="text-sm text-end my-2">
          <Link to="/reset-password" className="font-semibold text-blue-600 hover:text-md hover:font-bold">
            Lupa password?
          </Link>
        </div>
        <div>
          <IndexButton name="Daftar" />
        </div>
      </form>
    </>
  );
};

export default RegisterAccountFragment;
