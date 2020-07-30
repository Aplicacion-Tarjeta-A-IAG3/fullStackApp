import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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
  const cliente = [
    "Administrar tus tarjetas",
    "Consultar tu resumen del mes",
    "Descargar tus resúmenes",
  ];
  const comercio = [
    "Administrar las transacciones de tu comercio",
    "Ver tu resumen de ventas",
    "Utilizar el postnet virtual para registrar tus ventas",
  ];

  return (
    <Card>
      <Title title={`Bienvenido ${title[permissions]}`} />
      <CardContent
        style={{
          background: `url(${Background}) no-repeat center center fixed`,
          backgroundSize: "cover",
          minHeight: "500px",
          textAlign: "center",
        }}
      >
        {permissions === "comercio" && <BusinessDashboard />}
        {permissions === "cliente" && <ClientsDashboard />}
        {permissions !== "comercio" && permissions !== "cliente" && (
          <div
            style={{
              color: "#fff",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              padding: "1em",
            }}
          >
            <h2>Disculpe las molestias</h2>
            <p>Seguimos trabajando para mejorar la web.</p>
            <p>Desde el menú podrás:</p>
            {permissions === "admin" && (
              <ul style={{ listStyle: "none" }}>
                {admin.map((i) => (
                  <li key={`perm-${i}`}>{i}</li>
                ))}
              </ul>
            )}
            {permissions === "cliente" && (
              <ul style={{ listStyle: "none" }}>
                {cliente.map((i) => (
                  <li key={`perm-${i}`}>{i}</li>
                ))}
              </ul>
            )}
            {permissions === "comercio" && (
              <ul style={{ listStyle: "none" }}>
                {comercio.map((i) => (
                  <li key={`perm-${i}`}>{i}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
