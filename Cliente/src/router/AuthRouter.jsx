import React from "react";
import { useLocation } from "react-router-dom";

import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

import "../css/login-register.css";

export const AuthRouter = () => {
  const location = useLocation();
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-t-50 p-b-90">
          {location.pathname === "/auth" ? <LoginPage /> : null}
          {location.pathname === "/auth/register" ? <RegisterPage /> : null}
        </div>
      </div>
    </div>
  );
};
