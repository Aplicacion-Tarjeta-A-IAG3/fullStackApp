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
  BooleanField,
  NumberField,
  NumberInput,
  PasswordInput,
  BooleanInput,
  Toolbar,
  SaveButton,
} from "react-admin";
import { number, minValue, email, required, minLength } from "react-admin";

const BusinessesToolbar = ({ resource, ...props }) => (
  <Toolbar {...props}>
    <SaveButton redirect="list" submitOnEnter={false} />
  </Toolbar>
);

export const BusinessList = (props) => (
  <List {...props} exporter={false} bulkActionButtons={false}>
    <Datagrid>
      <TextField source="id" />
      <NumberField label="CUIT" source="cuit" />
      <TextField label="Nombre del comercio" source="nombre" />
      <EmailField source="contacto.email" />
      <BooleanField label="Comercio activo" source="activo" />
      <EditButton />
    </Datagrid>
  </List>
);

// !! this is necessary to validate values' lengths for NumberInput components
const validateCreation = (values) => {
  // console.log("values", values);
  const errors = {};
  const { cuit } = values;
  const cuitRegex = new RegExp(/^[0-9]{10,11}$/);
  if (!cuitRegex.test(cuit)) {
    errors.dni = ["Número de CUIT inválido"];
  }
  return errors;
};

const validateCuit = [
  required("No puede estar vacío"),
  number("Debe ser un número"),
];
const validateEmail = [
  required("No puede estar vacío"),
  email("Debe ser un email válido"),
];
const validateText = [required("No puede estar vacío"), minLength(2)];
const validateNumber = [
  required("No puede estar vacío"),
  number("Debe ser un número"),
  minValue(1),
];
const validatePhone = [
  required("No puede estar vacío"),
  number("Debe ser un número"),
];

export const BusinessEdit = (props) => (
  <Edit undoable={false} title="Editar establecimiento" {...props}>
    <TabbedForm margin="normal" toolbar={<BusinessesToolbar />}>
      <FormTab label="comercio">
        <NumberInput disabled required fullWidth label="CUIT" source="cuit" />
        <TextInput
          fullWidth
          required
          label="Nombre del comercio"
          source="nombre"
          validate={validateText}
        />
        <PasswordInput fullWidth label="Contraseña" source="password" />
        <BooleanInput fullWidth label="Cliente activo" source="activo" />
      </FormTab>
      <FormTab label="domicilio">
        <TextInput
          fullWidth
          required
          label="Calle"
          source="domicilio.calle"
          validate={validateText}
        />
        <NumberInput
          fullWidth
          required
          label="Número"
          source="domicilio.numero"
          validate={validateNumber}
        />
        <NumberInput fullWidth label="Piso" source="domicilio.piso" />
        <TextInput
          fullWidth
          label="Departamento"
          source="domicilio.departamento"
        />
        <TextInput
          fullWidth
          required
          label="Barrio"
          source="domicilio.barrio"
          validate={validateText}
        />
        <TextInput
          fullWidth
          required
          label="Código Postal"
          source="domicilio.codigoPostal"
          validate={validateText}
        />
        <TextInput
          fullWidth
          required
          label="Ciudad"
          source="domicilio.ciudad"
          validate={validateText}
        />
        <TextInput
          fullWidth
          required
          label="Localidad"
          source="domicilio.localidad"
          validate={validateText}
        />
        <TextInput
          fullWidth
          required
          label="Provincia"
          source="domicilio.provincia"
          validate={validateText}
        />
        <TextInput
          fullWidth
          required
          label="País"
          source="domicilio.pais"
          validate={validateText}
        />
      </FormTab>
      <FormTab label="contacto">
        <TextInput
          fullWidth
          required
          label="Email"
          source="contacto.email"
          validate={validateEmail}
        />
        <TextInput
          fullWidth
          required
          label="Celular"
          source="contacto.celular"
          validate={validatePhone}
        />
        <TextInput
          fullWidth
          required
          label="Teléfono"
          source="contacto.telefono"
          validate={validatePhone}
        />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export const BusinessCreate = (props) => (
  <Create undoable={false} title="Crear nuevo establecimiento" {...props}>
    <TabbedForm
      margin="normal"
      validate={validateCreation}
      toolbar={<BusinessesToolbar />}
    >
      <FormTab label="comercio">
        <NumberInput
          required
          fullWidth
          label="CUIT"
          source="cuit"
          validate={validateCuit}
        />
        <TextInput
          fullWidth
          required
          label="Nombre del comercio"
          source="nombre"
          validate={validateText}
        />
        <PasswordInput fullWidth label="Contraseña" source="password" />
        <BooleanInput fullWidth label="Cliente activo" source="activo" />
      </FormTab>
      <FormTab label="domicilio">
        <TextInput
          fullWidth
          required
          label="Calle"
          source="domicilio.calle"
          validate={validateText}
        />
        <NumberInput
          fullWidth
          required
          label="Número"
          source="domicilio.numero"
          validate={validateNumber}
        />
        <NumberInput fullWidth label="Piso" source="domicilio.piso" />
        <TextInput
          fullWidth
          label="Departamento"
          source="domicilio.departamento"
        />
        <TextInput
          fullWidth
          required
          label="Barrio"
          source="domicilio.barrio"
          validate={validateText}
        />
        <TextInput
          fullWidth
          required
          label="Código Postal"
          source="domicilio.codigoPostal"
          validate={validateText}
        />
        <TextInput
          fullWidth
          required
          label="Ciudad"
          source="domicilio.ciudad"
          validate={validateText}
        />
        <TextInput
          fullWidth
          required
          label="Localidad"
          source="domicilio.localidad"
          validate={validateText}
        />
        <TextInput
          fullWidth
          required
          label="Provincia"
          source="domicilio.provincia"
          validate={validateText}
        />
        <TextInput
          fullWidth
          required
          label="País"
          source="domicilio.pais"
          validate={validateText}
        />
      </FormTab>
      <FormTab label="contacto">
        <TextInput
          fullWidth
          required
          label="Email"
          source="contacto.email"
          validate={validateEmail}
        />
        <TextInput
          fullWidth
          required
          label="Celular"
          source="contacto.celular"
          validate={validatePhone}
        />
        <TextInput
          fullWidth
          required
          label="Teléfono"
          source="contacto.telefono"
          validate={validatePhone}
        />
      </FormTab>
    </TabbedForm>
  </Create>
);
