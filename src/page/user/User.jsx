import { useEffect, useState } from "react";
import UserClient from "../../api/UserClient";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const User = ({ page }) => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(page);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const isViewMode = mode !== "edit";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  const getUserDetail = async (userId) => {
    setLoading(true);
    try {
      const response = await UserClient.getUser(userId);
      setData((await response?.data?.data) || {});
      setLoading(false);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err?.response?.data?.message) {
        setErrMsg(err?.response?.data?.message);
      } else {
        setErrMsg("Get User Failed");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(page);
    if (data?.id !== id) {
      getUserDetail(id);
    }
  }, []);

  useEffect(() => {
    if (data) {
      setFormData({
        firstName: data?.firstName || "",
        lastName: data?.lastName || "",
        email: data?.email || "",
        role: data?.role || "",
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await UserClient.updateUser(id, formData);
      if (response?.data?.data) {
        setSuccess(true);
        setMode("view");
      } else {
        setErrMsg("Update Failed");
      }
      setLoading(false);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err?.response?.data?.message) {
        setErrMsg(err?.response?.data?.message);
      } else {
        setErrMsg("Update Failed");
      }
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    setLoading(true);
    try {
      await UserClient.deleteUser(id);
      setLoading(false);
      navigate("/users");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err?.response?.data?.message) {
        setErrMsg(err?.response?.data?.message);
      } else {
        setErrMsg("Update Failed");
      }
      setLoading(false);
    }
  };

  const Loading = () => {
    return (
      <>
        <div className="col-md-4">
          <Skeleton height={350} />
        </div>
        <div className="col-md-8">
          <Skeleton height={350} />
        </div>
      </>
    );
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
                  {isViewMode ? <a>View</a> : <a>Edit</a>}
                </li>
              </ol>
            </nav>
          </div>
          <div class="col-xl-6">
            {isViewMode ? (
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => {
                  setMode("edit");
                }}
              >
                Edit
              </button>
            ) : (
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => {
                  setMode("view");
                }}
              >
                View
              </button>
            )}

            <button type="button" class="btn btn-danger" onClick={deleteUser}>
              Delete
            </button>
          </div>
        </div>
        <div class="row">
          {loading ? (
            <>{Loading()}</>
          ) : (
            <>
              <div class="col-xl-4">
                <div class="card mb-4 mb-xl-0">
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
                <div class="card mb-4">
                  <div class="card-header">Account Details</div>
                  <div class="card-body">
                    {errMsg && (
                      <div class="alert alert-danger" role="alert">
                        {errMsg}
                      </div>
                    )}
                    {success && (
                      <div class="alert alert-success" role="alert">
                        Update Success.
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
                            disabled={isViewMode}
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
                            disabled={isViewMode}
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
                            disabled={isViewMode}
                          />
                        </div>
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
                              disabled={isViewMode}
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
                      {!isViewMode && (
                        <button class="btn btn-primary" type="submit">
                          Save changes
                        </button>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
