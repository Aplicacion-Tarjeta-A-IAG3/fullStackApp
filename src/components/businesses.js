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

const bajaDescripciones = [
  { id: "temporal", name: "Baja temporal del sistema" },
  { id: "definitiva", name: "Baja definitiva del sistema" },
  { id: "datosIncompletos", name: "Por datos incompletos" },
  { id: "movimientosProhibidos", name: "Por movimientos prohibidos" },
  { id: "", name: "-" },
];

const estado = (idDescripcion) => {
  const item = bajaDescripciones.find((d) => d.id === idDescripcion);
  return item.name;
};

export const BusinessList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <NumberField label="CUIT" source="cuit" />
      <TextField label="Nombre del comercio" source="nombreComercio" />
      <TextField label="Nombre del dueño" source="nombrePersona" />
      <EmailField source="contacto.mail" />
      <BooleanField label="Cliente activo" source="activo" />
      <FunctionField
        label="Detalle de baja"
        render={(record) => estado(record.bajaDescripcion)}
      />
      <EditButton />
    </Datagrid>
  </List>
);

export const BusinessEdit = (props) => (
  <Edit title="Editar establecimiento" {...props}>
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
        <SelectInput
          fullWidth
          label="Detalle de baja"
          source="bajaDescripcion"
          choices={bajaDescripciones}
        />
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

export const BusinessCreate = (props) => (
  <Create title="Crear nuevo establecimiento" {...props}>
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
