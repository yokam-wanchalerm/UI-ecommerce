export class TokenHelper {
  static parseJwt(token) {
    try {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (err) {
      return;
    }
  }

  static getFullName(accessToken) {
    let fullName = "";
    if (accessToken) {
      var payload = this.parseJwt(accessToken);
      fullName = payload?.firstName + " " + payload?.lastName;
    }
    return fullName.trim();
  }
}

export default TokenHelper;
