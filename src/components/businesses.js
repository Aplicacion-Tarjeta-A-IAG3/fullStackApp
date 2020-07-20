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
} from "react-admin";

export const BusinessList = (props) => (
  <List {...props} exporter={false}>
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

export const BusinessEdit = (props) => (
  <Edit title="Editar establecimiento" {...props}>
    <TabbedForm margin="normal">
      <FormTab label="comercio">
        <NumberInput disabled required fullWidth label="CUIT" source="cuit" />
        <TextInput
          fullWidth
          required
          label="Nombre del comercio"
          source="nombre"
        />
        <PasswordInput fullWidth label="Contraseña" source="password" />
        <BooleanInput fullWidth label="Cliente activo" source="activo" />
      </FormTab>
      <FormTab label="domicilio">
        <TextInput fullWidth required label="Calle" source="domicilio.calle" />
        <NumberInput
          fullWidth
          required
          label="Número"
          source="domicilio.numero"
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
        />
        <TextInput
          fullWidth
          required
          label="Código Postal"
          source="domicilio.codigoPostal"
        />
        <TextInput
          fullWidth
          required
          label="Ciudad"
          source="domicilio.ciudad"
        />
        <TextInput
          fullWidth
          required
          label="Localidad"
          source="domicilio.localidad"
        />
        <TextInput
          fullWidth
          required
          label="Provincia"
          source="domicilio.provincia"
        />
        <TextInput fullWidth required label="País" source="domicilio.pais" />
      </FormTab>
      <FormTab label="contacto">
        <TextInput fullWidth required label="Email" source="contacto.email" />
        <TextInput
          fullWidth
          required
          label="Celular"
          source="contacto.celular"
        />
        <TextInput
          fullWidth
          required
          label="Teléfono"
          source="contacto.telefono"
        />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export const BusinessCreate = (props) => (
  <Create title="Crear nuevo establecimiento" {...props}>
    <TabbedForm margin="normal">
      <FormTab label="comercio">
        <NumberInput required fullWidth label="CUIT" source="cuit" />
        <TextInput
          fullWidth
          required
          label="Nombre del comercio"
          source="nombre"
        />
        <PasswordInput fullWidth label="Contraseña" source="password" />
        <BooleanInput fullWidth label="Cliente activo" source="activo" />
      </FormTab>
      <FormTab label="domicilio">
        <TextInput fullWidth required label="Calle" source="domicilio.calle" />
        <NumberInput
          fullWidth
          required
          label="Número"
          source="domicilio.numero"
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
        />
        <TextInput
          fullWidth
          required
          label="Código Postal"
          source="domicilio.codigoPostal"
        />
        <TextInput
          fullWidth
          required
          label="Ciudad"
          source="domicilio.ciudad"
        />
        <TextInput
          fullWidth
          required
          label="Localidad"
          source="domicilio.localidad"
        />
        <TextInput
          fullWidth
          required
          label="Provincia"
          source="domicilio.provincia"
        />
        <TextInput fullWidth required label="País" source="domicilio.pais" />
      </FormTab>
      <FormTab label="contacto">
        <TextInput fullWidth required label="Email" source="contacto.email" />
        <TextInput
          fullWidth
          required
          label="Celular"
          source="contacto.celular"
        />
        <TextInput
          fullWidth
          required
          label="Teléfono"
          source="contacto.telefono"
        />
      </FormTab>
    </TabbedForm>
  </Create>
);
