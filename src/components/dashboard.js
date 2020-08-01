import * as React from "react";
import { Title } from "react-admin";
// import Background from "../utils/still-working.jpg";
import Background from "../utils/cards.jpg";
import BusinessDashboard from "./bussinessDashboard";
import ClientsDashboard from "./clientsDashboard";
import AdminDashboard from "./admin/adminDashboard";

export default ({ permissions }) => {
  const title = {
    admin: "Administrador",
    cliente: "Cliente",
    comercio: "Comercio",
  };

  return (
    <div
      style={{
        background: `url(${Background}) no-repeat center center fixed`,
        backgroundSize: "cover",
        minHeight: "500px",
        textAlign: "center",
        margin: "1em",
        padding: "1em",
      }}
    >
      <Title title={`Bienvenido ${title[permissions]}`} />
      {permissions === "comercio" && <BusinessDashboard />}
      {permissions === "cliente" && <ClientsDashboard />}
      {permissions === "admin" && <AdminDashboard />}
    </div>
  );
};
