import React, { useState, useEffect, useCallback } from "react";
import { Redirect } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
// import Select from "@material-ui/core/Select";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
import {
  Title,
  SimpleForm,
  SelectInput,
  Loading,
  NumberInput,
  useRedirect,
  useNotify,
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
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [limite, setLimite] = useState(0);
  const notify = useNotify();
  const redirectTo = useRedirect();

  useEffect(() => {
    // request to initialize client data
    const getClientData = async () => {
      const options = {
        method: "GET",
        headers: headers,
      };

      const response = await fetch(`${apiUrl}/personas?id=${userId}`, options);
      const data = await response.json();
      // console.log("user data", data);
      setCurrentUser(data);
      setUserLoaded(true);
    };

    // request to initialize products select
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

    getClientData();
    getProducts();
  }, []);
  // const handleError = (msg) => {
  //   setIsLoaded(true);
  //   setError(msg);
  // };

  const handleSelectChange = (event) => {
    setProduct(event.target.value);
  };

  const handleLimite = (event) => {
    setLimite(event.target.value);
  };

  const handleCreateTarjeta = async () => {
    const data = {
      activo: true,
      adicional: false,
      limite: parseInt(limite),
      dni: currentUser[0].dni,
      producto: product,
    };

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };

    const response = await fetch(`${apiUrl}/tarjetas`, options);
    const assigned = await response.json();
    // console.log("data", assigned);
    redirectTo("/personas");
    notify("Producto asignado");
  };

  useEffect(() => {
    // request to initialize client data
    const getClientData = async () => {
      const options = {
        method: "GET",
        headers: headers,
      };

      const response = await fetch(`${apiUrl}/personas?id=${userId}`, options);
      const data = await response.json();
      // console.log("user data", data);
      setCurrentUser(data);
      setUserLoaded(true);
    };

    // request to initialize products select
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

    getClientData();
    getProducts();
  }, []);

  // console.log("llega", currentUser, products);

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
              {`${currentUser[0].domicilio.calle} ${currentUser[0].domicilio.numero}, Piso ${currentUser[0].domicilio.piso}, Dpto ${currentUser[0].domicilio.departamento}`}
            </div>
          </CardContent>
          <hr />
          <CardHeader title="Asignar un producto" />
          <CardContent>
            <SimpleForm save={handleCreateTarjeta} redirect={"/personas"}>
              <SelectInput
                label="Producto"
                source="producto"
                onChange={handleSelectChange}
                choices={products
                  .filter((product) => product.activo)
                  .map((product) => ({
                    id: product.nombre,
                    name: `${product.nombre} (${product.categoria})`,
                  }))}
                required
                fullWidth
              />
              <NumberInput
                label="Límite de tarjeta"
                source="limite"
                required
                fullWidth
                onChange={handleLimite}
              />
            </SimpleForm>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
export default AssignProduct;
