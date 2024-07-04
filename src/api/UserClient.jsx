import axios from "./Axios";

const ADMIN = "/admin";
const ADMIN_USER_URL = `${ADMIN}/user`;

class UserClient {
  static async getAllUsers(search) {
    return await axios.get(`${ADMIN_USER_URL}s?search=${search || ""}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  static async getUser(userId) {
    return await axios.get(`${ADMIN_USER_URL}/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  static async deleteUser(userId) {
    return await axios.delete(`${ADMIN_USER_URL}/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  static async updateUser(userId, userRequest) {
    return await axios.put(
      `${ADMIN_USER_URL}/${userId}`,
      JSON.stringify(userRequest),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }
}

export default UserClient;
