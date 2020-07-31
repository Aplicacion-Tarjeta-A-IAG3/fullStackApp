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
  Toolbar,
  SaveButton,
  FormDataConsumer,
} from "react-admin";
import formValidations from "../models/formValidations";
import CreditCardIcon from "@material-ui/icons/CreditCard";

const ClientsToolbar = ({ resource, ...props }) => (
  <Toolbar {...props}>
    <SaveButton redirect="list" submitOnEnter={false} />
  </Toolbar>
);

const estadosCiviles = [
  { id: "false", name: "Soltero(a)" },
  { id: "true", name: "Casado(a)" },
];

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
  <List
    {...props}
    exporter={false}
    bulkActionButtons={false}
    pagination={false}
  >
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
  // console.log("values", values);
  const errors = {};
  const { dni } = values;
  const dniRegex = new RegExp(/^[0-9]{7,8}$/);
  if (!dniRegex.test(dni)) {
    errors.dni = ["Número de DNI inválido"];
  }
  return errors;
};

export const ClientEdit = (props) => (
  <Edit undoable={false} title="Editar cliente" {...props}>
    <TabbedForm margin="normal" toolbar={<ClientsToolbar />}>
      <FormTab label="persona">
        <NumberInput disabled fullWidth label="DNI" source="dni" />
        <TextInput
          fullWidth
          label="Nombre del cliente"
          source="nombre"
          validate={formValidations.validateText}
        />
        <TextInput
          fullWidth
          label="Apellido del cliente"
          source="apellido"
          validate={formValidations.validateText}
        />
        <DateInput
          fullWidth
          label="Fecha de nacimiento"
          source="fechaNacimiento"
          validate={formValidations.validateRequired}
        />
        <SelectInput
          fullWidth
          label="Estado civil"
          source="estadoCivil"
          choices={estadosCiviles}
          validate={formValidations.validateRequired}
        />
        <PasswordInput fullWidth label="Contraseña" source="password" />
        <NumberInput
          fullWidth
          label="Puntos del cliente"
          source="puntos"
          validate={formValidations.validatePoints}
        />
        <BooleanInput fullWidth label="Cliente activo" source="activo" />
        <FormDataConsumer fullWidth>
          {({ formData, ...rest }) =>
            !formData.activo && (
              <TextInput
                label="Detalle de baja"
                source="motivoBaja"
                {...rest}
              />
            )
          }
        </FormDataConsumer>
      </FormTab>
      <FormTab label="domicilio">
        <TextInput
          fullWidth
          label="Calle"
          source="domicilio.calle"
          validate={formValidations.validateText}
        />
        <NumberInput
          fullWidth
          label="Número"
          source="domicilio.numero"
          validate={formValidations.validateNumber}
        />
        <NumberInput fullWidth label="Piso" source="domicilio.piso" />
        <TextInput
          fullWidth
          label="Departamento"
          source="domicilio.departamento"
        />
        <TextInput
          fullWidth
          label="Barrio"
          source="domicilio.barrio"
          validate={formValidations.validateText}
        />
        <TextInput
          fullWidth
          label="Código Postal"
          source="domicilio.codigoPostal"
          validate={formValidations.validateText}
        />
        <TextInput
          fullWidth
          label="Ciudad"
          source="domicilio.ciudad"
          validate={formValidations.validateText}
        />
        <TextInput
          fullWidth
          label="Localidad"
          source="domicilio.localidad"
          validate={formValidations.validateText}
        />
        <TextInput
          fullWidth
          label="Provincia"
          source="domicilio.provincia"
          validate={formValidations.validateText}
        />
        <TextInput
          fullWidth
          label="País"
          source="domicilio.pais"
          validate={formValidations.validateText}
        />
      </FormTab>
      <FormTab label="contacto">
        <TextInput
          fullWidth
          label="Email"
          source="contacto.email"
          validate={formValidations.validateEmail}
        />
        <TextInput
          fullWidth
          label="Celular"
          source="contacto.celular"
          validate={formValidations.validatePhone}
        />
        <TextInput
          fullWidth
          label="Teléfono"
          source="contacto.telefono"
          validate={formValidations.validatePhone}
        />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export const ClientCreate = (props) => (
  <Create undoable={false} title="Crear nuevo cliente" {...props}>
    <TabbedForm
      margin="normal"
      validate={validateCreation}
      toolbar={<ClientsToolbar />}
    >
      <FormTab label="persona">
        <NumberInput
          fullWidth
          label="DNI"
          source="dni"
          validate={formValidations.validateDni}
        />
        <TextInput
          fullWidth
          label="Nombre del cliente"
          source="nombre"
          validate={formValidations.validateText}
        />
        <TextInput
          fullWidth
          label="Apellido del cliente"
          source="apellido"
          validate={formValidations.validateText}
        />
        <DateInput
          fullWidth
          label="Fecha de nacimiento."
          source="fechaNacimiento"
          validate={formValidations.validateRequired}
        />
        <SelectInput
          fullWidth
          label="Estado civil"
          source="estadoCivil"
          choices={estadosCiviles}
          validate={formValidations.validateRequired}
          defaultValue={"false"}
        />
        <PasswordInput fullWidth label="Contraseña" source="password" />
        <NumberInput
          fullWidth
          label="Puntos del cliente"
          source="puntos"
          validate={formValidations.validatePoints}
        />
        <BooleanInput fullWidth label="Cliente activo" source="activo" />
      </FormTab>
      <FormTab label="domicilio">
        <TextInput
          fullWidth
          label="Calle"
          source="domicilio.calle"
          validate={formValidations.validateText}
        />
        <NumberInput
          fullWidth
          label="Número"
          source="domicilio.numero"
          validate={formValidations.validateNumber}
        />
        <NumberInput fullWidth label="Piso" source="domicilio.piso" />
        <TextInput
          fullWidth
          label="Departamento"
          source="domicilio.departamento"
        />
        <TextInput
          fullWidth
          label="Barrio"
          source="domicilio.barrio"
          validate={formValidations.validateText}
        />
        <TextInput
          fullWidth
          label="Código Postal"
          source="domicilio.codigoPostal"
          validate={formValidations.validateText}
        />
        <TextInput
          fullWidth
          label="Ciudad"
          source="domicilio.ciudad"
          validate={formValidations.validateText}
        />
        <TextInput
          fullWidth
          label="Localidad"
          source="domicilio.localidad"
          validate={formValidations.validateText}
        />
        <TextInput
          fullWidth
          label="Provincia"
          source="domicilio.provincia"
          validate={formValidations.validateText}
        />
        <TextInput
          fullWidth
          label="País"
          source="domicilio.pais"
          validate={formValidations.validateText}
        />
      </FormTab>
      <FormTab label="contacto">
        <TextInput
          fullWidth
          label="Email"
          source="contacto.email"
          validate={formValidations.validateEmail}
        />
        <TextInput
          fullWidth
          label="Celular"
          source="contacto.celular"
          validate={formValidations.validatePhone}
        />
        <TextInput
          fullWidth
          label="Teléfono"
          source="contacto.telefono"
          validate={formValidations.validatePhone}
        />
      </FormTab>
    </TabbedForm>
  </Create>
);
