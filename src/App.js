import * as React from "react";
import { Admin, Resource } from "react-admin";
import customRoutes from "./utils/customRoutes";
// API connection
//import jsonServerProvider from "ra-data-json-server"; //TODO: uncomment when the actual Backend API is connected
import { myFakeDataProvider } from "./models/fakeDataProvider"; //TODO: comment when the actual Backed API is connected
// Authentication and Authorization
import authProvider from "./models/authProvider";
// Translations
import polyglotI18nProvider from "ra-i18n-polyglot";
import spanishMessages from "@blackbox-vision/ra-language-spanish";
import resourcesMessages from "./models/resourcesMessages";
// Theme&UI
import theme from "./utils/theme";
import PersonIcon from "@material-ui/icons/Person";
import BusinessIcon from "@material-ui/icons/Business";
import LoginPage from "./components/login";
// Resources Components (CRUD)
//import { UserList, UserEdit, UserCreate } from "./components/users"; // TODO: remove this when api is done
import { ClientList, ClientEdit, ClientCreate } from "./components/clients";
import {
  BusinessList,
  BusinessEdit,
  BusinessCreate,
} from "./components/businesses";

const messages = {
  es: { ...spanishMessages, ...resourcesMessages },
};
const i18nProvider = polyglotI18nProvider(() => messages["es"]);
//const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com"); //TODO: uncomment when the actual Backend API is connected

const App = () => (
  <Admin
    customRoutes={customRoutes}
    loginPage={LoginPage}
    dataProvider={myFakeDataProvider}
    authProvider={authProvider}
    i18nProvider={i18nProvider}
    theme={theme}
  >
    {(permissions) => [
      permissions === "admin" ? (
        <Resource
          name="clients"
          list={ClientList}
          edit={ClientEdit}
          create={ClientCreate}
          icon={PersonIcon}
        />
      ) : null,
      permissions === "admin" ? (
        <Resource
          name="businesses"
          list={BusinessList}
          edit={BusinessEdit}
          create={BusinessCreate}
          icon={BusinessIcon}
        />
      ) : null,
      permissions === "persona" ? (
        <Resource
          name="businesses"
          list={BusinessList}
          edit={BusinessEdit}
          create={BusinessCreate}
          icon={BusinessIcon}
        />
      ) : null,
      permissions === "comercio" ? (
        <Resource
          name="businesses"
          list={BusinessList}
          edit={BusinessEdit}
          create={BusinessCreate}
          icon={BusinessIcon}
        />
      ) : null,
    ]}
  </Admin>
);

export default App;
