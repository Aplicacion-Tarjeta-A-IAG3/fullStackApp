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
  const cardId = props.match.params.id;
  const [currentCard, setCurrentCard] = useState(null);
  // const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [statementsLoaded, setStatementsLoaded] = useState(false);
  const [cardLoaded, setCardLoaded] = useState(false);
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
      dni: currentCard[0].dni,
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
    const getCardData = async () => {
      const options = {
        method: "GET",
        headers: headers,
      };

      const response = await fetch(`${apiUrl}/tarjetas?id=${cardId}`, options);
      const data = await response.json();
      // console.log("user data", data);
      setCurrentCard(data);
      setCardLoaded(true);
    };

    const getStatements = async () => {
      const options = {
        method: "GET",
        headers: headers,
      };

      const response = await fetch(`${apiUrl}/resumenes?tarjeta=`, options);
      const data = await response.json();
      setStatements(data);
      setStatementsLoaded(true);
    };

    getCardData();
    getStatements();
  }, []);

  return (
    <div>
      <Title title="Ver Resumen" />
      {statementsLoaded && cardLoaded && (
        <Card>
          <CardHeader title="Resumen de Cuenta" />
          <CardContent style={{ display: "flex" }}>
            <div style={{ width: "30%" }}>
              <b>Nombre </b>
              {`${currentCard[0].nombre} ${currentCard[0].apellido}`}
            </div>
            <div style={{ width: "30%" }}>
              <b>DNI </b>
              {currentCard[0].dni}
            </div>
            <div style={{ width: "30%" }}>
              <b>Producto </b>
              {currentCard[0].producto}
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
