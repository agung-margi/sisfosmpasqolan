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
import HomePageFix from "./pages/HomePage.jsx";
import DashboardPage from "./pages/admin/Dashboard.jsx";
import EditPPDB from "./pages/admin/EditPPDB.jsx";
import Ekstrakulikuler from "./pages/Ekstrakulikuler.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageFix />,
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
    path: "/register",
    element: <RegisterAccountPage />,
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
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/editppdb/:id",
    element: <EditPPDB />,
  },
  {
    path: "/ekstrakulikuler",
    element: <Ekstrakulikuler />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
