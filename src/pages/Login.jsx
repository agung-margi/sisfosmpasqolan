import React from "react";
import FormLoginFragment from "../fragments/Login";
import AuthLayout from "../layouts/AuthLayout";

const LoginPage = () => {
  return (
    <AuthLayout title="Login" type="login">
      <FormLoginFragment />
    </AuthLayout>
  );
};

export default LoginPage;
