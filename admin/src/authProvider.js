const ApiUrl = "https://something.com"; //TODO: update API url

const authProvider = {
  login: ({ role, username, password }) => {
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
    localStorage.setItem("token", `${username}:${password}`);
    return true;
  },
  logout: () => {
    localStorage.removeItem("token");
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem("token") ? Promise.resolve() : Promise.reject(),
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getPermissions: (params) => Promise.resolve(),
};

export default authProvider;
