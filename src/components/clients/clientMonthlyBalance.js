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
  Select,
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

const options = {
  filterType: "checkbox",
  pagination: false,
  selectableRows: "none",
  textLabels: {
    body: {
      noMatch: "No se encontraron registros",
      toolTip: "Ordenar",
      columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
    },
    pagination: {
      next: "Siguiente",
      previous: "Anterior",
      rowsPerPage: "Filas por página:",
      displayRows: "de",
    },
    toolbar: {
      search: "Buscar",
      downloadCsv: "Descargar CSV",
      print: "Imprimir",
      viewColumns: "Ver Columnas",
      filterTable: "Filtrar Tabla",
    },
    filter: {
      all: "Todos",
      title: "FILTROS",
      reset: "LIMPIAR FILTROS",
    },
    viewColumns: {
      title: "Mostrar Columnas",
      titleAria: "Mostrar/Esconder Columnas",
    },
    selectedRows: {
      text: "filas(s) seleccionadas",
      delete: "Borrar",
      deleteAria: "Borrar Filas Seleccionadas",
    },
  },
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
      if (result.status === 200) {
        setCards(dataResult);
        setCard(dataResult[0].tarjeta);
        // console.log("client data:", dataResult);
        // console.log("client pagos:", dataResult[0]);
        fillCardData(dataResult[0].tarjeta);
      } else {
        console.log(`response from the server: ${dataResult.message}`);
      }
    };

    const fillCardData = async (tarjeta) => {
      const url = `${apiUrl}/resumenes?tarjeta=${tarjeta}`;

      const result = await fetch(url, requestOptions);
      // console.log("balance status", result.status);
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
          month: resumenDelMes,
          monthTotal: totaldelMes,
          debtTotal: totalAdeudado,
          myPoints: totalPuntosMes.puntos,
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
        console.log(`response from the server: ${dataResult.message}`);
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
    if (result.status === 200) {
      const {
        totalPuntosMes,
        resumenDelMes,
        totalAdeudado,
        totaldelMes,
        consumosDelMes,
      } = dataResult;
      setResumen({
        month: resumenDelMes,
        monthTotal: totaldelMes.toLocaleString("de-DE", {
          style: "currency",
          currency: "ARS",
        }),
        debtTotal: totalAdeudado.toLocaleString("de-DE", {
          style: "currency",
          currency: "ARS",
        }),
        myPoints: totalPuntosMes.puntos,
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
      console.log(`response from the server: ${dataResult.message}`);
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
                <ListItemText secondary="Mes" primary={months[resumen.month]} />
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
        options={options}
      />
    </Container>
  );
}
