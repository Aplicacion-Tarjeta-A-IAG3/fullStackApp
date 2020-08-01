import * as React from "react";
import {
  CardHeader,
  Divider,
  makeStyles,
  Snackbar,
  FormControl,
  InputLabel,
  NativeSelect,
  FormHelperText,
} from "@material-ui/core";
import { NumberInput, SimpleForm, required, number } from "react-admin";
import MuiAlert from "@material-ui/lab/Alert";
import { isDefined } from "../../utils/helpers";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "360px",
    backgroundColor: theme.palette.background.paper,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
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
}));

const username = localStorage.getItem("username");

export default function ClientProfile(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  const [card, setCard] = React.useState("");
  const [account, setAccount] = React.useState(null);
  const [total, setTotal] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [successAlert, setSuccessAlert] = React.useState(false);
  const [errorAlert, setErrorAlert] = React.useState(false);
  const [message, setMessage] = React.useState(false);

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
      console.log("response status", result.status);
      if (result.status === 200) {
        try {
          const dataResult = await result.json();
          console.log("CLIENTe? status", dataResult);
          setCards(dataResult);
          setCard(dataResult[0].tarjeta);
        } catch (e) {
          console.error("error cliente: ", e.message);
        }
      } else {
        console.error("Ha ocurrido un error al recuperar los datos.");
      }
    };

    getCardsData();
  }, []);

  const handleTarjetaChange = (event) => {
    const tarjeta = event.target.value;
    setCard(parseInt(tarjeta));
  };

  const handleCuentaChange = (event) => {
    const cuenta = event.target.value;
    setAccount(parseInt(cuenta));
  };

  const handleMontoChange = (event) => {
    const monto = event.target.value;
    setTotal(parseFloat(monto));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessAlert(false);
    setErrorAlert(false);
  };

  const apiUrl = "https://african-express.us-e2.cloudhub.io/api/core";

  const headers = {
    "Content-Type": "application/json",
    client_id: localStorage.getItem("clientId"),
    client_secret: localStorage.getItem("clientSecret"),
  };

  const handlePayCard = async () => {
    const url = `${apiUrl}/pagos/tarjeta`;
    const requestOptions = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify({ tarjeta: card, cuenta: account, total: total }),
    };

    const response = await fetch(url, requestOptions);
    let json = await response.json();
    if (response.status === 200) {
      const msg = isDefined(json.success)
        ? json.success
        : "Pago realizado con éxito";
      setMessage(msg);
      setSuccessAlert(true);
    } else if (response.status === 406) {
      setMessage(json);
      setErrorAlert(true);
    } else {
      const msg = isDefined(json.message)
        ? json.message
        : "Error del servidor: No se pudo realizar el pago";
      setMessage(msg);
      setErrorAlert(true);
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
      <div className={classes.form}>
        <CardHeader title="Realizar pago" className={classes.header} />
        <SimpleForm save={handlePayCard}>
          <FormControl className={classes.formControl}>
            <InputLabel shrink htmlFor="age-native-label-placeholder">
              Tus tarjetas
            </InputLabel>
            <NativeSelect
              value={card}
              onChange={handleTarjetaChange}
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
                  >{`${card.producto} (Consumos: ${card.consumos})`}</option>
                ))}
            </NativeSelect>
            <FormHelperText>{`Tarjeta seleccionada Nro. ${card}`}</FormHelperText>
          </FormControl>
          <NumberInput
            label="Tu número de cuenta bancaria"
            source="account"
            required
            fullWidth
            onChange={handleCuentaChange}
            validate={[required("emptyValidation"), number()]}
          />
          <NumberInput
            label="Monto a pagar"
            source="monto"
            required
            fullWidth
            onChange={handleMontoChange}
            validate={[required("emptyValidation"), number()]}
          />
        </SimpleForm>
        <Snackbar
          open={successAlert}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            {message}
          </Alert>
        </Snackbar>
        <Snackbar
          open={errorAlert}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            {message}
          </Alert>
        </Snackbar>
      </div>
      <Divider />
      <br />
    </div>
  );
}
