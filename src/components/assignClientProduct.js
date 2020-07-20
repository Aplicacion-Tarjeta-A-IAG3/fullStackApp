import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import {
  Title,
  SimpleForm,
  SelectInput,
  Loading,
  NumberInput,
} from "react-admin";

const apiUrl = "https://african-express.us-e2.cloudhub.io/api/core";

const headers = {
  "Content-Type": "application/json",
  client_id: localStorage.getItem("clientId"),
  client_secret: localStorage.getItem("clientSecret"),
};

const AssignProduct = (props) => {
  // console.log("props", props);
  const userId = props.match.params.id;
  const [currentUser, setCurrentUser] = useState(null);
  // const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);
  const [product, setProduct] = React.useState(null);
  const [products, setProducts] = useState([]);

  // const handleError = (msg) => {
  //   setIsLoaded(true);
  //   setError(msg);
  // };

  const handleSelectChange = (event) => {
    console.log("select option", event.target.value);
    setProduct(event.target.value);
  };

  useEffect(() => {
    const getUserData = async () => {
      const options = {
        method: "GET",
        headers: headers,
      };

      const response = await fetch(`${apiUrl}/personas?id=${userId}`, options);
      const data = await response.json();
      console.log("user data", data);
      setCurrentUser(data);
      setUserLoaded(true);
    };

    const getProducts = async () => {
      const options = {
        method: "GET",
        headers: headers,
      };

      const response = await fetch(`${apiUrl}/productos`, options);
      const data = await response.json();
      setProducts(data);
      setProductsLoaded(true);
    };

    getUserData();
    getProducts();
  }, []);

  console.log("llega", currentUser, products);

  return (
    <div>
      <Title title="Asignando un producto" />
      {userLoaded && productsLoaded && (
        <Card>
          <CardHeader title="Información del cliente" />
          <CardContent style={{ display: "flex" }}>
            <div style={{ width: "30%" }}>
              <b>Nombre </b>
              {`${currentUser[0].nombre} ${currentUser[0].apellido}`}
            </div>
            <div style={{ width: "30%" }}>
              <b>DNI </b>
              {currentUser[0].dni}
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
              <InputLabel id="producto-select-label">Productos</InputLabel>
              <Select
                labelId="producto-select-label"
                id="producto-select"
                label="Producto"
                value={product}
                onChange={handleSelectChange}
                required
                fullWidth
              >
                {products.map((product) => (
                  <MenuItem value={product.id}>{product.nombre}</MenuItem>
                ))}
              </Select>
              <NumberInput
                label="Límite de tarjeta"
                source="limite"
                required
                fullWidth
              />
            </SimpleForm>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
export default AssignProduct;
