import React from "react";
import ReactDOM from "react-dom/client";
import ErrorPage from "./pages/404.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import RegisterAccountPage from "./pages/RegisterAccount.jsx";
import ResetPasswordPage from "./pages/ResetPassword.jsx";
import Profile from "./pages/Profile.jsx";
import "./index.css";
import HomePage from "./pages/HomePage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DashboardPage from "./pages/admin/Dashboard.jsx";
import RegisterFragments from "./fragments/RegisterFragments.jsx";
import DashboardFragment from "./fragments/DashboardFragment.jsx";
import TeacherPage from "./pages/admin/teacher/Teacher.jsx";
import PPDBPage from "./pages/admin/ppdb/PPDB.jsx";
import EditPPDBPage from "./pages/admin/ppdb/EditPPDB.jsx";
import UserPage from "./pages/admin/user/User.jsx";
import AddTeacherPage from "./pages/admin/teacher/AddTeacher.jsx";
import EditTeacherPage from "./pages/admin/teacher/EditTeacher.jsx";
import EkskulPage from "./pages/admin/ekskul/Ekskul.jsx";
import AddEkskulPage from "./pages/admin/ekskul/AddEkskul.jsx";
import HomePageFix from "./pages/HomePage.jsx";
import Ekstrakulikuler from "./pages/Ekstrakulikuler.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/pendaftaran",
    element: <RegisterAccountPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/daftarsekolah",
    element: <RegisterPage />,
  },
  {
    path: "/dashboardPage",
    element: <DashboardPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/editppdb/:id",
    element: <EditPPDBPage />,
  },
  {
    path: "/register-progress",
    element: <DashboardFragment />,
  },
  {
    path: "/teacher",
    element: <TeacherPage />,
  },
  {
    path: "/teacher/add",
    element: <AddTeacherPage />,
  },
  {
    path: "/teacher/edit/:id",
    element: <EditTeacherPage />,
  },
  {
    path: "/ppdb",
    element: <PPDBPage />,
  },
  {
    path: "/user/",
    element: <UserPage />,
  },
  {
    path: "/ekskul",
    element: <EkskulPage />,
  },
  {
    path: "/ekskul/add",
    element: <AddEkskulPage />,
  },
  {
    path: "/ekstrakulikuler",
    element: <Ekstrakulikuler />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>
);
