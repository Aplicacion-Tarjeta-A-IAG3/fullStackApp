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
  FormControl,
  InputLabel,
  NativeSelect,
  FormHelperText,
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

const columns = ["Monto (AR$)", "Comercio", "Detalle", "Fecha"];
const username = localStorage.getItem("username");

export default function ClientMonthlyBalance(props) {
  const classes = useStyles();
  const [cards, setCards] = React.useState([]);
  const [card, setCard] = React.useState(null);
  const [resumen, setResumen] = React.useState({
    isBalance: false,
    month: 0,
    netTotal: 0,
    grossTotal: 0,
    fees: 0,
  });
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
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

    const getCardsData = async () => {
      const url = `${apiUrl}/tarjetas?dni=${username}`;

      const result = await fetch(url, requestOptions);
      console.log("cards status", result.status);
      const dataResult = await result.json();
      if (result.status === 200 && result.length !== 0) {
        setCards(dataResult);
        setCard(dataResult[0].tarjeta);
        // console.log("client data:", dataResult);
        // console.log("client pagos:", dataResult[0]);
        fillCardData(dataResult[0].tarjeta);
      } else {
        console.error(
          `response from the server: ${
            isDefined(dataResult.message) ? dataResult.message : dataResult
          }`
        );
      }
    };

    const fillCardData = async (tarjeta) => {
      const url = `${apiUrl}/resumenes?tarjeta=${tarjeta}`;

      const result = await fetch(url, requestOptions);
      // console.log("balance status", result.status);
      const dataResult = await result.json();
      if (result.status === 200 && result.length > 0) {
        const {
          totalPuntosMes,
          resumenDelMes,
          totalAdeudado,
          totaldelMes,
          consumosDelMes,
        } = dataResult;
        setResumen({
          month: isDefined(resumenDelMes) ? resumenDelMes : 0,
          monthTotal: currencyParser(totaldelMes),
          debtTotal: currencyParser(totalAdeudado),
          myPoints: isDefined(totalPuntosMes) ? totalPuntosMes.puntos : "-",
        });
        setRows(
          consumosDelMes.map(({ monto, comercio, detalle, fecha }) => [
            monto,
            comercio,
            detalle,
            fecha,
          ])
        );
        // console.log("client data:", dataResult);
        // console.log("client pagos:", dataResult.pagos);
      } else {
        console.error(
          `response from the server: ${
            isDefined(dataResult.message) ? dataResult.message : dataResult
          }`
        );
        // TODO: add error flash notification
      }
    };

    getCardsData();
  }, []);

  const handleChange = (event) => {
    const tarjeta = event.target.value;
    // console.log("TARJETA??", tarjeta);
    setCard(tarjeta);
    getCardBalance(tarjeta);
  };

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

  const getCardBalance = async (tarjeta) => {
    const url = `${apiUrl}/resumenes?tarjeta=${tarjeta}`;
    const result = await fetch(url, requestOptions);
    // console.log("balance status", result.status);
    const dataResult = await result.json();
    if (result.status === 200 && result.length > 0) {
      const {
        totalPuntosMes,
        resumenDelMes,
        totalAdeudado,
        totaldelMes,
        consumosDelMes,
      } = dataResult;
      setResumen({
        month: isDefined(resumenDelMes) ? resumenDelMes : 0,
        monthTotal: currencyParser(totaldelMes),
        debtTotal: currencyParser(totalAdeudado),
        myPoints: isDefined(totalPuntosMes) ? totalPuntosMes.puntos : "-",
      });
      setRows(
        consumosDelMes.map(({ monto, comercio, detalle, fecha }) => [
          monto,
          comercio,
          detalle,
          fecha,
        ])
      );
      // console.log("client data:", dataResult);
      // console.log("client pagos:", dataResult.pagos);
    } else {
      console.error(
        `response from the server: ${
          isDefined(dataResult.message) ? dataResult.message : dataResult
        }`
      );
      // TODO: add error flash notification
    }
  };

  return (
    <Container>
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
                  secondary="Total de movimientos"
                  primary={resumen.monthTotal}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Rotate90DegreesCcwIcon />
                </ListItemIcon>
                <ListItemText
                  secondary="Total adeudado"
                  primary={resumen.debtTotal}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <MoneyIcon />
                </ListItemIcon>
                <ListItemText
                  secondary="Puntos acumulados del mes"
                  primary={resumen.myPoints}
                />
              </ListItem>
            </List>
          </div>
        </CardContent>
      </Card>
      <Divider />
      <br />
      <Card style={{ backgroundColor: "#f4f4f0" }}>
        <CardContent>
          <FormControl className={classes.formControl}>
            <InputLabel shrink htmlFor="age-native-label-placeholder">
              Tus tarjetas
            </InputLabel>
            <NativeSelect
              value={card}
              onChange={handleChange}
              inputProps={{
                name: "age",
                id: "age-native-label-placeholder",
              }}
            >
              {cards.length > 0 &&
                cards.map((card) => (
                  <option
                    key={card.tarjeta}
                    value={card.tarjeta}
                  >{`${card.producto} (Límite: ${card.limite})`}</option>
                ))}
            </NativeSelect>
            <FormHelperText>{`Tarjeta seleccionada Nro. ${card}`}</FormHelperText>
          </FormControl>
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
