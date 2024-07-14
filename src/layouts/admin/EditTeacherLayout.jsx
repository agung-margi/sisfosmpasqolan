import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { GrPowerReset } from "react-icons/gr";
import { MdOutlineCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import TeacherForm from "../../components/molecules/TeacherForm";
import axios from "../../axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import TokenContext from "../../components/data/AuthTokenContext";
import { useNavigate } from "react-router-dom";

function EditTeacherLayout() {
  const { tokenInfo, refreshToken } = useContext(TokenContext);
  const { id } = useParams();
  const [teacherData, setTeacherData] = useState(null);
  const [image, setImage] = React.useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formValues, setFormValues] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const isEdit = !!id;
  React.useEffect(() => {
    refreshToken();
  }, []);

  React.useEffect(() => {
    const fetchTeacherData = async () => {
      if (isEdit) {
        try {
          const response = await axios.get(`/teacher/${id}`);
          const data = response.data.data;
          console.log(data);
          if (response.data.success) {
            setTeacherData(data);
            setFormValues({
              fullName: data.fullName,
              NIP: data.NIP,
              address: data.address,
              position: data.position,
              subjects: data.subjects,
            });
            setSelectedImage(data.image);
          } else {
            throw new Error(response.data.message || "Failed to fetch teacher data");
          }
        } catch (error) {
          console.error("Error fetching teacher data:", error);
        }
      }
    };

    fetchTeacherData();
  }, [id, isEdit]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const fullName = event.target.fullName?.value || "";
    const NIP = event.target.NIP?.value || "";
    const address = event.target.address?.value || "";
    const position = event.target.position?.value || "";
    const subjects = event.target.subjects?.value || "";

    const formDataToSend = new FormData();
    formDataToSend.append("fullName", fullName);
    formDataToSend.append("NIP", isEdit ? NIP : NIP);
    formDataToSend.append("address", address);
    formDataToSend.append("position", position);
    formDataToSend.append("subjects", subjects);
    if (image) {
      formDataToSend.append("image", image);
    }

    try {
      const response = await axios.put(`/teacher/${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${tokenInfo.token}`,
        },
      });
      console.log("Response data:", response.data.success);
      if (response.data.success) {
        navigate("/teacher");
        setSuccessMessage(response.data.message);
        toast.success("Teacher updated successfully");
      } else {
        if (response.data.message) {
          setErrorMessage(`${response.data.message}`);
          toast.error(`${response.data.message}`);
        }
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(`${error.response.data.message}`);
        toast.error(`${error.response.data.message}`);
      }
      setIsSubmitting(false);
    }
  };

  if (!teacherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col bg-white mx-10 my-10 shadow-2xl rounded-lg ">
      <div className="ml-10">
        <h1 className="text-3xl font-bold my-10 ml-2.5">Edit Teacher</h1>
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
          <TeacherForm initialValues={formValues} onChange={handleInputChange} isEdit={isEdit} />
          <div className="flex flex-col ml-2 mb-10">
            <label htmlFor="file-upload" className="font-semibold text-lg mb-2">
              Pas Foto
            </label>
            <input id="file-upload" type="file" style={{ display: "none" }} onChange={handleFileChange} />
            {selectedImage && <img src={selectedImage} alt="Selected Preview" className="rounded-md h-40 w-40 border border-gray-300 mb-2" />}
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
        </Box>
      </div>
    </div>
  );
}

export default EditTeacherLayout;
