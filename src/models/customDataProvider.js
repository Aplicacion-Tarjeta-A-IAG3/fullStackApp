import { fetchUtils } from "react-admin";
// import { stringify } from "query-string";

const apiUrl = "https://african-express.us-e2.cloudhub.io/api/core";
// const httpClient = fetchUtils.fetchJson;

const clientId = localStorage.getItem("clientId");
const clientSecret = localStorage.getItem("clientSecret");

const headers = {
  "Content-Type": "application/json",
  client_id: clientId,
  client_secret: clientSecret,
};

export default {
  getList: (resource, params) => {
    // const { page, perPage } = params.pagination;
    // const { field, order } = params.sort;
    // const query = {
    //   sort: JSON.stringify([field, order]),
    //   range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
    //   filter: JSON.stringify(params.filter),
    // };
    // const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const url = `${apiUrl}/${resource}`;

    // return httpClient(url).then(({ headers, json }) => ({
    //   data: json,
    //   total: parseInt(headers.get("content-range").split("/").pop(), 10),
    // }));
    const options = {
      method: "GET",
      headers: headers,
    };

    return fetch(url, options).then((response) => ({
      data: response.json(),
    }));
  },

  getOne: (resource, params) => {
    const options = {
      method: "GET",
      headers: headers,
    };

    const url = `${apiUrl}/${resource}/${params.id}`;

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
    const url = `${apiUrl}/${resource}/${params.id}`;
    return fetch(url, options).then(({ json }) => ({ data: json }));
  },

  create: (resource, params) => {
    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(params.data),
    };
    const url = `${apiUrl}/${resource}`;
    return fetch(url, options).then(({ json }) => ({
      data: { ...params.data, id: json.id },
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
