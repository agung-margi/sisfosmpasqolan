import React, { useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

// Define createData function locally
function createData(NIP, fullname, jabatan, alamat, status) {
  return { NIP, fullname, jabatan, alamat, status };
}

// Sample data using createData
const rows = [
  createData("123456", "John Doe", "Manager", "123 Main St, New York", "active"),
  createData("234567", "Jane Smith", "Developer", "456 Elm St, San Francisco", "active"),
  createData("345678", "Michael Johnson", "Analyst", "789 Oak St, Chicago", "inactive"),
  // Add more data as needed
];

function DashboardLayout() {
  const [teacherCount, setTeacherCount] = useState(rows.length);

  return (
    <Box mt={3} mx={2}>
      <div className="grid grid-cols-5 gap-4">
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Dashboard
            </Typography>
            <Typography variant="body1" gutterBottom>
              Number of Teachers: {teacherCount}
            </Typography>
            {/* Render other dashboard components */}
          </CardContent>
        </Card>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Dashboard
            </Typography>
            <Typography variant="body1" gutterBottom>
              Number of Teachers: {teacherCount}
            </Typography>
            {/* Render other dashboard components */}
          </CardContent>
        </Card>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Dashboard
            </Typography>
            <Typography variant="body1" gutterBottom>
              Number of Teachers: {teacherCount}
            </Typography>
            {/* Render other dashboard components */}
          </CardContent>
        </Card>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Dashboard
            </Typography>
            <Typography variant="body1" gutterBottom>
              Number of Teachers: {teacherCount}
            </Typography>
            {/* Render other dashboard components */}
          </CardContent>
        </Card>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Dashboard
            </Typography>
            <Typography variant="body1" gutterBottom>
              Number of Teachers: {teacherCount}
            </Typography>
            {/* Render other dashboard components */}
          </CardContent>
        </Card>
      </div>
    </Box>
  );
}

export default DashboardLayout;
