import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  TextInput,
  Create,
  NumberInput,
  SimpleForm,
  DateInput,
  NumberField,
  Loading,
  SelectInput,
} from "react-admin";
import formValidation from "../models/formValidations";

const apiUrl = "https://african-express.us-e2.cloudhub.io/api/core";
const headers = {
  "Content-Type": "application/json",
  client_id: localStorage.getItem("clientId"),
  client_secret: localStorage.getItem("clientSecret"),
};

const cuotasChoices = [...Array(12).keys()].map((a, i) => ({
  id: i + 1,
  name: (i + 1).toString(),
}));

export const TransactionList = (props) => (
  <List
    {...props}
    exporter={false}
    bulkActionButtons={false}
    pagination={false}
    title="Lista de transacciones del día"
  >
    <Datagrid>
      <NumberField
        sortable={false}
        source="monto"
        options={{
          style: "currency",
          currency: "ARS",
          significantDigits: 2,
        }}
      />
      <TextField sortable={false} source="tarjeta" />
      <TextField sortable={false} source="tipo" />
      <TextField sortable={false} source="cliente" />
      <TextField sortable={false} source="comercio" />
      <TextField sortable={false} source="cuit" />
    </Datagrid>
  </List>
);

// !! this is necessary to validate values' lengths for NumberInput components
const validateCreation = (values) => {
  const errors = {};
  const { dni, tarjeta, cvc } = values;
  const dniRegex = new RegExp(/^[0-9]{7,8}$/);
  const cardRegex = new RegExp(/^\d{16}$/);
  const cvcRegex = new RegExp(/^\d{3}$/);
  if (!dniRegex.test(dni)) {
    errors.dni = ["Número de DNI inválido"];
  }
  if (!cardRegex.test(tarjeta)) {
    errors.tarjeta = [
      "Ingresar número de tarjeta válido. (16 dígitos, sin espacios, sin símbolos)",
    ];
  }
  if (!cvcRegex.test(cvc)) {
    errors.cvc = ["Ingresar CVC válido. (3 dígitos)"];
  }
  return errors;
};

export const TransactionCreate = (props) => {
  const [defaultFormValue, setDefaultFormValue] = React.useState({});

  React.useEffect(() => {
    const username = localStorage.getItem("username");
    const fillBusinessData = async () => {
      const options = {
        method: "GET",
        headers: headers,
      };

      const response = await fetch(
        `${apiUrl}/comercios?cuit=${username}`,
        options
      );
      const data = await response.json();
      // console.log("business data", data);
      setDefaultFormValue({
        comercio: data[0].nombre,
        cuit: data[0].cuit,
        cuotas: 1,
      });
    };

    fillBusinessData();
  }, []);

  return (
    <Create title="Posnet virtual" {...props}>
      <SimpleForm initialValues={defaultFormValue} validate={validateCreation}>
        {localStorage.getItem("username") && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#dbdacc",
              padding: "1em",
              borderRadius: "5px",
            }}
          >
            <h4>Datos del comercio</h4>
            <NumberInput
              disabled
              label="CUIT"
              source="cuit"
              validate={formValidation.validateCuit}
            />
            <TextInput disabled label="Nombre del comercio" source="comercio" />
            <h4>Datos del cliente</h4>
            <NumberInput
              required
              label="DNI"
              source="dni"
              validate={formValidation.validateDni}
            />
            <TextInput
              required
              source="nombre"
              validate={formValidation.validateText}
            />
            <TextInput
              required
              source="apellido"
              validate={formValidation.validateText}
            />
            <h4>Datos de la tarjeta</h4>
            <NumberInput
              required
              label="Número de tarjeta"
              source="tarjeta"
              validate={formValidation.validateCard}
            />
            <DateInput
              required
              label="Vencimiento"
              source="vencimiento"
              defaultValue={new Date()}
              validate={formValidation.validateRequired}
            />
            <NumberInput
              required
              label="CVC"
              source="cvc"
              validate={formValidation.validateCvc}
            />
            <h4>Datos de la venta</h4>
            <NumberInput
              required
              source="monto"
              validate={formValidation.validateNumber}
            />
            <SelectInput source="cuotas" choices={cuotasChoices} />
          </div>
        )}
        {!localStorage.getItem("username") && (
          <Loading
            fullWidth
            loadingPrimary="app.page.loading"
            loadingSecondary="app.message.loading"
          />
        )}
      </SimpleForm>
    </Create>
  );
};
