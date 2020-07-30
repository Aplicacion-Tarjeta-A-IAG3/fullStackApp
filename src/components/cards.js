import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  Button,
  Link,
} from "react-admin";
import CreditCardIcon from "@material-ui/icons/CreditCard";

const ShowStatementsField = ({ record = {} }) => (
  <Button
    component={Link}
    to={{
      pathname: `/tarjetas/${record.id}/mostrar_resumen/${record.tarjeta}`,
    }}
    label="Ver Resumen"
    //disabled={!record.activo}
  >
    <CreditCardIcon />
  </Button>
);

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
      {/* <ShowStatementsField /> */}
    </Datagrid>
  </List>
);
