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
} from "react-admin";

export const TransactionList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="body" />
    </Datagrid>
  </List>
);

export const TransactionCreate = (props) => (
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
  </Create>
);
