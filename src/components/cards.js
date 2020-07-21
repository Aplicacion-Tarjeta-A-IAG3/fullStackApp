import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  FunctionField,
  NumberField,
  Button,
  Link,
} from "react-admin";
import CreditCardIcon from "@material-ui/icons/CreditCard";

const ShowStatementsField = ({ record = {} }) => (
  <Button
    component={Link}
    to={{ pathname: `/tarjetas/${record.id}/mostrar_resumenes` }}
    label="Mostrar Resumenes"
    //disabled={!record.activo}
  >
    <CreditCardIcon />
  </Button>
);
/* <Card>
      <CardHeader title="Datos Usuario" />
      <CardContent style={{ display: "flex" }}>
        <div style={{ width: "30%" }}>
          <FunctionField
            label="Nombre completo"
            render={(record) => `${record.nombre} ${record.apellido}`}
          />
          <EmailField source="contacto.mail" />
        </div>
        <div style={{ width: "30%" }}>
          <b>DNI </b>
          <NumberField label="DNI" source="dni" />
        </div>
        <div style={{ width: "30%" }}>
          <b>Dirección </b>
          Avenida Santa Fe Nº 234, Piso 1, Dpto A
        </div>
      </CardContent>
    </Card>*/
export const CardsDataList = (props) => (
  <List {...props} exporter={false}>
    <Datagrid>
      <TextField source="id" />
      <NumberField label="N° Tarjeta" source="tarjeta" />
      <TextField label="Categoría" source="producto" />
      <NumberField label="Limite" source="limite" />
      <NumberField label="Saldo" source="saldo" />
      <TextField label="Vencimiento" source="vencimiento" />
      <ShowStatementsField />
    </Datagrid>
  </List>
);
