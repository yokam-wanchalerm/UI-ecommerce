import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import AuthClient from "../api/AuthClient";
import TokenHelper from "../util/TokenHelper";
import useCommon from "../hooks/useCommon";
import banner4 from "../assets/banner/banner4.jpg";

const Login = () => {
  const { setProfile } = useCommon();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/logout");
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [formData]);

  const checkAutenticated = (accessToken) => {
    setProfile(TokenHelper.getFullName(accessToken));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthClient.login(formData);
      const accessToken = response?.data?.data?.accessToken;
      if (accessToken) {
        localStorage.setItem("token", accessToken);
        checkAutenticated(accessToken);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "",
        });
        navigate(from, { replace: true });
      } else {
        setErrMsg("Login Failed");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err?.response?.data?.message) {
        setErrMsg(err?.response?.data?.message);
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div class="page-content page-container" id="page-content">
      <div class="padding">
        <div class="row">
          <div class="col-md-6">
            <img src={banner4} className="d-block w-100" alt="banner 1" />
          </div>
          <div class="col-md-6 ">
            <div class="card vertical-center">
              <div class="card-header">
                <strong>Login to your account</strong>
              </div>
              <div class="card-body">
                {errMsg && (
                  <div ref={errRef} class="alert alert-danger" role="alert">
                    {errMsg}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div class="form-group mb-18">
                    <label class="text-muted" for="email">
                      Email address
                    </label>
                    <input
                      ref={userRef}
                      id="email"
                      class="form-control"
                      type="email"
                      name="email"
                      value={formData.email}
                      placeholder="Email"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div class="form-group mb-18">
                    <label class="text-muted" for="password">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      class="form-control"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      placeholder="Password"
                    />
                  </div>
                  <button type="submit" class="btn btn-primary mt-50">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
