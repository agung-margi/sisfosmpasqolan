import { useState, useEffect } from "react";
import InputFormLabel from "../components/atoms/Input/index";
import IndexButton from "../components/atoms/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from '../axiosConfig'
import { message } from "antd";

const FormLoginFragment = () => {
  const [title, setTitle] = useState("Login");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = title;
  }, [setTitle]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      emailValue: e.target.email.value,
      passwordValue: e.target.password.value,
    };

    try {
      const response = await axios.post("/login", { email: data.emailValue, password: data.passwordValue });

      const { hasStudentRegis, role } = response.data;

      if (role === "Admin") {
        navigate('/dashboardPage');
      } else if (hasStudentRegis) {
        navigate('/dashboard');
      } else {
        navigate('/daftarsekolah');
      }
    } catch (error) {
      alert(error.response.data.message)
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <InputFormLabel label="Email" name="email" placeholder="Example@example.com" type="email" />
      <InputFormLabel label="Password" name="password" placeholder="Password" type="password" />
      {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
      <div className="text-sm text-end my-2">
        <Link to="/reset-password" className="font-semibold text-blue-600 hover:text-md hover:font-bold">
          Lupa password?
        </Link>
      </div>
      <div>
        <IndexButton name="Login" />
      </div>
    </form>
  );
};

export default FormLoginFragment;
