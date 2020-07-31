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
import MoneyIcon from "@material-ui/icons/Money";
import {
  currencyParser,
  monthsMapper,
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

const columns = ["Monto (AR$)", "Tipo", "Detalle", "Fecha"];
const username = localStorage.getItem("username");

export default function BusinessMonthlyBalance(props) {
  const classes = useStyles();
  const [resumen, setResumen] = React.useState({
    isBalance: false,
    month: 0,
    netTotal: 0,
    grossTotal: 0,
    fees: 0,
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

      const url = `${apiUrl}/resumenes?cuit=${username}`;

      const result = await fetch(url, requestOptions);
      console.log("status", result.status);
      const dataResult = await result.json();
      if (result.status === 200 && result.length !== null) {
        const {
          esResumen,
          resumenDelMes,
          total,
          totalComisiones,
          totalSinComisiones,
          pagos,
        } = dataResult;
        setResumen({
          isBalance: esResumen,
          month: isDefined(resumenDelMes) ? resumenDelMes : 0,
          netTotal: currencyParser(total),
          grossTotal: currencyParser(totalSinComisiones),
          fees: currencyParser(totalComisiones),
        });
        setRows(
          pagos.map(({ monto, tipoTransaccion, detalle, fecha }) => [
            monto,
            tipoTransaccion,
            detalle,
            fecha,
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
                <ListItemText
                  secondary="Mes"
                  primary={monthsMapper[resumen.month]}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText
                  secondary="Total de transacciones"
                  primary={resumen.grossTotal}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Rotate90DegreesCcwIcon />
                </ListItemIcon>
                <ListItemText
                  secondary="Total de comisiones"
                  primary={resumen.fees}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <MoneyIcon />
                </ListItemIcon>
                <ListItemText
                  secondary="Total a recibir"
                  primary={resumen.netTotal}
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
