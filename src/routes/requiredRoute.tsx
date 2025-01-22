import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { webRoutes } from "./web";

const RequiredRoute = ({ children }) => {
  const isLogin = localStorage.getItem("token");
  if (!isLogin) {
    return <Navigate to={webRoutes.login} replace />;
  }
  return children;
};

export default RequiredRoute;
