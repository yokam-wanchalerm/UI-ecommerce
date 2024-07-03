import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useCommon";
import TokenHelper from "../util/TokenHelper";

const RequireAuth = () => {
  // const { auth } = useAuth();
  // const location = useLocation();
  // const isAuthenticated = TokenHelper.isAuthenticated();
  // console.log(auth?.role);
  // return isAuthenticated ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/login" state={{ from: location }} replace />
  // );
};

export default RequireAuth;
