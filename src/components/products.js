import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  Create,
  SimpleForm,
  TextInput,
  BooleanInput,
} from "react-admin";

// "id": 4,
// "nombre": "gold1",
// "tipo": "avanzada",
// "categoria": "gold",
// "requisitos": "ingresos mayores a $60.000",
// "motivoBaja": "",
// "activo": true

export const ProductList = (props) => (
  <List {...props} bulkActionButtons={false} exporter={false}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="nombre" />
      <TextField source="tipo" />
      <TextField source="categoria" />
      <BooleanField source="activo" />
    </Datagrid>
  </List>
);

export const ProductCreate = (props) => (
  <Create title="Nuevo producto" {...props}>
    <SimpleForm>
      <TextInput fullWidth required source="nombre" />
      <TextInput fullWidth required source="tipo" />
      <TextInput fullWidth required source="categoria" />
      <TextInput fullWidth required multiline source="requisitos" />
      <BooleanInput fullWidth required source="activo" />
    </SimpleForm>
  </Create>
);
