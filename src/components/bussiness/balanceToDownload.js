import * as React from "react";
import moment from "moment";
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

const columns = ["Id", "Monto", "Tipo", "Detalle del movimiento", "Fecha"];

// TODO: delete this example
// const data = [
//   [109, "3000 ARS", "Julia Espinoza", "compra", "2020-07-23"],
//   [110, "-1500 ARS", "African Express", "comisiones", "2020-07-23"],
//   [111, "120 ARS", "Julia Espinoza", "compra", "2020-07-24"],
//   [157, "350 ARS", "Julia Espinoza", "compra", "2020-07-27"],
// ];

const options = {
  filterType: "checkbox",
  pagination: false,
};

const months = {
  1: "Enero",
  2: "Febrero",
  3: "Marzo",
  4: "Abril",
  5: "Mayo",
  6: "Junio",
  7: "Julio",
  8: "Agosto",
  9: "Septiembre",
  10: "Octubre",
  11: "Noviembre",
  12: "Diciembre",
};

const Item = (props) => {
  const { icon, title, value } = props;

  return (
    <ListItem>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText secondary={title} primary={value} />
    </ListItem>
  );
};

const username = localStorage.getItem("username");

export default function BalanceToDownload(props) {
  const classes = useStyles();
  const [resumen, setResumen] = React.useState({
    isBalance: false,
    month: 0,
    netTotal: 0,
    grossTotal: 0,
    fees: 0,
  });
  const [rows, setRows] = React.useState([]);
  const [date, setDate] = React.useState(moment().format("YYYY-mm-dd"));

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
      if (result.status === 200) {
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
          month: resumenDelMes,
          netTotal: total,
          grossTotal: totalSinComisiones,
          fees: totalComisiones,
        });
        setRows(
          pagos.map(({ id, monto, tipoTransaccion, detalle, fecha }) => [
            id,
            monto,
            tipoTransaccion,
            detalle,
            fecha,
          ])
        );
        // console.log("business data:", dataResult);
        // console.log("business pagos:", dataResult.pagos);
      } else {
        console.error(`response from the server: ${dataResult.message}`);
        // TODO: add error flash notification
      }
    };

    fillBusinessData();
  }, []);

  return (
    <Container fullwidth>
      <Card>
        <CardHeader title="Resumen" />
        <CardContent>
          <div className={classes.demo}>
            <List style={{ display: "flex" }}>
              <Item
                icon={<TodayIcon />}
                title={"Mes"}
                value={months[resumen.month]}
              />
              <Item
                icon={<LibraryBooksIcon />}
                title={"Total de transacciones"}
                value={resumen.grossTotal}
              />
              <Item
                icon={<Rotate90DegreesCcwIcon />}
                title={"Total de comisiones"}
                value={resumen.fees}
              />
              <Item
                icon={<MoneyIcon />}
                title={"Total a recibir"}
                value={resumen.netTotal}
              />
            </List>
          </div>
          <div className={classes.demo}>{"Agregar date picker"}</div>
        </CardContent>
      </Card>
      <Divider />
      <MUIDataTable
        title={"Movimientos"}
        data={rows}
        columns={columns}
        options={options}
      />
    </Container>
  );
}
