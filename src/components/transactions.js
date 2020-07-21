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
  Show,
  SimpleShowLayout,
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

export const TransactionShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <h5>Datos de la transacción</h5>
      <NumberField label="Monto" source="monto" />
      <NumberInput label="Cuotas" fullWidth source="cuotas" />
      <DateField label="Fecha de transacción" source="fecha" />
      <TextField label="Detalle" source="detalle" />
      <h5>Datos del cliente</h5>
      <NumberField label="DNI" source="persona.dni" />
      <TextField label="Nombre" source="persona.nombre" />
      <TextField label="Apellido" source="persona.apellido" />
      <h5>Datos de la tarjeta</h5>
      <NumberField label="Número" source="tarjeta.numero" />
      <DateField label="Vencimiento" source="tarjeta.fechaVencimiento" />
      <h5>Datos del comercio</h5>
      <NumberField label="CUIT" source="comercio.cuit" />
      <TextField label="Nombre" source="comercio.nombre" />
    </SimpleShowLayout>
  </Show>
);

export const TransactionCreate = (props) => (
  <Create title="Postnet virtual" {...props}>
    <SimpleForm>
      <h5>Datos del comercio</h5>
      <NumberInput fullWidth required label="CUIT" source="cuit" />
      <TextInput fullWidth label="Nombre del comercio" source="comercio" />
      <h5>Datos del cliente</h5>
      <NumberInput fullWidth required label="DNI" source="dni" />
      <TextInput fullWidth source="nombre" />
      <TextInput fullWidth source="apellido" />
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
      <h5>Datos de la venta</h5>
      <NumberInput fullWidth required source="monto" />
      <NumberInput fullWidth source="cuotas" />
    </SimpleForm>
  </Create>
);
