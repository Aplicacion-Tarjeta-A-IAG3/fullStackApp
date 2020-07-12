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
    <TabbedForm>
      <FormTab label="persona">
        <TextInput disabled label="Id" source="id" />
        <TextInput disabled label="DNI" source="dni" />
        <TextInput label="Nombre del cliente" source="nombre" />
        <TextInput label="Apellido del cliente" source="apellido" />
        <SelectInput label="Estado civil" source="estadoCivil"></SelectInput>
        <SelectInput
          label="Estado civil"
          source="estadoCivil"
          choices={[
            { id: 0, name: "Soltero(a)" },
            { id: 1, name: "Matrimonio" },
            { id: 2, name: "En concubinato" },
            { id: 3, name: "Otros" },
          ]}
        />
        <PasswordInput label="Contraseña" source="password" />
        <NumberInput label="Puntos del cliente" source="puntos" />
        <BooleanInput label="Cliente activo" source="activo" />
      </FormTab>
      <FormTab label="domicilio">
        <TextInput disabled label="Id domicilio" source="domicilio.id" />
        <TextInput label="Calle" source="domicilio.calle" />
        <NumberInput label="Número" source="domicilio.numero" />
        <NumberInput label="Piso" source="domicilio.piso" />
        <TextInput label="Departamento" source="domicilio.departamento" />
        <TextInput label="Barrio" source="domicilio.barrio" />
        <TextInput label="Código Postal" source="domicilio.codigoPostal" />
        <TextInput label="Ciudad" source="domicilio.ciudad" />
        <TextInput label="Localidad" source="domicilio.localidad" />
        <TextInput label="Provincia" source="domicilio.provincia" />
        <TextInput label="País" source="domicilio.pais" />
      </FormTab>
      <FormTab label="contacto">
        <TextInput disabled label="Id contacto" source="contacto.id" />
        <TextInput label="Email" source="contacto.mail" />
        <NumberInput label="Celular" source="contacto.celular" />
        <NumberInput label="Teléfono" source="contacto.telefono" />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export const ClientCreate = (props) => (
  <Create title="Crear nuevo cliente" {...props}>
    <TabbedForm>
      <TextInput source="id" />
      <TextInput source="name" />
      <TextInput source="username" />
      <TextInput source="email" />
      <TextInput source="address.street" />
      <TextInput source="phone" />
      <TextInput source="website" />
      <TextInput source="company.name" />
    </TabbedForm>
  </Create>
);
