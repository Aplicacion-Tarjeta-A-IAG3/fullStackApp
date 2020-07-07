import * as React from "react";
import { Admin, Resource } from "react-admin";
import { UserList, UserEdit, UserCreate } from "./components/users";
import jsonServerProvider from "ra-data-json-server"; //TODO: change this for the actual Backend API
import authProvider from "./authProvider"; // TODO: change for the actual authentication handler
import polyglotI18nProvider from "ra-i18n-polyglot";
import spanishMessages from "@blackbox-vision/ra-language-spanish";
const i18nProvider = polyglotI18nProvider(() => spanishMessages, "es");

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");
const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    i18nProvider={i18nProvider}
  >
    <Resource
      name="users"
      list={UserList}
      edit={UserEdit}
      create={UserCreate}
    />
  </Admin>
);

export default App;
