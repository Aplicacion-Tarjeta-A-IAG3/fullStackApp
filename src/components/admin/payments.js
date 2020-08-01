import * as React from "react";
import {
  CardHeader,
  Divider,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { isDefined, currencyParser } from "../../utils/helpers";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MoneyIcon from "@material-ui/icons/Money";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "360px",
    backgroundColor: theme.palette.background.paper,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "row-reverse",
  },
  formControl: {
    margin: "1em",
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
  table: {
    minWidth: 650,
  },
}));

export default function Payments(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  const [payments, setPayments] = React.useState({ total: 0, pagos: [] });
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const getPaymentsData = async () => {
      const apiUrl = "https://african-express.us-e2.cloudhub.io/api/core/pagos";

      const headers = {
        "Content-Type": "application/json",
        client_id: localStorage.getItem("clientId"),
        client_secret: localStorage.getItem("clientSecret"),
      };
      const requestOptions = {
        method: "GET",
        headers: headers,
      };

      const result = await fetch(apiUrl, requestOptions);
      // console.log("status", result.status);
      try {
        const dataResult = await result.json();
        if (result.status === 200) {
          const { total, pagos } = dataResult;
          setPayments({
            total: currencyParser(total),
            pagos: currencyParser(pagos),
          });
          if (isDefined(pagos)) {
            setRows(
              pagos.map(({ comercio, monto }) => ({
                comercio: isDefined(comercio) ? comercio : "Sin nombre",
                monto: currencyParser(monto),
              }))
            );
          }
          console.log("business data:", payments);
          console.log("business pagos:", pagos);
        } else {
          console.error(
            `response from the server: ${
              isDefined(dataResult.message) ? dataResult.message : dataResult
            }`
          );
          // TODO: add error flash notification
        }
      } catch (e) {
        console.error("error pagos del mes: ", e.message);
      }
    };

    getPaymentsData();
  }, []);

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
        <CardHeader
          title="Pagos realizados a comercios en el mes"
          className={classes.header}
        />
        <div className={classes.demo}>
          <List style={{}}>
            <ListItem>
              <ListItemIcon>
                <MoneyIcon />
              </ListItemIcon>
              <ListItemText
                secondary="Total de pagos"
                primary={payments.total}
              />
            </ListItem>
          </List>
        </div>
        <div className={classes.demo}>
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">Comercio</TableCell>
                  <TableCell align="right">Monto</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={`id-monto-${row.monto}`}>
                    <TableCell align="center" component="th" scope="row">
                      {row.comercio}
                    </TableCell>
                    <TableCell align="right">{row.monto}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Divider />
      <br />
    </div>
  );
}
