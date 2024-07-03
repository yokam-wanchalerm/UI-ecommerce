import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import TokenHelper from "../util/TokenHelper";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const isAuthenticated = TokenHelper.isAuthenticated();
  console.log(auth?.role);

  return isAuthenticated && allowedRoles.includes(auth?.role) ? (
    <Outlet />
  ) : isAuthenticated ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
