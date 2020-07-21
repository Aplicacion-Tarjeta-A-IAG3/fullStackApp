/*
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
*/

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
  useRedirect,
  useNotify,
} from "react-admin";

const apiUrl = "https://african-express.us-e2.cloudhub.io/api/core";

const headers = {
  "Content-Type": "application/json",
  client_id: localStorage.getItem("clientId"),
  client_secret: localStorage.getItem("clientSecret"),
};

const ShowStatements = (props) => {
  // console.log("props", props);
  const userId = props.match.params.id;
  const [currentUser, setCurrentUser] = useState(null);
  // const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [statementsLoaded, setStatementsLoaded] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);
  const [statements, setStatements] = useState([]);
  //const [product, setProduct] = useState(null);
  //const [limite, setLimite] = useState(0);
  const notify = useNotify();
  const redirectTo = useRedirect();
  // const handleError = (msg) => {
  //   setIsLoaded(true);
  //   setError(msg);
  // };
  /*
  const handleSelectChange = (event) => {
    setProduct(event.target.value);
  };

  const handleLimite = (event) => {
    setLimite(event.target.value);
  };
*/
  const handleShowStatement = async () => {
    const data = {
      activo: true,
      adicional: false,
      dni: currentUser[0].dni,
    };

    const headers = {
      "Content-Type": "application/json",
      client_id: localStorage.getItem("clientId"),
      client_secret: localStorage.getItem("clientSecret"),
    };

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };

    const response = await fetch(`${apiUrl}/resumenes`, options);
    const assigned = await response.json();
    // console.log("data", assigned);
    redirectTo("/tarjetas");
    notify("Volviendo...");
  };

  useEffect(() => {
    const getUserData = async () => {
      const options = {
        method: "GET",
        headers: headers,
      };

      const response = await fetch(
        `${apiUrl}/resumenes?dni=${data.dni}`,
        options
      );
      const data = await response.json();
      // console.log("user data", data);
      setCurrentUser(data);
      setUserLoaded(true);
    };

    const getStatements = async () => {
      const options = {
        method: "GET",
        headers: headers,
      };

      const response = await fetch(`${apiUrl}/resumenes`, options);
      const data = await response.json();
      setStatements(data);
      setStatementsLoaded(true);
    };

    getUserData();
    getStatements();
  }, []);

  return (
    <div>
      <Title title="Ver Resumen" />
      {statementsLoaded && userLoaded && (
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
