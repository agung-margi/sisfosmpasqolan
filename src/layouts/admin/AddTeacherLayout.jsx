import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { GrPowerReset } from "react-icons/gr";
import { MdOutlineCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TeacherForm from "../../components/molecules/TeacherForm";
import axios from "../../axiosConfig";
import TokenContext from "../../components/data/AuthTokenContext";

function AddTeacherLayout() {
  const { tokenInfo, refreshToken } = useContext(TokenContext);
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({
    fullName: "",
    NIP: "",
    address: "",
    position: "",
    subjects: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    Object.entries(formValues).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    if (image) {
      formDataToSend.append("image", image);
    }

    try {
      const response = await axios.post("/teacher", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${tokenInfo.token}`,
        },
      });

      console.log("Response data:", response.data); // Check the entire response

      if (response.data.success) {
        navigate("/teacher");
        toast.success("Teacher created successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormValues({
      fullName: "",
      NIP: "",
      address: "",
      position: "",
      subjects: "",
    });
    setImage(null);
    setSelectedImage(null);
  };

  return (
    <div className="flex flex-col bg-white mx-10 my-10 shadow-2xl rounded-lg ">
      <div className="ml-10">
        <h1 className="text-3xl font-bold my-10 ml-2.5">Add Teacher</h1>
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
          <TeacherForm initialValues={formValues} onChange={handleInputChange} />
          <div className="flex flex-col ml-2 mb-10">
            <label htmlFor="file-upload" className="font-semibold text-lg mb-2">
              Pas Foto
            </label>
            <input id="file-upload" type="file" style={{ display: "none" }} onChange={handleFileChange} />
            {selectedImage && <img src={selectedImage} alt="Selected Preview" className="rounded-md h-40 w-40 border border-gray-300" />}
            <Button variant="outlined" component="label" htmlFor="file-upload" sx={{ mt: 1, width: "20%" }}>
              Choose File
            </Button>
          </div>
          <div className="flex mt-8 justify-end mr-16 mb-10 ">
            <Button type="submit" variant="contained" color="success" sx={{ mr: 2 }} size="large" disabled={isSubmitting}>
              <FaSave className="mr-2" />
              Submit
            </Button>
            <Button type="reset" variant="contained" color="secondary" sx={{ mr: 2 }}>
              <GrPowerReset className="mr-2" />
              Reset
            </Button>
            <Link to="/teacher">
              <Button variant="contained" color="error" sx={{ mr: 1 }} size="large">
                <MdOutlineCancel className="mr-2" />
                Cancel
              </Button>
            </Link>
          </div>
          <ToastContainer />
        </Box>
      </div>
    </div>
  );
}

export default AddTeacherLayout;
