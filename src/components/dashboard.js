import * as React from "react";
import { Title } from "react-admin";
// import Background from "../utils/still-working.jpg";
import Background from "../utils/cards.jpg";
import BusinessDashboard from "./bussinessDashboard";
import ClientsDashboard from "./clientsDashboard";

export default ({ permissions }) => {
  const title = {
    admin: "Administrador",
    cliente: "Cliente",
    comercio: "Comercio",
  };

  const admin = [
    "Administar los clientes",
    "Administrar los comercios",
    "Administrar los productos",
  ];

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
      {permissions === "admin" && (
        <div
          style={{
            color: "#fff",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "1em",
          }}
        >
          <h5>Seguimos trabajando para mejorar la web.</h5>
          <h6>Desde el menú podrás:</h6>
          {permissions === "admin" && (
            <ul style={{ listStyle: "none" }}>
              {admin.map((i) => (
                <li key={`perm-${i}`}>{i}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
