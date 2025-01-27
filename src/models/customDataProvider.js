// import { fetchUtils } from "react-admin";
// import { stringify } from "query-string";

const apiUrl = "https://african-express.us-e2.cloudhub.io/api/core";
// const httpClient = fetchUtils.fetchJson;

const headers = {
  "Content-Type": "application/json",
  client_id: localStorage.getItem("clientId"),
  client_secret: localStorage.getItem("clientSecret"),
};

const currentUsername = localStorage.getItem("username");
const permissions = localStorage.getItem("permissions");
const getListExceptions = ["resumenes", "transacciones", "tarjetas"];
let query = "";
if (permissions === "comercio") query = `?cuit=${currentUsername}`;
if (permissions === "cliente") query = `?dni=${currentUsername}`;

export default {
  getList: (resource, params) => {
    // const { page, perPage } = params.pagination;
    // const { field, order } = params.sort;
    let url = `${apiUrl}/${resource}`;

    //workaround to manage list of transactions
    if (getListExceptions.includes(resource)) {
      url += `${query}`;
    }
    console.log("solicitud a: ", url);
    const options = {
      method: "GET",
      headers: headers,
    };

    return fetch(url, options)
      .then((response) => {
        try {
          let json = response.json();
          // console.log("JSON??", json);
          if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(json);
          } else {
            // console.log("llega?", json);
            return json.then(Promise.reject.bind(Promise));
          }
        } catch (err) {
          console.error(err);
          return Promise.reject("serverResponseError");
        }
      })
      .then((result) => ({
        data: result,
        total: result.length,
      }))
      .catch((e) => {
        throw e.message;
      });
  },

  getOne: (resource, params) => {
    const options = {
      method: "GET",
      headers: headers,
    };

    const url = `${apiUrl}/${resource}?id=${params.id}`;

    return fetch(url, options)
      .then((response) => {
        try {
          let json = response.json();
          // console.log("JSON??", json);
          if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(json);
          } else {
            // console.log("llega?", json);
            return json.then(Promise.reject.bind(Promise));
          }
        } catch (err) {
          console.error(err);
          return Promise.reject("serverResponseError");
        }
      })
      .then((result) => {
        return {
          data: result,
        };
      })
      .catch((e) => {
        throw e.message;
      });
  },

  update: (resource, params) => {
    const options = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(params.data),
    };
    const url = `${apiUrl}/${resource}`;
    return fetch(url, options)
      .then((response) => {
        try {
          let json = response.json();
          // console.log("JSON??", json);
          if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(json);
          } else {
            // console.log("llega?", json);
            return json.then(Promise.reject.bind(Promise));
          }
        } catch (err) {
          console.error(err);
          return Promise.reject("serverResponseError");
        }
      })
      .then((result) => ({
        data: result,
      }))
      .catch((e) => {
        throw e.message;
      });
  },

  create: (resource, params) => {
    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(params.data),
    };
    const url = `${apiUrl}/${resource}`;
    return fetch(url, options)
      .then((response) => {
        try {
          let json = response.json();
          // console.log("JSON??", json);
          if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(json);
          } else {
            // console.log("llega?", json);
            return json.then(Promise.reject.bind(Promise));
          }
        } catch (err) {
          console.error(err);
          return Promise.reject("serverResponseError");
        }
      })
      .then((result) => {
        if (resource === "resumenes") {
          const resulMap = result.map((r) => ({
            ...params.data,
            id: r.id,
          }));

          return {
            data: resulMap,
          };
        }
        return {
          data: { ...params.data, id: result.id },
        };
      })
      .catch((e) => {
        throw e.message;
      });
  },

  // delete: (resource, params) => {
  //   const options = {
  //     method: "DELETE",
  //     headers: headers,
  //   };
  //   const url = `${apiUrl}/${resource}/${params.id}`;
  //   return fetch(url, options).then(({ json }) => ({ data: json }));
  // },

  // getMany: (resource, params) => {
  //   const query = {
  //     filter: JSON.stringify({ id: params.ids }),
  //   };
  //   const url = `${apiUrl}/${resource}?${stringify(query)}`;
  //   return httpClient(url).then(({ json }) => ({ data: json }));
  // },
};
