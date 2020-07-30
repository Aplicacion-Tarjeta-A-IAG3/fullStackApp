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
          netTotal: total.toLocaleString("de-DE", {
            style: "currency",
            currency: "ARS",
          }),
          grossTotal: totalSinComisiones.toLocaleString("de-DE", {
            style: "currency",
            currency: "ARS",
          }),
          fees: totalComisiones.toLocaleString("de-DE", {
            style: "currency",
            currency: "ARS",
          }),
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
        console.error(`response from the server: ${dataResult.message}`);
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
                <ListItemText secondary="Mes" primary={months[resumen.month]} />
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
        options={options}
      />
    </Container>
  );
}
