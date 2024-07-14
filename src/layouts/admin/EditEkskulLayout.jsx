import React from "react";
import { Box, Button } from "@mui/material";
import { GrPowerReset } from "react-icons/gr";
import { MdOutlineCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { Link, useNavigate,useParams } from "react-router-dom";
import EkskulForm from "../../components/molecules/EkskulForm";
import axios from "../../axiosConfig";
import { useState } from "react";
import TokenContext from "../../components/data/AuthTokenContext";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function EditEkskulLayout() {
  const { tokenInfo, refreshToken } = React.useContext(TokenContext);
  const { id } = useParams();
  const [images, setImages] = useState(null);
  const [ekskulData, setEkskulData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formValues, setFormValues] = useState({
    extraName: "",
    catagory: "",
    shortDesc: "",
    fullDesc: "",
    meetingDays: "",
    coach: "",
    location: "",
    contactInfo: "",
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    refreshToken();
  }, []);


  React.useEffect(() => {
    const fetchEkskul = async () => {
      try {
        const response = await axios.get(`/ekskul/${id}`, {
          headers: {
            Authorization: `Bearer ${tokenInfo.token}`,
          },
        });
        const data = response.data.data;
        console.log(data);
        if (response.data.success) {
          setEkskulData(data);
          setFormValues({
            extraName: data.extraName,
            catagory: data.catagory,
            shortDesc: data.shortDesc,
            fullDesc: data.fullDesc,
            meetingDays: data.meetingDays,
            coach: data.coach,
            location: data.location,
            contactInfo: data.contactInfo,
          });
          // setSelectedImages(data.images || []);
        } else {
          throw new Error(response.data.message || "Failed to fetch teacher data");
        }
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };
    fetchEkskul();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    if (event.target.files) {
      const files = event.target.files;
      setImages(files);
      const selectedImages = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = () => {
          selectedImages.push(reader.result);
          setSelectedImages([...selectedImages]);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    Object.entries(formValues).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formDataToSend.append("images", images[i]);
      }
    }
    console.log("Form data to send:", [...formDataToSend]);
    try {
      const response = await axios.put(`/ekskul/${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${tokenInfo.token}`,
        },
      });

      console.log("Response data:", response.data);

      if (response.data.success) {
        toast.success("Ekskul created successfully");
        navigate("/ekskul");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        console.error("Error:", error.message);
        toast.error(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleReset = () => {
    setImages(null);
    setSelectedImages([]);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleCancel = () => {
    navigate("/ekskul");
  };

  return (
    <div className="flex flex-col bg-white mx-10 my-10 shadow-2xl rounded-lg">
      <div className="ml-10">
        <h1 className="text-2xl font-bold my-10 ml-2.5">Edit Ekskul</h1>
        <div>
          <Box
            component="form"
            onSubmit={handleSubmit}
            onReset={handleReset}
            sx={{
              "& .MuiTextField-root": { m: 1, width: "50%" },
            }}
            noValidate
            autoComplete="off"
          >
            <EkskulForm initialValues={formValues} onChange={handleInputChange} />
            <div className="flex flex-col ml-2 mb-10">
              <label htmlFor="file-upload" className="">
                Pas Foto
              </label>
              <input id="file-upload" type="file" style={{ display: "none" }} onChange={handleFileChange} />
              {selectedImages.length > 0 && <img src={selectedImages[selectedImages.length - 1]} alt="Selected Preview" className="rounded-md h-40 w-40 border border-gray-300" />}
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
              <Link to="/ekskul">
                <Button variant="contained" onClick={handleCancel} color="error" sx={{ mr: 1 }} size="large">
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
