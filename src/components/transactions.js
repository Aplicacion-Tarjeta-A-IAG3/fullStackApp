import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
<<<<<<< HEAD
<<<<<<< HEAD
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
} from "react-admin";
import jsonExport from "jsonexport/dist";

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
  <List exporter={exporter} {...props}>
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
=======
  EmailField,
  FunctionField,
  EditButton,
  Edit,
  TabbedForm,
  FormTab,
=======
>>>>>>> e23ba06... Connect create transacciones
  TextInput,
  Create,
  NumberInput,
  SimpleForm,
  DateInput,
} from "react-admin";

export const TransactionList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="body" />
>>>>>>> ea7525a... Added dashboard and transaccion page
    </Datagrid>
  </List>
);

<<<<<<< HEAD
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

export const TransactionCreate = (props) => (
  <Create title="Postnet virtual" {...props}>
    <SimpleForm>
      <h5>Datos del comercio</h5>
      <NumberInput fullWidth required label="CUIT" source="cuit" />
      <TextInput fullWidth label="Nombre del comercio" source="comercio" />
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
      <NumberInput fullWidth source="cuotas" />
    </SimpleForm>
=======
export const TransactionCreate = (props) => (
<<<<<<< HEAD
  <Create title="Realizar una transacción" {...props}>
    <TabbedForm margin="normal">
      <FormTab label="comercio">
        <TextInput disabled fullWidth label="Id" source="id" />
        <TextInput disabled fullWidth label="CUIT" source="cuit" />
        <TextInput
          fullWidth
          label="Nombre del comercio"
          source="nombreComercio"
        />
        <TextInput fullWidth label="Nombre del dueño" source="nombrePersona" />
        <PasswordInput fullWidth label="Contraseña" source="password" />
        <NumberInput fullWidth label="Puntos del cliente" source="puntos" />
        <BooleanInput fullWidth label="Comercio activo" source="activo" />
      </FormTab>
      <FormTab label="domicilio">
        <TextInput fullWidth label="Calle" source="domicilio.calle" />
        <NumberInput fullWidth label="Número" source="domicilio.numero" />
        <NumberInput fullWidth label="Piso" source="domicilio.piso" />
        <TextInput
          fullWidth
          label="Departamento"
          source="domicilio.departamento"
        />
        <TextInput fullWidth label="Barrio" source="domicilio.barrio" />
        <TextInput
          fullWidth
          label="Código Postal"
          source="domicilio.codigoPostal"
        />
        <TextInput fullWidth label="Ciudad" source="domicilio.ciudad" />
        <TextInput fullWidth label="Localidad" source="domicilio.localidad" />
        <TextInput fullWidth label="Provincia" source="domicilio.provincia" />
        <TextInput fullWidth label="País" source="domicilio.pais" />
      </FormTab>
      <FormTab label="contacto">
        <TextInput fullWidth label="Email" source="contacto.mail" />
        <NumberInput fullWidth label="Celular" source="contacto.celular" />
        <NumberInput fullWidth label="Teléfono" source="contacto.telefono" />
      </FormTab>
    </TabbedForm>
>>>>>>> ea7525a... Added dashboard and transaccion page
=======
  <Create title="Registrar una transacción" {...props}>
    <SimpleForm>
      <div
        style={{
          fontSize: "1.25em",
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif;"',
          fontWeight: "500",
          lineHeight: "1.6",
          marginBottom: "1em",
        }}
      >
        {"Postnet virtual"}
      </div>
      <TextInput fullWidth source="nombre" />
      <TextInput fullWidth source="apellido" />
      <NumberInput fullWidth required source="dni" />
      <TextInput fullWidth source="comercio" />
      <NumberInput fullWidth required source="cuit" />
      <NumberInput fullWidth required source="tarjeta" />
      <DateInput
        fullWidth
        required
        label="Vencimiento"
        source="vencimiento"
        defaultValue={new Date()}
      />
      <NumberInput fullWidth required source="cvc" />
      <NumberInput fullWidth required source="monto" />
      <NumberInput fullWidth source="cuotas" />
    </SimpleForm>
>>>>>>> e23ba06... Connect create transacciones
  </Create>
);
