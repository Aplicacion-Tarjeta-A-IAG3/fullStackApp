import * as React from "react";
import { Admin, Resource } from "react-admin";
import { UserList, UserEdit, UserCreate } from "./components/users";
import jsonServerProvider from "ra-data-json-server"; //TODO: change this for the actual Backend API
import authProvider from "./authProvider"; // TODO: change for the actual authentication handler
import polyglotI18nProvider from "ra-i18n-polyglot";
import spanishMessages from "@blackbox-vision/ra-language-spanish";
import theme from "./utils/theme";
import PersonIcon from "@material-ui/icons/Person";
import BusinessIcon from "@material-ui/icons/Business";
import LoginPage from "./components/login";

const i18nProvider = polyglotI18nProvider(() => spanishMessages, "es");

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");
const App = () => (
  <Admin
    loginPage={LoginPage}
    dataProvider={dataProvider}
    authProvider={authProvider}
    i18nProvider={i18nProvider}
    theme={theme}
  >
    <Resource
      name="users"
      list={UserList}
      edit={UserEdit}
      create={UserCreate}
      icon={PersonIcon}
    />
    <Resource name="businesses" icon={BusinessIcon} />
  </Admin>
);

export default App;
