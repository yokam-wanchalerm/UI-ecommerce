import React, { useRef, useState } from "react";
import AuthClient from "../api/AuthClient";
import { useNavigate } from "react-router-dom";

const USER_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const errRef = useRef();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(formData.email);
    const v2 = PWD_REGEX.test(formData.password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      setLoading(true);
      const response = await AuthClient.register(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName
      );

      console.log(JSON.stringify(response?.data));
      setSuccess(true);
      setLoading(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <div class="page-content page-container" id="page-content">
        <div class="padding">
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              {success ? (
                <div class="card">
                  <div class="card-header">Register Success</div>
                  <div class="card-body">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </button>
                  </div>
                </div>
              ) : (
                <div class="card">
                  <div class="card-header">
                    <strong>Register your account</strong>
                  </div>
                  <div class="card-body">
                    {errMsg && (
                      <div ref={errRef} class="alert alert-danger" role="alert">
                        {errMsg}
                      </div>
                    )}
                    <form onSubmit={handleSubmit}>
                      <div class="form-group mb-18">
                        <label class="text-muted" for="firstName">
                          First Name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter First Name"
                        />
                      </div>
                      <div class="form-group mb-18">
                        <label class="text-muted" for="lastName">
                          Last Name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter Last Name"
                        />
                      </div>
                      <div class="form-group mb-18">
                        <label class="text-muted" for="email">
                          Email
                        </label>
                        <input
                          type="email"
                          class="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter Email"
                        />
                      </div>
                      <div class="form-group mb-18">
                        <label class="text-muted" for="password">
                          Password
                        </label>
                        <input
                          type="password"
                          class="form-control"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter Password"
                        />
                      </div>

                      <button type="submit" class="btn btn-primary">
                        Register
                        {loading && (
                          <div
                            class="spinner-border text-secondary"
                            role="status"
                          >
                            <span class="sr-only">Loading...</span>
                          </div>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
            <div class="col-md-3"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
