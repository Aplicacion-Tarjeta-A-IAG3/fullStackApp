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
  Button,
  Link,
} from "react-admin";
import CreditCardIcon from "@material-ui/icons/CreditCard";

const estadosCiviles = [
  { id: null, name: "Sin especificar" },
  { id: "soltero", name: "Soltero(a)" },
  { id: "casado", name: "En matrimonio" },
  { id: "concubinato", name: "En concubinato" },
  { id: "otros", name: "Otros" },
];

// const bajaDescripciones = [
//   { id: "temporal", name: "Baja temporal del sistema" },
//   { id: "definitiva", name: "Baja definitiva del sistema" },
//   { id: "datosIncompletos", name: "Por datos incompletos" },
//   { id: "movimientosProhibidos", name: "Por movimientos prohibidos" },
//   { id: "", name: "-" },
// ];

// const estado = (idDescripcion) => {
//   const item = bajaDescripciones.find((d) => d.id === idDescripcion);
//   return item.name;
// };

const AsignProductField = ({ record = {} }) => (
  <Button
    component={Link}
    to={{ pathname: `/personas/${record.id}/asignar_producto` }}
    label="Asignar Producto"
    disabled={!record.activo}
  >
    <CreditCardIcon />
  </Button>
);

export const ClientList = (props) => (
  <List {...props} exporter={false}>
    <Datagrid>
      <TextField source="id" />
      <NumberField label="DNI" source="dni" />
      <FunctionField
        label="Nombre completo"
        render={(record) => `${record.nombre} ${record.apellido}`}
      />
      <EmailField source="contacto.mail" />
      <BooleanField label="Cliente activo" source="activo" />
      {/* <FunctionField
        label="Detalle de baja"
        render={(record) => estado(record.bajaDescripcion)}
      /> */}
      <EditButton />
      <AsignProductField />
    </Datagrid>
  </List>
);

export const ClientEdit = (props) => (
  <Edit title="Editar cliente" {...props}>
    <TabbedForm margin="normal">
      <FormTab label="persona">
        <TextInput disabled fullWidth label="DNI" source="dni" />
        <TextInput fullWidth label="Nombre del cliente" source="nombre" />
        <TextInput fullWidth label="Apellido del cliente" source="apellido" />
        <TextInput
          fullWidth
          label="Fecha de nacimiento"
          source="fechaNacimiento"
        />
        <SelectInput
          fullWidth
          label="Estado civil"
          source="estadoCivil"
          choices={estadosCiviles}
        />
        <PasswordInput fullWidth label="Contraseña" source="password" />
        <NumberInput fullWidth label="Puntos del cliente" source="puntos" />
        <BooleanInput fullWidth label="Cliente activo" source="activo" />
        {/* <RichTextField fullWidth label="Detalle de baja" source="motivoBaja" /> */}
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
        <TextInput fullWidth label="Email" source="contacto.email" />
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
