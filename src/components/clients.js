import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  DeleteButton,
  BooleanField,
  NumberField,
} from "react-admin";

export const ClientList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <NumberField source="dni" />
      <TextField source="nombre" />
      <TextField source="apellido" />
      <BooleanField source="activo" />
      <EmailField source="contacto.mail" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const ClientEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="name" />
      <TextInput source="username" />
      <TextInput source="email" />
      <TextInput source="address.street" />
      <TextInput source="phone" />
      <TextInput source="website" />
      <TextInput source="company.name" />
    </SimpleForm>
  </Edit>
);

export const ClientCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="name" />
      <TextInput source="username" />
      <TextInput source="email" />
      <TextInput source="address.street" />
      <TextInput source="phone" />
      <TextInput source="website" />
      <TextInput source="company.name" />
    </SimpleForm>
  </Create>
);
