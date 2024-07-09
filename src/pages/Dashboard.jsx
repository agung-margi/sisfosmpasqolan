import React from "react";
import { AuthProvider } from "../components/data/AuthContext"
import DashboardLayout from "../layouts/DashboardLayout";

const Dashboard = () => {
  return (
    <AuthProvider>
      <DashboardLayout />
    </AuthProvider>
  );
};

export default Dashboard;
