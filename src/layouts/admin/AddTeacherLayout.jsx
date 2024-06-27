import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { GrPowerReset } from "react-icons/gr";
import { MdOutlineCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { Link } from "react-router-dom";
import TeacherForm from "../../components/molecules/TeacherForm";

function AddTeacherLayout() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleReset = () => {};
  const handleCancel = () => {};

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
              <input id="file-upload" type="file" style={{ display: "none" }} />
              <Button variant="outlined" component="label" htmlFor="file-upload" sx={{ mt: 1, width: "10%" }}>
                Choose File
              </Button>
            </div>
            <div className="flex mt-8 justify-end mr-16 mb-10 ">
              <Button type="submit" variant="contained" color="success" sx={{ mr: 2 }} size="large">
                <FaSave className="mr-2" />
                Submit
              </Button>
              <Button type="reset" variant="contained" color="secondary" sx={{ mr: 2 }}>
                <GrPowerReset className="mr-2" />
                Reset
              </Button>
              <Link to="/teacher">
                <Button variant="contained" onClick={handleCancel} color="error" sx={{ mr: 1 }} size="large">
                  <MdOutlineCancel className="mr-2" />
                  Cancel
                </Button>
              </Link>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default AddTeacherLayout;
