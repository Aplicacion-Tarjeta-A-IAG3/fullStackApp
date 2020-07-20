import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import {
  Title,
  SimpleForm,
  SelectInput,
  Loading,
  NumberInput,
  TextField,
  RichTextField,
  NumberField,
  useShowController,
  SimpleShowLayout,
} from "react-admin";

const ShowStatements = (props) => {
  console.log("props", props);
  const userId = props.match.params.id;
  const [user, setUser] = React.useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [statement, setStatement] = React.useState(null);

  const [statements, setStatements] = useState([]);

  const handleError = (msg) => {
    setIsLoaded(true);
    setError(msg);
  };

  const handleGetUser = (data) => {
    setIsLoaded(true);
    setUser(data);
  };

  const handleGetStatements = (data) => {
    setIsLoaded(true);
    setStatements(data);
  };

  useEffect(() => {
    // get user
    fetch(
      `http://african-express.us-e2.cloudhub.io/api/core/personas/${userId}`
    )
      .then((response) => response.json())
      .then(
        (result) => {
          console.log("get user", result);
          handleGetUser(result);
        },
        (error) => handleError(error)
      );
    // get statements
    fetch(`http://african-express.us-e2.cloudhub.io/api/core/resumenes`)
      .then((response) => response.json())
      .then(
        (result) => {
          console.log("get tarjeta", result);
          handleGetStatements(result);
        },
        (error) => handleError(error)
      );
  }, [userId]);

  return (
    <div>
      <Title title="Ver Resumen" />
      {isLoaded && (
        <Card>
          <CardHeader title="Resumen de Cuenta" />
          <CardContent style={{ display: "flex" }}>
            <div style={{ width: "30%" }}>
              <b>Nombre </b>
              Juan Perez
            </div>
            <div style={{ width: "30%" }}>
              <b>DNI </b>
              1233242
            </div>
            <div style={{ width: "30%" }}>
              <b>Dirección </b>
              Avenida Santa Fe Nº 234, Piso 1, Dpto A
            </div>
          </CardContent>
          <hr />
          <CardHeader title="Detalle" />
        </Card>
      )}
    </div>
  );
};

export default ShowStatements;
