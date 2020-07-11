const authProvider = {
  login: ({ username, password }) => {
    const apiUrl = "http://african-express.br-s1.cloudhub.io/api/login";
    const userData = { username, password };
    const requestData = {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    };
    console.log(`requesting from ${apiUrl} with:`, requestData);
    return fetch(apiUrl, requestData)
      .then((response) => {
        console.log("1- raw response: ", response);
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("2- data response: ", data);
        if (data.status === "OK") {
          localStorage.setItem("clientId", data.client_id);
          localStorage.setItem("clientSecret", data.client_secret);
          localStorage.setItem("permissions", data.rol);
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      });
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
