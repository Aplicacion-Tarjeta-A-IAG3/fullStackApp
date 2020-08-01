import * as React from "react";
import { CardHeader, Divider, makeStyles, Snackbar } from "@material-ui/core";
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

export default function ArrangePayment(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [cuit, setCuit] = React.useState(null);
  const [account, setAccount] = React.useState(null);
  const [message, setMessage] = React.useState("");

  const openSuccessAlert = (msg) => {
    setSuccessOpen(msg);
  };

  const openErrorAlert = (msg) => {
    setErrorOpen(msg);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessOpen(false);
    setErrorOpen(false);
  };

  const handleProcessPayment = async () => {
    const apiUrl = "https://african-express.us-e2.cloudhub.io/api/core/pagos";

    const headers = {
      "Content-Type": "application/json",
      client_id: localStorage.getItem("clientId"),
      client_secret: localStorage.getItem("clientSecret"),
    };

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ cuit, cuenta: account }),
    };

    const response = await fetch(apiUrl, requestOptions);
    let json = await response.json();
    if (response.status === 200) {
      const msg = isDefined(json.success)
        ? json.success
        : "Pago realizado con éxito";
      setMessage(msg);
      openSuccessAlert(true);
    } else if (response.status === 406) {
      setMessage(json);
      openErrorAlert(true);
    } else {
      const msg = isDefined(json.message)
        ? json.message
        : "Error del servidor: No se pudo realizar el pago";
      setMessage(msg);
      openErrorAlert(true);
    }
  };

  const handleCuitChange = (event) => {
    const cuit = event.target.value;
    setCuit(parseInt(cuit));
  };

  const handleAccountChange = (event) => {
    const account = event.target.value;
    setAccount(parseInt(account));
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
        <CardHeader title="Realizar un pago" className={classes.header} />
        <SimpleForm save={handleProcessPayment}>
          <NumberInput
            label="CUIT del comecio"
            source="cuit"
            required
            fullWidth
            onChange={handleCuitChange}
            validate={[required("emptyValidation"), number()]}
          />
          <NumberInput
            label="Número de cuenta del comercio"
            source="newPass"
            required
            fullWidth
            onChange={handleAccountChange}
            validate={[required("emptyValidation"), number()]}
          />
        </SimpleForm>
        <Snackbar
          open={successOpen}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            {message}
          </Alert>
        </Snackbar>
        <Snackbar
          open={errorOpen}
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
