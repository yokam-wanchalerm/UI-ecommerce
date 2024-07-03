import React, { useEffect } from "react";

import TokenHelper from "../util/TokenHelper";
import useCommon from "../hooks/useCommon";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const { setProfile } = useCommon();

  useEffect(() => {
    TokenHelper.logout();
    setProfile("");
    navigate("/login");
  }, []);
  return <></>;
};

export default Logout;
