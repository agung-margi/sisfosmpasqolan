import InputFormLabel from "../components/atoms/Input/index";
import IndexButton from "../components/atoms/Button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from '../axios'

const FormLoginFragment = () => {
  const [title, setTitle] = useState("Login");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = title;
  }, [setTitle]);

  // Mendefinisikan fungsi asinkron 'handleLogin' yang akan dipanggil saat formulir login dikirim
  const handleLogin = async (e) => {
    e.preventDefault();
    // Mengumpulkan data dari input email dan password
    const data = {
      emailValue: e.target.email.value,
      passwordValue: e.target.password.value,
    };

    try {
      // Mengirim permintaan POST ke endpoint '/login' dengan data email dan password
      const response = await axios.post('/login', { email: data.emailValue, password: data.passwordValue });
      // Mendapatkan data token, userId, hasStudentRegis, dan studentRegisId dari respon
      const { token, userId, hasStudentRegis, studentRegisId,role } = response.data;
      // Menyimpan token dan userId ke localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      // Memperbarui header default Axios dengan token yang baru
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log("respon :", response);

      if (role === "admin") {
        navigate('/dashboardPage', { state: { userId, token } });
      } else if (hasStudentRegis) {
        navigate('/dashboard', { state: { userId, token, studentRegisId } });
      } else {
        navigate('/daftarsekolah', { state: { userId, token } });
      }
    } catch (error) {
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
