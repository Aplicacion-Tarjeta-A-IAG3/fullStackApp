import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import {
  List,
  Datagrid,
  TextField,
  FunctionField,
  NumberField,
  DateField,
  SimpleForm,
  downloadCSV,
  Title,
  useRedirect,
  useNotify,
} from "react-admin";
import jsonExport from "jsonexport/dist";

const apiUrl = "https://african-express.us-e2.cloudhub.io/api/core";

const headers = {
  "Content-Type": "application/json",
  client_id: localStorage.getItem("clientId"),
  client_secret: localStorage.getItem("clientSecret"),
};

const ShowStatements = (props) => {
  console.log("props", props);
  const cardId = props.match.params.id;
  console.log("card id", cardId);
  const cardNumber = props.match.params.tarjeta;
  console.log("card number", cardNumber);
  const [currentCard, setCurrentCard] = useState(null);
  const [statements, setStatements] = useState(null);
  // const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [statementsLoaded, setStatementsLoaded] = useState(false);
  const [cardLoaded, setCardLoaded] = useState(false);

  // const handleError = (msg) => {
  //   setIsLoaded(true);
  //   setError(msg);
  // };

  useEffect(() => {
    const getCardData = async () => {
      const options = {
        method: "GET",
        headers: headers,
      };

      const response = await fetch(`${apiUrl}/tarjetas?id=${cardId}`, options);
      const data = await response.json();
      console.log("user cards data", data);
      setCurrentCard(data);
      setCardLoaded(true);
    };

    const getStatements = async () => {
      const options = {
        method: "GET",
        headers: headers,
      };

      const response = await fetch(
        `${apiUrl}/resumenes?tarjeta=${cardNumber}`,
        options
      );
      const data = await response.json();
      console.log("card statement data", data);
      setStatements(data);
      setStatementsLoaded(true);
    };

    getCardData();
    getStatements();
  }, []);

  return (
    <div>
      <Title title="Ultimo Resumen" />
      {statementsLoaded && cardLoaded && (
        <List exporter={false} {...props}>
          <div>
            <Card>
              <CardHeader title="Resumen de Cuenta" />
              <CardContent style={{ display: "flex" }}>
                <div style={{ width: "30%" }}>
                  <h5>
                    <b>Nombre </b>
                    {`${currentCard[0].nombre} ${currentCard[0].apellido}`}
                  </h5>
                </div>
                <div style={{ width: "30%" }}>
                  <h5>
                    <b>DNI </b>
                    {currentCard[0].dni}
                  </h5>
                </div>
                <div style={{ width: "30%" }}>
                  <h5>
                    <b>Producto </b>
                    {currentCard[0].producto}
                  </h5>
                </div>
              </CardContent>
              <hr />
              <CardHeader title="Detalle" />
            </Card>
            <Datagrid>
              <TextField source="id" />
              <TextField label="Tarjeta" source="tarjeta.numero" />
              <FunctionField
                label="Nombre del cliente"
                render={(record) =>
                  `${record.persona.nombre} ${record.persona.apellido}`
                }
              />
              <TextField label="Nombre del comercio" source="comercio.nombre" />
              <NumberField label="Monto" source="monto" />
              <DateField label="Fecha de transacción" source="fecha" />
            </Datagrid>
          </div>
        </List>
      )}
    </div>
  );
};

export default ShowStatements;
