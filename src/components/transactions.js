import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  TextInput,
  Create,
  NumberInput,
  SimpleForm,
  DateInput,
  FunctionField,
  NumberField,
  DateField,
} from "react-admin";

export const TransactionList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField label="Tarjeta" source="tarjeta.numero" />
      <FunctionField
        label="Nombre del cliente"
        render={(record) =>
          `${record.persona.nombre} ${record.persona.apellido}`
        }
      />
      <TextField label="Nombre del comercio" source="comercio.nombre" />
      <NumberField label="Monto" source="monto" />
      <DateField label="Fecha de transacción" source="fecha" />
    </Datagrid>
  </List>
);

export const TransactionCreate = (props) => (
  <Create title="Postnet virtual" {...props}>
    <SimpleForm>
      <div>
        <h5>Datos del comercio</h5>
        <NumberInput fullWidth required label="CUIT" source="cuit" />
        <TextInput fullWidth label="Nombre del comercio" source="comercio" />
      </div>
      <div>
        <h5>Datos del cliente</h5>
        <NumberInput fullWidth required label="DNI" source="dni" />
        <TextInput fullWidth source="nombre" />
        <TextInput fullWidth source="apellido" />
      </div>
      <div>
        <h5>Datos de la tarjeta</h5>
        <NumberInput
          fullWidth
          required
          label="Número de tarjeta"
          source="tarjeta"
        />
        <DateInput
          fullWidth
          required
          label="Vencimiento"
          source="vencimiento"
          defaultValue={new Date()}
        />
        <NumberInput fullWidth required label="CVC" source="cvc" />
      </div>
      <div>
        <h5>Datos de la venta</h5>
        <NumberInput fullWidth required source="monto" />
        <NumberInput fullWidth source="cuotas" />
      </div>
    </SimpleForm>
  </Create>
);
