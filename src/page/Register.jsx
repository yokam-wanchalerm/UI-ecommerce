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
      const response = await AuthClient.register(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName
      );

      console.log(JSON.stringify(response?.data));
      setSuccess(true);
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
      <section>
        <p
          className={errMsg ? "error-message" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <div className="auth-container">
          {!success ? (
            <>
              <h2>Registration</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>First Name:</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit">Register</button>
              </form>
              <p>
                Already registered?
                <br />
                <button type="button" onClick={() => navigate("/login")}>
                  Sign In
                </button>
              </p>
            </>
          ) : (
            <>
              <h1>Success!</h1>
              <p>
                <button type="button" onClick={() => navigate("/login")}>
                  Sign In
                </button>
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Register;
