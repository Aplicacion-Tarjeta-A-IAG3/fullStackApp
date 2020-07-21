import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  Create,
  Edit,
  SimpleForm,
  NumberInput,
  TextInput,
  BooleanInput,
  EditButton,
} from "react-admin";

export const ProductList = (props) => (
  <List {...props} bulkActionButtons={false} exporter={false}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="nombre" />
      <TextField source="tipo" />
      <TextField source="categoria" />
      <BooleanField source="activo" />
      <EditButton />
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

export const ProductEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <NumberInput fullWidth disabled source="id" />
      <TextInput fullWidth required source="nombre" />
      <TextInput fullWidth required source="tipo" />
      <TextInput fullWidth required source="categoria" />
      <TextInput fullWidth required multiline source="requisitos" />
      <BooleanInput fullWidth required source="activo" />
    </SimpleForm>
  </Edit>
);
