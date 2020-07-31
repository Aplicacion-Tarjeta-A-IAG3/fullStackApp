import * as React from "react";
import {
  CardHeader,
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
    marginBottom: "1em",
  },
  list: { primaryItem: "#000000" },
  form: { backgroundColor: "#f4f4f0", padding: "2em" },
  container: { minHeight: "400px", padding: "1em" },
  info: {
    backgroundColor: "#455A64",
    marginTop: "1em",
  },
  header: {
    backgroundColor: "#455A64",
    color: "#fff",
    marginTop: "1em",
  },
}));

const columns = ["Monto (AR$)", "Comercio", "Detalle", "Fecha"];
const username = localStorage.getItem("username");

export default function ClientMonthlyBalance(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  const [cards, setCards] = React.useState([]);
  const [card, setCard] = React.useState("");
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
      try {
        const dataResult = await result.json();
        if (result.status === 200) {
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
      } catch (e) {
        console.error("error tarjetas: ", e.message);
      }
    };

    const fillCardData = async (tarjeta) => {
      const url = `${apiUrl}/resumenes?tarjeta=${tarjeta}`;

      const result = await fetch(url, requestOptions);
      // console.log("balance status", result.status);
      try {
        const dataResult = await result.json();
        if (result.status === 200) {
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
      } catch (e) {
        console.error("error resumen: ", e.message);
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
    try {
      const dataResult = await result.json();
      if (result.status === 200) {
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
        if (isDefined(consumosDelMes)) {
          setRows(
            consumosDelMes.map(({ monto, comercio, detalle, fecha }) => [
              monto,
              comercio,
              detalle,
              fecha,
            ])
          );
        }
        // console.log("client data:", dataResult);
        // console.log("client pagos:", dataResult.pagos);
      } else {
        console.error(
          `response from the server: ${
            isDefined(dataResult.message) ? dataResult.message : dataResult
          }`
        );
      }
    } catch (e) {
      console.error("error tarjeta: ", e.message);
    }
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`client-tab-${index}`}
      aria-labelledby={`client-tab-${index}`}
      className={classes.container}
      {...other}
    >
      <div className={classes.info}>
        <CardHeader title="Detalles de tu resumen" className={classes.header} />
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
      </div>
      <Divider />
      <br />
      <div className={classes.form}>
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
      </div>
      <Divider />
      <br />
      <MUIDataTable
        title={"Movimientos"}
        data={rows}
        columns={columns}
        options={balanceTableOptions}
      />
    </div>
  );
}
