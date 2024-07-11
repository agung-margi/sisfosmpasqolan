import React from "react";
import ReactDOM from "react-dom/client";
import ErrorPage from "./pages/404.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import BurgerMenu from "./pages/BurgerMenu.jsx";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
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
    path: "/menu",
    element: <BurgerMenu />,
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
