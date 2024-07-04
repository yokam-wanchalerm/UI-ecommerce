import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useCommon";
import TokenHelper from "../util/TokenHelper";

const RequireAuth = () => {
  useAuth();
  const location = useLocation();
  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };
  const isAdmin = () => {
    return !!(
      TokenHelper.parseJwt(localStorage.getItem("token"))?.role === "ADMIN"
    );
  };

  return isAdmin() ? (
    <Outlet />
  ) : isAuthenticated() ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
