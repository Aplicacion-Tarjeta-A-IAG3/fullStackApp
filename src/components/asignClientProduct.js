import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Title, SimpleForm, SelectField, Loading } from "react-admin";

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
    <Card>
      <Title title="Asignar producto al cliente" />
      <CardContent>
        {isLoaded && (
          <SimpleForm>
            <SelectField
              source="Productos"
              choices={[
                { id: "M", name: "Male" },
                { id: "F", name: "Female" },
              ]}
            />
          </SimpleForm>
        )}
        {!isLoaded && <Loading loadingPrimary="app.page.loading" />}
      </CardContent>
    </Card>
  );
};

export default AsignProduct;
