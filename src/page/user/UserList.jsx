import { useEffect, useState } from "react";
import UserClient from "../../api/UserClient";
import { NavLink, useNavigate } from "react-router-dom";

const UserList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getUserList = async (search) => {
    setLoading(true);
    try {
      const response = await UserClient.getAllUsers(search);
      setData((await response?.data?.data) || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  const deleteUser = async (userId) => {
    setLoading(true);
    try {
      await UserClient.deleteUser(userId);
      getUserList();
      setLoading(false);
    } catch (err) {
      if (!err?.response) {
        alert.apply("No Server Response");
      } else if (err?.response?.data?.message) {
        alert.apply(err?.response?.data?.message);
      } else {
        alert.apply("Delete user Fail");
      }
      setLoading(false);
    }
  };

  return (
    <div class="container">
      <div class="row mt-5 mb-2">
        <div class="col-md-6">
          <div class="h3">User Management</div>
        </div>
        <div class="col-md-6 d-flex flex-row justify-content-end p-1 ">
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => {
              navigate("/user");
            }}
          >
            Add User
          </button>
        </div>
      </div>
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">UserID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Create Date</th>
            <th scope="col">Update Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {!!data?.length ? (
            <>
              {data.map((res, index) => {
                return (
                  <tr key={`row${index}`}>
                    <th scope="row" onClick={() => navigate(`/user/${res.id}`)}>
                      {res.id}
                    </th>
                    <td>{res.firstName}</td>
                    <td>{res.lastName}</td>
                    <td>{res.email}</td>
                    <td>{res.role}</td>
                    <td>{res.createdAt}</td>
                    <td>{res.updatedAt}</td>
                    <td>
                      <div class="d-flex flex-row mb-3">
                        <div>
                          <button
                            type="button"
                            class="btn"
                            onClick={() => navigate(`/user/edit/${res.id}`)}
                            disabled={loading}
                          >
                            <i class="material-icons text-warning">edit</i>
                          </button>
                        </div>
                        <div>
                          <button
                            type="button"
                            class="btn"
                            onClick={() => {
                              deleteUser(res.id);
                            }}
                            disabled={loading}
                          >
                            <i class="material-icons text-danger">delete</i>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <tr>
              <td colspan="8">
                <div class="d-flex align-items-center justify-content-center vh-50">
                  <div class="text-center row d-flex flex-row justify-content-center">
                    <div class="col-md-12 mt-2">
                      <p class="fs-3">No Data Found</p>
                      <p class="lead">
                        You can add user{" "}
                        <NavLink to="/user" class="alert-link">
                          here
                        </NavLink>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
