import * as React from "react";
import { CardHeader, Divider, makeStyles, Snackbar } from "@material-ui/core";
import { TextInput, SimpleForm, minLength, required } from "react-admin";
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
  const [errorOpen, setErrorOpen] = React.useState("");
  const [cuit, setCuit] = React.useState(null);
  const [account, setAccount] = React.useState(null);

  const openSuccessAlert = () => {
    setSuccessOpen(true);
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

  const handleProcessPayment = () => {
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

    fetch(apiUrl, requestOptions)
      .then((response) => {
        try {
          let json = response.json();
          // console.log("JSON??", json);
          if (response.status >= 200 && response.status < 300) {
            openErrorAlert(response);
          } else {
            // console.log("llega?", json);
            return json;
          }
        } catch (err) {
          openErrorAlert(err.message);
          console.error("error update password", err.message);
        }
      })
      .then((result) => {
        openSuccessAlert();
      })
      .catch((e) => {
        openErrorAlert(e.message);
        console.error("error update password", e.message);
      });
  };

  const handleCuitChange = (event) => {
    const pass = event.target.value;
    setCuit(pass);
  };

  const handleAccountChange = (event) => {
    const pass = event.target.value;
    setAccount(pass);
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
          <TextInput
            label="CUIT del comecio"
            source="cuit"
            required
            fullWidth
            onChange={handleCuitChange}
            validate={required("emptyValidation")}
          />
          <TextInput
            label="Número de cuenta del comercio"
            source="newPass"
            required
            fullWidth
            onChange={handleAccountChange}
            validate={[required("emptyValidation"), minLength(4)]}
          />
        </SimpleForm>
        <Snackbar
          open={successOpen}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            ¡Pago realizado correctamente!
          </Alert>
        </Snackbar>
        <Snackbar
          open={!!errorOpen}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            {errorOpen}
          </Alert>
        </Snackbar>
      </div>
      <Divider />
      <br />
    </div>
  );
}
