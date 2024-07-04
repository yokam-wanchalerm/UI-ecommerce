import axios from "./Axios";

const LOGIN_URL = "/auth/login";
const REGISTER_URL = "/auth/signup";

class AuthClient {
  static async login(request) {
    return await axios.post(LOGIN_URL, JSON.stringify(request), {
      headers: { "Content-Type": "application/json" },
    });
  }

  static async register(request) {
    return await axios.post(REGISTER_URL, JSON.stringify(request), {
      headers: { "Content-Type": "application/json" },
    });
  }
}

export default AuthClient;
