import * as React from "react";
import { List, Datagrid, TextField, NumberField } from "react-admin";

export const CardList = (props) => (
  <List
    {...props}
    exporter={false}
    bulkActionButtons={false}
    pagination={false}
  >
    <Datagrid>
      <TextField label="N° Tarjeta" source="tarjeta" />
      <TextField label="Categoría" source="producto" />
      <NumberField
        label="Limite"
        source="limite"
        options={{
          style: "currency",
          currency: "ARS",
          significantDigits: 2,
        }}
      />
      <NumberField
        label="Saldo"
        source="saldo"
        options={{
          style: "currency",
          currency: "ARS",
          significantDigits: 2,
        }}
      />
      <TextField label="Vencimiento" source="vencimiento" />
    </Datagrid>
  </List>
);
