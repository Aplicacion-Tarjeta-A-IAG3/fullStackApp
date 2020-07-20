import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  FunctionField,
  EditButton,
  Edit,
  TabbedForm,
  FormTab,
  TextInput,
  Create,
  BooleanField,
  NumberField,
  NumberInput,
  PasswordInput,
  BooleanInput,
  SelectInput,
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
  </Create>
);
