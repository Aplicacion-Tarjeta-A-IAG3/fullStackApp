import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  NumberInput,
  FunctionField,
  NumberField,
  DateField,
  Show,
  SimpleShowLayout,
  downloadCSV,
} from "react-admin";
import jsonExport from "jsonexport/dist";

const exporter = (transactions) => {
  const transactionsExport = transactions.map((transaction) => {
    const { persona, tarjeta, comercio, detalle, ...forExport } = transaction; // omit persona, tarjeta, comercio and detalle
    forExport.cliente = `${transaction.persona.nombre} ${transaction.persona.apellido}`;
    forExport.comercio = transaction.comercio.nombre;
    forExport.tarjeta = transaction.tarjeta.numero;
    return forExport;
  });
  jsonExport(
    transactionsExport,
    {
      headers: [
        "id",
        "monto",
        "cuotas",
        "fecha",
        "cliente",
        "comercio",
        "tarjeta",
      ],
    },
    (err, csv) => {
      downloadCSV(csv, "transacciones"); // download as 'transacciones.csv` file
    }
  );
};

export const BalanceList = (props) => (
  <List exporter={exporter} {...props}>
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

export const BalanceShow = (props) => (
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
