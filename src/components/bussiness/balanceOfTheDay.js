import React from "react";
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

const columns = ["Monto", "Cliente", "Fecha de pago", "State"];

const data = [
  ["Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT"],
  ["Bob Herm", "Test Corp", "Tampa", "FL"],
  ["James Houston", "Test Corp", "Dallas", "TX"],
];

const options = {
  filterType: "checkbox",
  pagination: false,
};

export default function BalanceOfTheDay(props) {
  // const classes = useStyles();
  return (
    <Container fullWidth>
      <Card>
        <CardHeader title="Detalles" />
        <CardContent>{"algo: algo"}</CardContent>
      </Card>
      <Divider />
      <MUIDataTable
        title={"Pagos recibidos"}
        data={data}
        columns={columns}
        options={options}
      />
    </Container>
  );
}
