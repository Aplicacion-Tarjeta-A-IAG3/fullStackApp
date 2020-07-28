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
    to={{ pathname: `/tarjetas/${record.id}/mostrar_resumen` }}
    label="Ver Resumen"
    //disabled={!record.activo}
  >
    <CreditCardIcon />
  </Button>
);

export const CardList = (props) => (
  <List {...props} exporter={false}>
    <Datagrid>
      <NumberField label="N° Tarjeta" source="tarjeta" />
      <TextField label="Categoría" source="producto" />
      <NumberField label="Limite" source="limite" />
      <NumberField label="Saldo" source="saldo" />
      <TextField label="Vencimiento" source="vencimiento" />
      <ShowStatementsField />
    </Datagrid>
  </List>
);
