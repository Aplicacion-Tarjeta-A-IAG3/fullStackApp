import * as React from "react";
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import TodayIcon from "@material-ui/icons/Today";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import Rotate90DegreesCcwIcon from "@material-ui/icons/Rotate90DegreesCcw";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import MoneyIcon from "@material-ui/icons/Money";
import {
  currencyParser,
  balanceTableOptions,
  isDefined,
} from "../../utils/helpers";
// import { businessBalanceProvider } from "../../models/balanceProvider"; // TODO: use request from provider

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
}));
const columns = [
  "Monto (AR$)",
  "Tipo",
  "Detalle",
  "Fecha ingreso venta",
  "Fecha a depositar",
];
const username = localStorage.getItem("username");

export default function BusinessDailyBalance(props) {
  const classes = useStyles();
  const [resumen, setResumen] = React.useState({
    day: "-",
    netTotal: 0,
    grossTotal: 0,
    fees: 0,
    payDay: "-",
  });
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const fillBusinessData = async () => {
      const apiUrl = "https://african-express.us-e2.cloudhub.io/api/core";

      const headers = {
        "Content-Type": "application/json",
        client_id: localStorage.getItem("clientId"),
        client_secret: localStorage.getItem("clientSecret"),
      };
      const requestOptions = {
        method: "GET",
        headers: headers,
      };

      const url = `${apiUrl}/transacciones/diario?cuit=${username}`;

      const result = await fetch(url, requestOptions);
      console.log("status", result.status);
      const dataResult = await result.json();
      console.log("json", dataResult);
      console.log("length", dataResult.length);
      if (result.status === 200 && result.length !== null) {
        const {
          movimientosDelDia,
          total,
          totalComisiones,
          totalSinComisiones,
          fechaPago,
          pagos,
        } = dataResult;
        setResumen({
          day: isDefined(movimientosDelDia) ? movimientosDelDia : "-",
          netTotal: currencyParser(total),
          grossTotal: currencyParser(totalSinComisiones),
          fees: currencyParser(totalComisiones),
          payDay: isDefined(fechaPago) ? fechaPago : "-",
        });
        setRows(
          pagos.map(({ monto, tipoTransaccion, detalle, fecha }) => [
            monto,
            tipoTransaccion,
            detalle,
            fecha,
            isDefined(fechaPago) ? fechaPago : "-",
          ])
        );
        // console.log("business data:", dataResult);
        // console.log("business pagos:", dataResult.pagos);
      } else {
        console.error(
          `response from the server: ${
            isDefined(dataResult.message) ? dataResult.message : dataResult
          }`
        );
        // TODO: add error flash notification
      }
    };

    fillBusinessData();
  }, []);

  return (
    <Container fullwidth>
      <Card>
        <CardHeader
          title="Detalles de tu resumen"
          style={{ backgroundColor: "#455A64", color: "#fff" }}
        />
        <CardContent>
          <div className={classes.demo}>
            <List style={{ display: "flex" }}>
              <ListItem>
                <ListItemIcon>
                  <TodayIcon />
                </ListItemIcon>
                <ListItemText secondary="Hoy" primary={resumen.day} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText
                  secondary="Total en movimientos"
                  primary={resumen.grossTotal}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Rotate90DegreesCcwIcon />
                </ListItemIcon>
                <ListItemText secondary="Comisiones" primary={resumen.fees} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <MoneyIcon />
                </ListItemIcon>
                <ListItemText
                  secondary="Total a depositar"
                  primary={resumen.netTotal}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EventAvailableIcon />
                </ListItemIcon>
                <ListItemText
                  secondary="Fecha a depositar"
                  primary={resumen.payDay}
                />
              </ListItem>
            </List>
          </div>
        </CardContent>
      </Card>
      <Divider />
      <br />
      <MUIDataTable
        title={"Movimientos"}
        data={rows}
        columns={columns}
        options={balanceTableOptions}
      />
    </Container>
  );
}
