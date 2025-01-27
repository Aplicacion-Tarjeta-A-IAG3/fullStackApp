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
  Toolbar,
  SaveButton,
} from "react-admin";
import { required, minLength } from "react-admin";

const ProductsToolbar = ({ resource, ...props }) => (
  <Toolbar {...props}>
    <SaveButton redirect="list" submitOnEnter={false} />
  </Toolbar>
);

export const ProductList = (props) => (
  <List
    {...props}
    bulkActionButtons={false}
    exporter={false}
    pagination={false}
  >
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

const validateText = [required("No puede estar vacío"), minLength(4)];
const validateBoolean = [required()];

export const ProductCreate = (props) => (
  <Create undoable="false" title="Nuevo producto" {...props}>
    <SimpleForm toolbar={<ProductsToolbar />} redirect="list">
      <TextInput fullWidth required source="nombre" validate={validateText} />
      <TextInput fullWidth required source="tipo" validate={validateText} />
      <TextInput
        fullWidth
        required
        source="categoria"
        validate={validateText}
      />
      <TextInput
        fullWidth
        required
        multiline
        source="requisitos"
        validate={validateText}
      />
      <BooleanInput
        fullWidth
        required
        source="activo"
        validate={validateBoolean}
      />
    </SimpleForm>
  </Create>
);

export const ProductEdit = (props) => (
  <Edit undoable={false} {...props}>
    <SimpleForm toolbar={<ProductsToolbar />} redirect="list">
      <NumberInput fullWidth disabled source="id" />
      <TextInput fullWidth required source="nombre" validate={validateText} />
      <TextInput fullWidth required source="tipo" validate={validateText} />
      <TextInput
        fullWidth
        required
        source="categoria"
        validate={validateText}
      />
      <TextInput
        fullWidth
        required
        multiline
        source="requisitos"
        validate={validateText}
      />
      <BooleanInput fullWidth label="Producto activo" source="activo" />
    </SimpleForm>
  </Edit>
);
