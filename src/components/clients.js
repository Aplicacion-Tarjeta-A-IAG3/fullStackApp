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
  DateField,
  DateInput,
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
  <List {...props} exporter={false}>
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

export const ClientEdit = (props) => (
  <Edit title="Editar cliente" {...props}>
    <TabbedForm margin="normal">
      <FormTab label="persona">
        <NumberInput disabled required fullWidth label="DNI" source="dni" />
        <TextInput
          fullWidth
          required
          label="Nombre del cliente"
          source="nombre"
        />
        <TextInput
          fullWidth
          required
          label="Apellido del cliente"
          source="apellido"
        />
        <DateField
          fullWidth
          required
          label="Fecha de nacimiento"
          source="fechaNacimiento"
        />
        <SelectInput
          fullWidth
          required
          label="Estado civil"
          source="estadoCivil"
          choices={estadosCiviles}
        />
        <PasswordInput fullWidth label="Contraseña" source="password" />
        <NumberInput
          fullWidth
          required
          label="Puntos del cliente"
          source="puntos"
        />
        <BooleanInput fullWidth label="Cliente activo" source="activo" />
        {/* <RichTextField fullWidth label="Detalle de baja" source="motivoBaja" /> */}
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

export const ClientCreate = (props) => (
  <Create title="Crear nuevo cliente" {...props}>
    <TabbedForm margin="normal">
      <FormTab label="persona">
        <NumberInput fullWidth required label="DNI" source="dni" />
        <TextInput
          fullWidth
          required
          label="Nombre del cliente"
          source="nombre"
        />
        <TextInput
          fullWidth
          required
          label="Apellido del cliente"
          source="apellido"
        />
        <DateInput
          fullWidth
          required
          label="Fecha de nacimiento."
          source="fechaNacimiento"
        />
        <SelectInput
          fullWidth
          required
          label="Estado civil"
          source="estadoCivil"
          choices={estadosCiviles}
        />
        <PasswordInput fullWidth label="Contraseña" source="password" />
        <NumberInput
          fullWidth
          required
          label="Puntos del cliente"
          source="puntos"
        />
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
