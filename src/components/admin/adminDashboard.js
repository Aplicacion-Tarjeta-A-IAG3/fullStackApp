import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Tabs, Tab } from "@material-ui/core";
import MoneyIcon from "@material-ui/icons/Money";
import GetAppIcon from "@material-ui/icons/GetApp";
import Payments from "./payments";
import ArrangePayment from "./payBusiness";

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
        <Tab label="Pagos realizados" icon={<MoneyIcon />} id="client-tab-0" />
        <Tab label="Realizar pago" icon={<GetAppIcon />} id="client-tab-1" />
      </Tabs>
      <Payments value={value} index={0} style={{ minHeight: "400px" }} />
      <ArrangePayment value={value} index={1} style={{ minHeight: "400px" }} />
    </div>
  );
}
