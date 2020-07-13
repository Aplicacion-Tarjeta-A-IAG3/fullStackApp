import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  Edit,
  TabbedForm,
  FormTab,
  TextInput,
  Create,
  DeleteButton,
  BooleanField,
  NumberField,
  NumberInput,
  PasswordInput,
  BooleanInput,
  SelectInput,
} from "react-admin";

const estadosCiviles = [
  { id: 0, name: "Soltero(a)" },
  { id: 1, name: "En matrimonio" },
  { id: 2, name: "En concubinato" },
  { id: 3, name: "Otros" },
];

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
  <Edit title="Editar cliente" {...props}>
    <TabbedForm margin="normal">
      <FormTab label="persona">
        <TextInput disabled fullWidth label="Id" source="id" />
        <TextInput disabled fullWidth label="DNI" source="dni" />
        <BooleanInput fullWidth label="Cliente activo" source="activo" />
        <TextInput fullWidth label="Nombre del cliente" source="nombre" />
        <TextInput fullWidth label="Apellido del cliente" source="apellido" />
        <SelectInput
          fullWidth
          label="Estado civil"
          source="estadoCivil"
          choices={estadosCiviles}
        />
        <PasswordInput fullWidth label="Contraseña" source="password" />
        <NumberInput fullWidth label="Puntos del cliente" source="puntos" />
      </FormTab>
      <FormTab label="domicilio">
        <TextInput
          fullWidth
          disabled
          label="Id domicilio"
          source="domicilio.id"
        />
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
        <TextInput
          fullWidth
          disabled
          label="Id contacto"
          source="contacto.id"
        />
        <TextInput fullWidth label="Email" source="contacto.mail" />
        <NumberInput fullWidth label="Celular" source="contacto.celular" />
        <NumberInput fullWidth label="Teléfono" source="contacto.telefono" />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export const ClientCreate = (props) => (
  <Create title="Crear nuevo cliente" {...props}>
    <TabbedForm margin="normal">
      <FormTab label="persona">
        <TextInput fullWidth label="DNI" source="dni" />
        <BooleanInput fullWidth label="Cliente activo" source="activo" />
        <TextInput fullWidth label="Nombre del cliente" source="nombre" />
        <TextInput fullWidth label="Apellido del cliente" source="apellido" />
        <SelectInput
          fullWidth
          label="Estado civil"
          source="estadoCivil"
          choices={estadosCiviles}
        />
        <PasswordInput fullWidth label="Contraseña" source="password" />
        <NumberInput fullWidth label="Puntos del cliente" source="puntos" />
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