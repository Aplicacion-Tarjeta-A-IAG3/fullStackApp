const ApiUrl = "https://something.com"; //TODO: update API url

// const request = new Request(`${ApiUrl}/login`, {
//   method: "POST",
//   body: JSON.stringify({ role, username, password }),
//   headers: new Headers({ "Content-Type": "application/json" }),
// });
// return fetch(request)
//   .then((response) => {
//     if (response.status < 200 || response.status >= 300) {
//       throw new Error(response.statusText);
//     }
//     return response.json();
//   })
//   .then(({ token }) => {
//     localStorage.setItem("token", token);
//   });
const authProvider = {
  // called when the user attempts to log in
  login: ({ username }) => {
    localStorage.setItem("username", username);
    localStorage.setItem("permissions", "admin");
    // accept all username/password combinations
    return Promise.resolve();
  },
  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem("username");
    localStorage.removeItem("permissions");
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("username");
      localStorage.removeItem("permissions");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem("username")
      ? Promise.resolve()
      : Promise.reject();
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => {
    return localStorage.getItem("permissions")
      ? Promise.resolve()
      : Promise.reject();
  },
};

export default authProvider;
