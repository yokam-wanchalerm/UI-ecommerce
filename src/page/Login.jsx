import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import AuthClient from "../api/AuthClient";
import TokenHelper from "../util/TokenHelper";
import useCommon from "../hooks/useCommon";

const Login = () => {
  const { setProfile } = useCommon();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (TokenHelper.isAuthenticated()) {
      navigate("/logout");
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const checkAutenticated = (accessToken) => {
    var payload = TokenHelper.parseJwt(accessToken);
    console.log(payload);
    const fullName = payload?.firstName + " " + payload?.lastName;
    setProfile(fullName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthClient.login(user, pwd);
      const accessToken = response?.data?.accessToken;
      if (accessToken) {
        checkAutenticated(accessToken);
        localStorage.setItem("token", accessToken);
      }
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
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
          <div class="col-md-3"></div>
          <div class="col-md-6">
            <div class="card">
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
                      value={user}
                      placeholder="Email"
                      onChange={(e) => setUser(e.target.value)}
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
                      class="form-control"
                      value={pwd}
                      onChange={(e) => setPwd(e.target.value)}
                      required
                      placeholder="Password"
                    />{" "}
                    <small id="passwordHelp" class="form-text text-muted">
                      your password is saved in encrypted form
                    </small>
                  </div>
                  <button type="submit" class="btn btn-primary mt-50">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div class="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
