import axios from "./Axios";

const LOGIN_URL = "/auth/login";
const REGISTER_URL = "/auth/signup";

class AuthClient {
  static async login(email, password) {
    return await axios.post(LOGIN_URL, JSON.stringify({ email, password }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  static async register(email, password, firstName, lastName) {
    return await axios.post(
      REGISTER_URL,
      JSON.stringify({ email, password, firstName, lastName }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export default AuthClient;
