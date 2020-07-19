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
} from "react-admin";

const AsignProduct = (props) => {
  console.log("props", props);
  const userId = props.match.params.id;
  const [user, setUser] = React.useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [product, setProduct] = React.useState(null);
  const [products, setProducts] = useState([]);

  const handleError = (msg) => {
    setIsLoaded(true);
    setError(msg);
  };

  const handleGetUser = (data) => {
    setIsLoaded(true);
    setUser(data);
  };

  // TODO: set productos
  const handleGetProducts = (data) => {
    setIsLoaded(true);
    setProducts(data);
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
    // get products
    fetch(`http://african-express.us-e2.cloudhub.io/api/core/productos`)
      .then((response) => response.json())
      .then(
        (result) => {
          console.log("get user", result);
          handleGetProducts(result);
        },
        (error) => handleError(error)
      );
  }, []);

  return (
    <div>
      <Title title="Asignando un producto" />
      {isLoaded && (
        <Card>
          <CardHeader title="Información del cliente" />
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
          <CardHeader title="Asignar un producto" />
          <CardContent>
            <SimpleForm>
              <SelectInput
                label="Producto"
                source="productoId"
                choices={[
                  { id: 1, name: "Producto 1" },
                  { id: 2, name: "Producto 2" },
                  { id: 2, name: "Producto 3" },
                ]}
                required={true}
              />
              <NumberInput
                label="Límite de tarjeta"
                source="limite"
                required={true}
              />
            </SimpleForm>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AsignProduct;
