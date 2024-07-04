import { useEffect, useState } from "react";
import AuthClient from "../../api/AuthClient";
import { NavLink } from "react-router-dom";

const USER_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const UserAdd = () => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "USER",
  });

  useEffect(() => {
    setErrMsg("");
  }, [formData]);

  useEffect(() => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "USER",
    });
  }, [success]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = USER_REGEX.test(formData.email);
    const v2 = PWD_REGEX.test(formData.password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      setLoading(true);
      const response = await AuthClient.register(formData);
      if (response?.data?.data) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      } else {
        setErrMsg("Add User Failed");
      }
      setLoading(false);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err?.response?.data?.message) {
        setErrMsg(err?.response?.data?.message);
      } else {
        setErrMsg("Add User Failed");
      }
      setLoading(false);
    }
  };

  return (
    <div class="container">
      <div class="container-xl px-4 mt-4">
        <div class="row">
          <div class="col-xl-6">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="/users">List</a>
                </li>
                <li class="breadcrumb-item" aria-current="page">
                  <a>Add</a>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-4">
            <div class="card mb-4 mb-xl-0" style={{ height: "100%" }}>
              <div class="card-header">Profile Picture</div>
              <div class="card-body text-center">
                <img
                  class="img-account-profile rounded-circle mb-2"
                  src="http://bootdey.com/img/Content/avatar/avatar1.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="col-xl-8">
            <div class="card mb-4" style={{ height: "100%" }}>
              <div class="card-header">Add Account</div>
              <div class="card-body">
                {errMsg && (
                  <div class="alert alert-danger" role="alert">
                    {errMsg}
                  </div>
                )}
                {success && (
                  <div class="alert alert-success" role="alert">
                    Add User Success{" "}
                    <NavLink to="/users" class="alert-link">
                      Manage User
                    </NavLink>
                    .
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div class="row gx-3 mb-3">
                    <div class="col-md-6">
                      <label class="small mb-1" for="firstName">
                        First name
                      </label>
                      <input
                        class="form-control"
                        id="firstName"
                        type="text"
                        placeholder="Enter your first name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div class="col-md-6">
                      <label class="small mb-1" for="lastName">
                        Last name
                      </label>
                      <input
                        class="form-control"
                        id="lastName"
                        type="text"
                        placeholder="Enter your last name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div class="row gx-3 mb-3">
                    <div class="col-md-6">
                      <label class="small mb-1" for="email">
                        Email
                      </label>
                      <input
                        class="form-control"
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div class="col-md-6">
                      <label class="small mb-1" for="password">
                        Password
                      </label>
                      <input
                        class="form-control"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div class="row gx-3 mb-3">
                    <div class="col-md-6">
                      <label class="small mb-1" for="role">
                        Role
                      </label>
                      <div class="dropdown">
                        <button
                          class="btn btn-secondary dropdown-toggle"
                          type="button"
                          id="role"
                          aria-haspopup="true"
                          aria-expanded="false"
                          data-bs-toggle="dropdown"
                          name="role"
                        >
                          {!!formData?.role ? (
                            <>{formData?.role}</>
                          ) : (
                            <>Not Select</>
                          )}
                        </button>
                        <div
                          class="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <a
                            class="dropdown-item"
                            onClick={() => {
                              setFormData({ ...formData, role: "ADMIN" });
                            }}
                          >
                            ADMIN
                          </a>
                          <a
                            class="dropdown-item"
                            onClick={() => {
                              setFormData({ ...formData, role: "USER" });
                            }}
                          >
                            USER
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    class="align-self-end btn btn-primary"
                    type="submit"
                    disabled={loading}
                  >
                    Submit
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

export default UserAdd;
