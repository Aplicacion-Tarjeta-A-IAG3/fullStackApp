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
import {
  required,
  number,
  minValue,
  minLength,
  maxLength,
  regex,
} from "react-admin";

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
    exporter={false}
    {...props}
    bulkActionButtons={false}
    title="Lista de transacciones del día"
  >
    <Datagrid>
      <TextField source="id" />
      <NumberField
        label="Monto"
        source="monto"
        options={{
          style: "currency",
          currency: "ARS",
          maximumSignificantDigits: 2,
        }}
      />
      <TextField label="Tarjeta" source="tarjeta" />
      <TextField label="Tipo de transacción" source="tipo" />
      <TextField label="Nombre del cliente" source="cliente" />
      <TextField label="Nombre del comercio" source="comercio" />
      <TextField label="CUIT del comercio" source="cuit" />
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

  const validateDni = [
    required("No puede estar vacío"),
    number("Debe ser un número"),
  ];
  const validateText = [
    required("No puede estar vacío"),
    minLength(4),
    maxLength(50),
  ];
  const validateCard = [
    required("No puede estar vacío"),
    number("No puede contener letras"),
  ];
  const validateCvc = [
    required("No puede estar vacío"),
    number("No puede contener letras"),
  ];
  const validateNumber = [
    required("No puede estar vacío"),
    number("Debe ser un número"),
    minValue(1),
  ];

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
          <div style={{ width: "100%" }}>
            <h5>Datos del comercio</h5>
            <NumberInput fullWidth disabled label="CUIT" source="cuit" />
            <TextInput
              fullWidth
              disabled
              label="Nombre del comercio"
              source="comercio"
            />
            <h5>Datos del cliente</h5>
            <NumberInput
              fullWidth
              required
              label="DNI"
              source="dni"
              validate={validateDni}
            />
            <TextInput
              fullWidth
              required
              source="nombre"
              validate={validateText}
            />
            <TextInput
              fullWidth
              required
              source="apellido"
              validate={validateText}
            />
            <h5>Datos de la tarjeta</h5>
            <NumberInput
              fullWidth
              required
              label="Número de tarjeta"
              source="tarjeta"
              validate={validateCard}
            />
            <DateInput
              fullWidth
              required
              label="Vencimiento"
              source="vencimiento"
              defaultValue={new Date()}
              validate={required("No debe estar vacío")}
            />
            <NumberInput
              fullWidth
              required
              label="CVC"
              source="cvc"
              validate={validateCvc}
            />
            <h5>Datos de la venta</h5>
            <NumberInput
              fullWidth
              required
              source="monto"
              validate={validateNumber}
            />
            <SelectInput fullWidth source="cuotas" choices={cuotasChoices} />
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
