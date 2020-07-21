import * as React from "react";
import { List, Datagrid, TextField, BooleanField } from "react-admin";

// "id": 4,
// "nombre": "gold1",
// "tipo": "avanzada",
// "categoria": "gold",
// "requisitos": "ingresos mayores a $60.000",
// "motivoBaja": "",
// "activo": true

export const ProductList = (props) => (
  <List {...props} bulkActionButtons={false} exporter={false}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="nombre" />
      <TextField source="tipo" />
      <TextField source="categoria" />
      <BooleanField source="activo" />
    </Datagrid>
  </List>
);
