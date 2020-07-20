import * as React from "react";
import { Admin, Resource } from "react-admin";
import customRoutes from "./utils/customRoutes";
// Authentication and Authorization
import authProvider from "./models/authProvider";
// API connection
// import jsonServerProvider from "ra-data-json-server";
import { myFakeDataProvider } from "./models/fakeDataProvider"; //TODO: comment when the actual Backed API is connected
import dataProvider from "./models/customDataProvider";
// Translations
import polyglotI18nProvider from "ra-i18n-polyglot";
import spanishMessages from "@blackbox-vision/ra-language-spanish";
import resourcesMessages from "./models/resourcesMessages";
// Theme&UI
import theme from "./utils/theme";
import PersonIcon from "@material-ui/icons/Person";
import BusinessIcon from "@material-ui/icons/Business";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import LoginPage from "./components/login";
// Resources Components (CRUD)
//import { UserList, UserEdit, UserCreate } from "./components/users"; // TODO: remove this when api is done
import { ClientList, ClientEdit, ClientCreate } from "./components/clients";
import {
  BusinessList,
  BusinessEdit,
  BusinessCreate,
} from "./components/businesses";
import { TransactionList, TransactionCreate } from "./components/transactions";
import Dashboard from "./components/dashboard";

const messages = {
  es: { ...spanishMessages, ...resourcesMessages },
};
const i18nProvider = polyglotI18nProvider(() => messages["es"]);
// const dataProvider = jsonServerProvider(
//   "http://african-express.us-e2.cloudhub.io/api/core"
// );
//const dataProvider = dataProvider;

const App = () => (
  <Admin
    dashboard={Dashboard}
    customRoutes={customRoutes}
    loginPage={LoginPage}
    dataProvider={dataProvider}
    authProvider={authProvider}
    i18nProvider={i18nProvider}
    theme={theme}
  >
    {(permissions) => [
      permissions === "admin" ? (
        <Resource
          name="personas"
          list={ClientList}
          edit={ClientEdit}
          create={ClientCreate}
          icon={PersonIcon}
        />
      ) : null,
      permissions === "admin" ? (
        <Resource
          name="comercios"
          list={BusinessList}
          edit={BusinessEdit}
          create={BusinessCreate}
          icon={BusinessIcon}
        />
      ) : null,
      permissions === "persona" ? (
        <Resource
          name="consumosPersona"
          // list={BusinessList}
          // edit={BusinessEdit}
          // create={BusinessCreate}
          // icon={BusinessIcon}
        />
      ) : null,
      permissions === "comercio" ? (
        <Resource
          name="transacciones"
          list={TransactionList}
          // edit={BusinessEdit}
          create={TransactionCreate}
          icon={AccountBalanceWalletIcon}
        />
      ) : null,
    ]}
  </Admin>
);

export default App;
