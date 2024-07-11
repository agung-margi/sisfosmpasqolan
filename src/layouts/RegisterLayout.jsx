import React from "react";
import RegisterFragments from "../fragments/RegisterFragments";
import { TokenProvider } from "../components/data/AuthTokenContext"
const RegisterLayout = () => {
  return (
    <TokenProvider>
      <div className="flex justify-center items-center h-screen">
        <RegisterFragments />
      </div>
    </TokenProvider>
  );
};

export default RegisterLayout;
