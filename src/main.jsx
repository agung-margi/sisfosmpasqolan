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
import EditPPDB from "./pages/admin/EditPPDB.jsx";

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
    element: <EditPPDB />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
