import * as React from "react";
import { Admin, Resource } from "react-admin";
import { createBrowserHistory as createHistory } from "history";
import customRoutes from "./utils/customRoutes";
// Authentication and Authorization
import authProvider from "./models/authProvider";
// API connection
// import jsonServerProvider from "ra-data-json-server";
// import { myFakeDataProvider } from "./models/fakeDataProvider"; //TODO: comment when the actual Backed API is connected
import dataProvider from "./models/customDataProvider";
// Translations
import polyglotI18nProvider from "ra-i18n-polyglot";
import spanishMessages from "@blackbox-vision/ra-language-spanish";
import resourcesMessages from "./models/resourcesMessages";
// Theme&UI
import theme from "./utils/theme";
import PersonIcon from "@material-ui/icons/Person";
import BusinessIcon from "@material-ui/icons/Business";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import CardTravelIcon from "@material-ui/icons/CardTravel";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import LoginPage from "./components/login";
// Resources Components (CRUD)
//import { UserList, UserEdit, UserCreate } from "./components/users"; // TODO: remove this when api is done
import { ClientList, ClientEdit, ClientCreate } from "./components/clients";
import {
  BusinessList,
  BusinessEdit,
  BusinessCreate,
} from "./components/businesses";
import { ProductList, ProductCreate, ProductEdit } from "./components/products";
import { CardList } from "./components/cards"; //Componente de tarjetas
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

//to remove # from URL
const history = createHistory();

const App = () => (
  <Admin
    history={history}
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
      permissions === "admin" ? (
        <Resource
          name="productos"
          list={ProductList}
          edit={ProductEdit}
          create={ProductCreate}
          icon={CardTravelIcon}
        />
      ) : null,
      permissions === "cliente" ? (
        <Resource
          name="tarjetas"
          list={CardList}
          // edit={BusinessEdit}
          // create={BusinessCreate}
          icon={CreditCardIcon}
        />
      ) : null,
      permissions === "comercio" ? (
        <Resource
          name="transacciones"
          list={TransactionList}
          create={TransactionCreate}
          icon={AttachMoneyIcon}
        />
      ) : null,
    ]}
  </Admin>
);
export default App;
