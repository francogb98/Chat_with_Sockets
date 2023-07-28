import React from "react";
import { Route, Routes } from "react-router-dom";

function PublicRoute({ isAuthenticated, component: Component, ...rest }) {
  return (
    <Routes>
      <Route
        {...rest}
        element={(props) =>
          !isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    </Routes>
  );
}

export default PublicRoute;
