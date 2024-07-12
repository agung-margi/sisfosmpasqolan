import React from 'react'
import { Box, Button } from '@mui/material'
import { GrPowerReset } from 'react-icons/gr'
import { MdOutlineCancel } from 'react-icons/md'
import { FaSave } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import EkskulForm from '../../components/molecules/EkskulForm'
import axios from '../../axiosConfig'
import { useState } from 'react'
import TokenContext from '../../components/data/AuthTokenContext'

export default function AddEkskulLayout() {
  const { tokenInfo, refreshToken } = React.useContext(TokenContext);
  const [images, setImages] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  
  React.useEffect(() => {
    refreshToken();
  }, []);

  const handleSubmit = async(event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const extraName = event.target.extraName?.value || "";
    const catagory = event.target.catagory?.value || "";
    const shortDesc = event.target.shortDesc?.value || "";
    const fullDesc = event.target.fullDesc?.value || "";
    const meetingDays = event.target.meetingDays?.value || "";
    const coach = event.target.coach?.value || "";
    const location = event.target.location?.value || "";
    const contactInfo = event.target.contactInfo?.value || "";

    const formDataToSend = new FormData();
    formDataToSend.append('extraName', extraName);
    formDataToSend.append('catagory', catagory);
    formDataToSend.append('shortDesc', shortDesc);
    formDataToSend.append('fullDesc', fullDesc);
    formDataToSend.append('meetingDays', meetingDays);
    formDataToSend.append('coach', coach);
    formDataToSend.append('location', location);
    formDataToSend.append('contactInfo', contactInfo);
   
    if (images) {
        [...images].forEach((image) => {
          formDataToSend.append('images', image);
        })
    }

    try {
        const response = await axios.post('/ekskul', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${tokenInfo.token}`
          },
        });
  
        if (response.data.success) {
          setSuccessMessage("Data berhasil disubmit!");
          navigate('/ekskul');
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
        setImages(null);
        setErrorMessage("");
        setSuccessMessage("");
    };

    const handleCancel = () => {
    };
  
    const handleFileChange = (event) => {
      if(event.target.files){
        setImages(event.target.files);
      }
    };

    return (
        <div className="flex flex-col bg-white mx-10 my-10 shadow-2xl rounded-lg">
          <div className="ml-10">
            <h1 className="text-2xl font-bold my-10 ml-2.5">Add Ekskul</h1>
            <div>
              <Box
                component="form"
                onSubmit={handleSubmit}
                onReset={handleReset}
                sx={{
                  "& .MuiTextField-root": { m:1, width: "50%" },
                }}
                noValidate
                autoComplete="off"
              >
                <EkskulForm />
                <div className="flex flex-col ml-2 mb-10">
                  <label htmlFor="file-upload" className="">
                    Pas Foto
                  </label>
                  <input
                    id="file-upload"
                    type='file'
                    multiple
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <Button
                    variant="outlined"
                    component="label"
                    htmlFor="file-upload"
                    sx={{ mt: 1, width: "20%" }}
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
      )
  }

