import React, { useEffect } from "react";

import useCommon from "../hooks/useCommon";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const { setProfile } = useCommon();

  useEffect(() => {
    localStorage.removeItem("token");
    setProfile("");
    navigate("/login");
  }, []);
  return <></>;
};

export default Logout;
