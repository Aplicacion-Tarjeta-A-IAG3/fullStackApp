import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Tabs, Tab } from "@material-ui/core";
import MoneyIcon from "@material-ui/icons/Money";
import GetAppIcon from "@material-ui/icons/GetApp";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import ClientMonthlyBalance from "./clientMonthlyBalance";
// import ClientPreviousBalances from "./previousBalances";
import ClientProfile from "./clientProfile";
import PayMyCard from "./payMyCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "auto",
    width: "80%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ClientsDashboard() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        aria-label="client-dashboard"
        centered
      >
        <Tab label="Resumen del mes" icon={<MoneyIcon />} id="client-tab-0" />
        <Tab label="Pagar tarjetas" icon={<GetAppIcon />} id="client-tab-1" />
        <Tab label="Mi Perfil" icon={<PersonPinIcon />} id="client-tab-2" />
      </Tabs>
      <ClientMonthlyBalance
        value={value}
        index={0}
        style={{ minHeight: "400px" }}
      />
      <PayMyCard value={value} index={1} style={{ minHeight: "400px" }} />
      <ClientProfile value={value} index={2} style={{ minHeight: "400px" }} />
    </div>
  );
}
