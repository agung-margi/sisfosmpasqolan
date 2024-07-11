import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { GrPowerReset } from "react-icons/gr";
import { MdOutlineCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import TeacherForm from "../../components/molecules/TeacherForm";
import axios from "../../axiosConfig";
import { useState } from "react";
import TokenContext from "../../components/data/AuthTokenContext"

function AddTeacherLayout() {
  const { tokenInfo, refreshToken } = React.useContext(TokenContext);
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    refreshToken();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const fullName = event.target.fullName?.value || "";
    const NIP = event.target.NIP?.value || "";
    const address = event.target.address?.value || "";
    const position = event.target.position?.value || "";
    const subjects = event.target.subjects?.value || "";

    const formDataToSend = new FormData();
    formDataToSend.append('fullName', fullName);
    formDataToSend.append('NIP', NIP);
    formDataToSend.append('address', address);
    formDataToSend.append('position', position);
    formDataToSend.append('subjects', subjects);
    if (image) {
      formDataToSend.append('image', image);
    }

    try {
      const response = await axios.post('/teacher', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${tokenInfo.token}`
        },
      });

      if (response.data.success) {
        setSuccessMessage("Data berhasil disubmit!");
        navigate('/teacher');
      } else {
        setErrorMessage(`Gagal mengirim data: ${response.data.message}`);
      }
    } catch (error) {
      setErrorMessage(`Gagal mengirim data: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleCancel = () => {
  };

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div className="flex flex-col bg-white mx-10 my-10 shadow-2xl rounded-lg ">
      <div className="ml-10">
        <h1 className="text-3xl font-bold my-10 ml-2.5">Add Teacher</h1>
        <div>
          <Box
            component="form"
            onSubmit={handleSubmit}
            onReset={handleReset}
            sx={{
              "& .MuiTextField-root": { m: 1, width: "30%" },
            }}
            noValidate
            autoComplete="off"
          >
            <TeacherForm />
            <div className="flex flex-col ml-2 mb-10">
              <label htmlFor="file-upload" className="">
                Pas Foto
              </label>
              <input
                id="file-upload"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <Button
                variant="outlined"
                component="label"
                htmlFor="file-upload"
                sx={{ mt: 1, width: "10%" }}
              >
                Choose File
              </Button>
            </div>
            <div className="flex mt-8 justify-end mr-16 mb-10 ">
              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{ mr: 2 }}
                size="large"
                disabled={isSubmitting}
              >
                <FaSave className="mr-2" />
                Submit
              </Button>
              <Button
                type="reset"
                variant="contained"
                color="secondary"
                sx={{ mr: 2 }}
              >
                <GrPowerReset className="mr-2" />
                Reset
              </Button>
              <Link to="/teacher">
                <Button
                  variant="contained"
                  onClick={handleCancel}
                  color="error"
                  sx={{ mr: 1 }}
                  size="large"
                >
                  <MdOutlineCancel className="mr-2" />
                  Cancel
                </Button>
              </Link>
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
          </Box>
        </div>
      </div>
    </div>
  );
}

export default AddTeacherLayout;
