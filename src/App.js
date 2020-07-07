import * as React from "react";
import { Admin, Resource } from "react-admin";
import { UserList, UserEdit, UserCreate } from "./components/users";
import jsonServerProvider from "ra-data-json-server"; //TODO: change this for the actual Backend API
import authProvider from "./authProvider"; // TODO: change for the actual authentication handler

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");
const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource
      name="users"
      list={UserList}
      edit={UserEdit}
      create={UserCreate}
    />
  </Admin>
);

export default App;
