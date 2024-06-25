import InputFormLabel from "../components/atoms/Input/index";
import IndexButton from "../components/atoms/Button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FormLoginFragment = () => {
  const [title, setTitle] = useState("Login");
  const [errorMessage, setErrorMessage] = useState("");
  const [email,setEmail]=useState('')
  const [password, setPassword]=useState('')

  useEffect(() => {
    document.title = title;
  }, [setTitle]);

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      emailValue: e.target.email.value,
      passwordValue: e.target.password.value, 
    };

    const emailStored = localStorage.getItem("email");
    const passwordStored = localStorage.getItem("password");

    if (data.emailValue === emailStored && data.passwordValue === passwordStored) {
      localStorage.setItem("email", data.emailValue);
      localStorage.setItem("password", data.passwordValue);
      window.location.href = "/menu";
    } else {
      setErrorMessage("Email atau password salah");
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
