import * as React from "react";
import {
  CardHeader,
  Divider,
  makeStyles,
  Snackbar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { PasswordInput, SimpleForm, minLength, required } from "react-admin";
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
  const [client, setClient] = React.useState(null);
  const [oldPass, setOldPass] = React.useState(null);
  const [newPass, setNewPass] = React.useState(null);
  const [open, setOpen] = React.useState(false);

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

    const getCLientData = async () => {
      const url = `${apiUrl}/personas?dni=${username}`;

      const result = await fetch(url, requestOptions);
      console.log("response status", result.status);
      if (result.status === 200) {
        try {
          const dataResult = await result.json();
          console.log("CLIENTe? status", dataResult);
          setClient(dataResult[0]);
        } catch (e) {
          console.error("error cliente: ", e.message);
        }
      } else {
        console.error("Ha ocurrido un error al recuperar los datos.");
      }
    };

    getCLientData();
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleOldPassChange = (event) => {
    const pass = event.target.value;
    setOldPass(pass);
  };

  const handleNewPassChange = (event) => {
    const pass = event.target.value;
    setNewPass(pass);
  };

  const apiUrl = "https://african-express.us-e2.cloudhub.io/api/core";

  const headers = {
    "Content-Type": "application/json",
    client_id: localStorage.getItem("clientId"),
    client_secret: localStorage.getItem("clientSecret"),
  };

  const handleUpdatePass = () => {
    const updatedClient = client;
    updatedClient.password = newPass;
    const url = `${apiUrl}/personas`;
    const requestOptions = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(updatedClient),
    };
    setClient(updatedClient);
    fetch(url, requestOptions)
      .then((response) => {
        try {
          let json = response.json();
          // console.log("JSON??", json);
          if (response.status >= 200 && response.status < 300) {
            console.error(response);
          } else {
            // console.log("llega?", json);
            return json;
          }
        } catch (err) {
          console.error("error update password", err.message);
        }
      })
      .then((result) => {
        setNewPass(null);
        setOldPass(null);
        handleClick(null);
      })
      .catch((e) => {
        console.error("error update password", e.message);
      });
  };

  // !! this is necessary to validate values' lengths for NumberInput components
  const validateUpdate = () => {
    const errors = {};
    if (isDefined(client) && client.password !== oldPass) {
      errors.oldPass = ["passNotMatch"];
    }
    if (isDefined(client) && client.password === newPass) {
      errors.newPass = ["sameNewPass"];
    }
    return errors;
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
        <CardHeader title="Mi datos" className={classes.header} />
        <div className={classes.demo}>
          {client && (
            <List style={{ display: "flex" }}>
              <ListItem>
                <ListItemIcon>{/* <InboxIcon /> */}</ListItemIcon>
                <ListItemText
                  primary={`${client.nombre} ${client.apellido}`}
                  secondary="Nombre y apellido"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>{/* <InboxIcon /> */}</ListItemIcon>
                <ListItemText
                  primary={client.contacto.email}
                  secondary="Email"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>{/* <InboxIcon /> */}</ListItemIcon>
                <ListItemText
                  primary={`${client.puntos}`}
                  secondary="Puntos acumulados"
                />
              </ListItem>
            </List>
          )}
        </div>
      </div>
      <Divider />
      <br />
      <div className={classes.form}>
        <SimpleForm save={handleUpdatePass} validate={validateUpdate}>
          <PasswordInput
            label="Contraseña actual"
            source="oldPass"
            required
            fullWidth
            onChange={handleOldPassChange}
            validate={required("Campo obligatorio")}
          />
          <PasswordInput
            label="Contraseña nueva"
            source="newPass"
            required
            fullWidth
            onChange={handleNewPassChange}
            validate={[required("Campo obligatorio"), minLength(4)]}
          />
        </SimpleForm>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            ¡Contraseña actualizada correctamente!
          </Alert>
        </Snackbar>
      </div>
      <Divider />
      <br />
    </div>
  );
}
