const authProvider = {
  login: ({ username, password }) => {
    // const apiUrl = "http://african-express.br-s1.cloudhub.io/api/login";
    const apiUrl = "http://african-express.us-e2.cloudhub.io/api/login";
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
          console.log("rol??-----1", data.rol);
          const parsedRol = data.rol.slice(1, -1);
          console.log("rol??-----2", parsedRol);
          localStorage.setItem("clientId", data.client_id);
          localStorage.setItem("clientSecret", data.client_secret);
          localStorage.setItem("permissions", data.rol);
          return Promise.resolve();
        }
        return Promise.reject();
      });
  },
  logout: () => {
    localStorage.removeItem("clientId");
    localStorage.removeItem("clientSecret");
    localStorage.removeItem("permissions");
    return Promise.resolve();
  },
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("clientId");
      localStorage.removeItem("clientSecret");
      localStorage.removeItem("permissions");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () => {
    return localStorage.getItem("clientId")
      ? Promise.resolve()
      : Promise.reject();
  },
  getPermissions: () => {
    return localStorage.getItem("permissions")
      ? Promise.resolve(localStorage.getItem("permissions"))
      : Promise.reject();
  },
};

export default authProvider;
