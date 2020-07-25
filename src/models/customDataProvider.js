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

export default {
  getList: (resource, params) => {
    // const { page, perPage } = params.pagination;
    // const { field, order } = params.sort;
    let url = `${apiUrl}/${resource}`;

    //workaround to manage list of transactions
    if (resource === "transacciones") {
      const query =
        permissions === "comercio" ? `?cuit=${currentUsername}` : "";
      url = `${apiUrl}/resumenes${query}`;
    }
    //workaround to manage list of client cards
    if (resource === "tarjetas") {
      const query = permissions === "cliente" ? `?dni=${currentUsername}` : "";
      url = `${apiUrl}/tarjetas${query}`;
    }
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
        total: result.length,
      }))
      .catch((e) => ({
        error: e.message,
      }));
  },

  getOne: (resource, params) => {
    const options = {
      method: "GET",
      headers: headers,
    };

    const url = `${apiUrl}/${resource}?id=${params.id}`;

    return fetch(url, options).then(({ json }) => ({
      data: json,
    }));
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
        return response.json();
      })
      .then((result) => ({ data: result }));
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
        return response.json();
      })
      .then((result) => ({
        data: { ...params.data, id: result.id },
      }))
      .catch((e) => ({
        error: e.message,
      }));
  },

  delete: (resource, params) => {
    const options = {
      method: "DELETE",
      headers: headers,
    };
    const url = `${apiUrl}/${resource}/${params.id}`;
    return fetch(url, options).then(({ json }) => ({ data: json }));
  },

  // getMany: (resource, params) => {
  //   const query = {
  //     filter: JSON.stringify({ id: params.ids }),
  //   };
  //   const url = `${apiUrl}/${resource}?${stringify(query)}`;
  //   return httpClient(url).then(({ json }) => ({ data: json }));
  // },
};
