const apiUrl = "https://african-express.us-e2.cloudhub.io/api/core";

const headers = {
  "Content-Type": "application/json",
  client_id: localStorage.getItem("clientId"),
  client_secret: localStorage.getItem("clientSecret"),
};

const currentUsername = localStorage.getItem("username");

export default {
  getBalanceOfTheDay: () => {
    let url = `${apiUrl}/resumenes?cuit=${currentUsername}`;

    console.log("url to get list", url);
    const options = {
      method: "GET",
      headers: headers,
    };

    return fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((result) => ({
        data: result,
        total: result.pagos.length,
      }))
      .catch((e) => ({
        error: e.message,
      }));
  },
  getBalancePerDay: (date) => {
    let url = `${apiUrl}/resumenes?cuit=${currentUsername}?fecha=${date}`;

    console.log("url to get list", url);
    const options = {
      method: "GET",
      headers: headers,
    };

    return fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((result) => ({
        data: result,
        total: result.pagos.length,
      }))
      .catch((e) => ({
        error: e.message,
      }));
  },
};
