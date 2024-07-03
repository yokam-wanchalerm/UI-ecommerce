import axios from "./Axios";

const USER_URL = "/users?search=";

class UserClient {
  static async getAllUsers(token) {
    try {
      const response = await axios.get(USER_URL, {});
      return response.data;
    } catch (err) {
      throw err;
    }
  }
}

export default UserClient;
