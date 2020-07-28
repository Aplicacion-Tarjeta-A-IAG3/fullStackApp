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
  FunctionField,
  NumberField,
  DateField,
  Show,
  SimpleShowLayout,
  downloadCSV,
  Loading,
  SelectInput,
} from "react-admin";
import jsonExport from "jsonexport/dist";

const apiUrl = "https://african-express.us-e2.cloudhub.io/api/core";
const headers = {
  "Content-Type": "application/json",
  client_id: localStorage.getItem("clientId"),
  client_secret: localStorage.getItem("clientSecret"),
};

const cuotasChoices = [...Array(12).keys()].map((a, i) => ({
  id: i + 1,
  name: i + 1,
}));

const exporter = (transactions) => {
  const transactionsExport = transactions.map((transaction) => {
    const { persona, tarjeta, comercio, detalle, ...forExport } = transaction; // omit persona, tarjeta, comercio and detalle
    forExport.cliente = `${transaction.persona.nombre} ${transaction.persona.apellido}`;
    forExport.comercio = transaction.comercio.nombre;
    forExport.tarjeta = transaction.tarjeta.numero;
    return forExport;
  });
  jsonExport(
    transactionsExport,
    {
      headers: [
        "id",
        "monto",
        "cuotas",
        "fecha",
        "cliente",
        "comercio",
        "tarjeta",
      ],
    },
    (err, csv) => {
      downloadCSV(csv, "transacciones"); // download as 'transacciones.csv` file
    }
  );
};

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

export const TransactionShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <h5>Datos de la transacción</h5>
      <NumberField label="Monto" source="monto" />
      <NumberInput label="Cuotas" fullWidth source="cuotas" />
      <DateField label="Fecha de transacción" source="fecha" />
      <TextField label="Detalle" source="detalle" />
      <h5>Datos del cliente</h5>
      <NumberField label="DNI" source="persona.dni" />
      <TextField label="Nombre" source="persona.nombre" />
      <TextField label="Apellido" source="persona.apellido" />
      <h5>Datos de la tarjeta</h5>
      <NumberField label="Número" source="tarjeta.numero" />
      <DateField label="Vencimiento" source="tarjeta.fechaVencimiento" />
      <h5>Datos del comercio</h5>
      <NumberField label="CUIT" source="comercio.cuit" />
      <TextField label="Nombre" source="comercio.nombre" />
    </SimpleShowLayout>
  </Show>
);

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
      <SimpleForm initialValues={defaultFormValue}>
        {localStorage.getItem("username") && (
          <div fullWidth>
            <h5>Datos del comercio</h5>
            <NumberInput fullWidth disabled label="CUIT" source="cuit" />
            <TextInput
              fullWidth
              disabled
              label="Nombre del comercio"
              source="comercio"
            />
            <h5>Datos del cliente</h5>
            <NumberInput fullWidth required label="DNI" source="dni" />
            <TextInput fullWidth source="nombre" />
            <TextInput fullWidth source="apellido" />
            <h5>Datos de la tarjeta</h5>
            <NumberInput
              fullWidth
              required
              label="Número de tarjeta"
              source="tarjeta"
            />
            <DateInput
              fullWidth
              required
              label="Vencimiento"
              source="vencimiento"
              defaultValue={new Date()}
            />
            <NumberInput fullWidth required label="CVC" source="cvc" />
            <h5>Datos de la venta</h5>
            <NumberInput fullWidth required source="monto" />
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
