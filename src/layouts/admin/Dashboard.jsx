import React, { useEffect, useState, useContext } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import axios from "../../axiosConfig";
import { Link } from "react-router-dom";

function DashboardLayout() {
  const [teacherCount, setTeacherCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [ekskulCount, setEkskulCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const teacherResponse = await axios.get("teachers/count");
        setTeacherCount(teacherResponse.data.count);

        const userResponse = await axios.get("users/count");
        setUserCount(userResponse.data.count);

        const studentResponse = await axios.get("students/count");
        setStudentCount(studentResponse.data.count);

        const ekskulResponse = await axios.get("ekskuls/count");
        setEkskulCount(ekskulResponse.data.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <Box mt={3} mx={2} px={2}>
      <div className="grid grid-cols-4 gap-4">
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              <Link to="/ppdb" className="font-semibold hover:text-green-700">
                PPDB
              </Link>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Total Siswa PPDB : {studentCount}
            </Typography>
          </CardContent>
        </Card>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              <Link to="/user" className="font-semibold hover:text-green-700">
                User
              </Link>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Total User : {userCount}
            </Typography>
          </CardContent>
        </Card>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              <Link to="/teacher" className="font-semibold hover:text-green-700">
                Teacher
              </Link>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Total Teacher : {teacherCount}
            </Typography>
          </CardContent>
        </Card>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              <Link to="/ekskul" className="font-semibold hover:text-green-700">
                Ekskul
              </Link>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Total Ekskul : {ekskulCount}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </Box>
  );
}

export default DashboardLayout;
