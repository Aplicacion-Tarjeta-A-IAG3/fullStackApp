import { fetchUtils } from "react-admin";
// import { stringify } from "query-string";

const apiUrl = "http://african-express.us-e2.cloudhub.io/api/core";
const httpClient = fetchUtils.fetchJson;

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
      headers: { "Content-Type": "application/json" },
    };

    return fetch(url, options).then((response) => ({
      data: response.json(),
    }));
  },

  getOne: (resource, params) => {
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const url = `${apiUrl}/${resource}/${params.id}`;

    return fetch(url, options).then(({ json }) => ({
      data: json,
    }));
  },

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json })),

  create: (resource, params) =>
    fetch(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    })),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => ({ data: json })),

  // getMany: (resource, params) => {
  //   const query = {
  //     filter: JSON.stringify({ id: params.ids }),
  //   };
  //   const url = `${apiUrl}/${resource}?${stringify(query)}`;
  //   return httpClient(url).then(({ json }) => ({ data: json }));
  // },
};
