import React, { useContext, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import { ChatPage } from "../pages/ChatPage";
import { AuthRouter } from "./AuthRouter";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { AuthContext } from "../auth/AuthContext";
import PublicRoute from "./PublicRoute";

export const AppRouter = () => {
  const { auth, verificaToken } = useContext(AuthContext);
  const loaction = useLocation();

  useEffect(() => {
    verificaToken();
  }, [verificaToken]);

  if (auth.checking) {
    return <h1> Espere por favor</h1>;
  }

  return (
    <div>
      {auth.logged && location.pathname === "/auth" && (
        <Navigate to="/" replace={true} />
      )}
      {!auth.logged && location.pathname === "/" && (
        <Navigate to="/auth" replace={true} />
      )}

      <Routes>
        <Route path="/auth" element={<AuthRouter />}>
          <Route exact path="/auth/login" element={<LoginPage />} />
          <Route exact path="/auth/register" element={<RegisterPage />} />
        </Route>

        <Route path="/" element={<ChatPage />} />
      </Routes>
    </div>
  );
};
