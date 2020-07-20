import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Title } from "react-admin";
export default ({ permissions }) => {
  const title = {
    admin: "Administrador",
    persona: "Administrador",
    comercio: "Administrador",
  };

  const description = {
    admin:
      "Como administrador podrás administar a los clientes y los comercios",
    persona: "Como cliente podrás consultar tus resumenes de tarjetas",
    comercio: "Como comercio podrás manejar las transacciones",
  };
  return (
    <Card>
      <Title title={`Bienvenido ${title[permissions]}`} />
      <CardContent>{description[permissions]}</CardContent>
    </Card>
  );
};
