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
  DateInput,
} from "react-admin";
import {
  number,
  minValue,
  maxValue,
  email,
  required,
  minLength,
} from "react-admin";
import CreditCardIcon from "@material-ui/icons/CreditCard";

const estadosCiviles = [
  { id: "", name: "Sin especificar" },
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
  <List {...props} exporter={false} bulkActionButtons={false}>
    <Datagrid>
      <TextField source="id" />
      <NumberField label="DNI" source="dni" />
      <FunctionField
        label="Nombre completo"
        render={(record) => `${record.nombre} ${record.apellido}`}
      />
      <EmailField source="contacto.email" />
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

// !! this is necessary to validate values' lengths for NumberInput components
const validateCreation = (values) => {
  const errors = {};
  const {
    dni,
    contacto: { telefono, celular },
  } = values;
  const dniRegex = new RegExp(/^[0-9]{7,8}$/);
  const phoneRegex = new RegExp(/^[0-9]{10,12}$/);
  if (!dniRegex.test(dni)) {
    errors.dni = ["Número de DNI inválido"];
  }
  if (!phoneRegex.test(telefono) || !phoneRegex.test(celular)) {
    errors.tarjeta = ["Número de telefono inválido"];
  }
  return errors;
};

const validateDni = [
  required("No puede estar vacío"),
  number("Debe ser un numero"),
];
const validateEmail = [
  required("No puede estar vacío"),
  email("Debe ser un email válido"),
];
const validateText = [required("No puede estar vacío"), minLength(2)];
const validateNumber = [
  required("No puede estar vacío"),
  number("Debe ser un numero"),
  minValue(1),
];
const validatePoints = [
  required("No puede estar vacío"),
  number("Debe ser un numero"),
  minValue(0),
];
const validatePhone = [
  required("No puede estar vacío"),
  number("Debe ser un numero"),
];

export const ClientEdit = (props) => (
  <Edit title="Editar cliente" {...props}>
    <TabbedForm margin="normal">
      <FormTab label="persona">
        <NumberInput disabled fullWidth label="DNI" source="dni" />
        <TextInput
          fullWidth
          required
          label="Nombre del cliente"
          source="nombre"
          validate={validateText}
        />
        <TextInput
          fullWidth
          required
          label="Apellido del cliente"
          source="apellido"
          validate={validateText}
        />
        <DateInput
          fullWidth
          required
          label="Fecha de nacimiento"
          source="fechaNacimiento"
          validate={required("No puede estar vacío")}
        />
        <SelectInput
          fullWidth
          required
          label="Estado civil"
          source="estadoCivil"
          choices={estadosCiviles}
          validate={required("No puede estar vacío")}
        />
        <PasswordInput fullWidth label="Contraseña" source="password" />
        <NumberInput
          fullWidth
          required
          label="Puntos del cliente"
          source="puntos"
          validate={validatePoints}
        />
        <BooleanInput fullWidth label="Cliente activo" source="activo" />
        <TextField fullWidth label="Detalle de baja" source="motivoBaja" />
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

export const ClientCreate = (props) => (
  <Create title="Crear nuevo cliente" {...props}>
    <TabbedForm margin="normal" validate={validateCreation}>
      <FormTab label="persona">
        <NumberInput
          fullWidth
          required
          label="DNI"
          source="dni"
          validate={validateDni}
        />
        <TextInput
          fullWidth
          required
          label="Nombre del cliente"
          source="nombre"
          validate={validateText}
        />
        <TextInput
          fullWidth
          required
          label="Apellido del cliente"
          source="apellido"
          validate={validateText}
        />
        <DateInput
          fullWidth
          required
          label="Fecha de nacimiento."
          source="fechaNacimiento"
          validate={required("No puede estar vacío")}
        />
        <SelectInput
          fullWidth
          required
          label="Estado civil"
          source="estadoCivil"
          choices={estadosCiviles}
          validate={required("No puede estar vacío")}
        />
        <PasswordInput fullWidth label="Contraseña" source="password" />
        <NumberInput
          fullWidth
          required
          label="Puntos del cliente"
          source="puntos"
          validate={validatePoints}
        />
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
