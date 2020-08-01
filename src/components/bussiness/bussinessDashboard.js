import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Tabs, Tab } from "@material-ui/core";
import MoneyIcon from "@material-ui/icons/Money";
import GetAppIcon from "@material-ui/icons/GetApp";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import BusinessDailyBalance from "./businessDailyBalance";
import BusinessMonthlyBalance from "./businessMonthlyBalance";
import BusinessProfile from "./businessProfile";
import BusinessPreviousBalances from "./previousBalances";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "auto",
    width: "80%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function BusinessDashboard() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        aria-label="business-dashboard"
        centered
      >
        <Tab label="Resumen del día" icon={<MoneyIcon />} id="business-tab-0" />
        <Tab label="Resumen del mes" icon={<MoneyIcon />} id="business-tab-1" />
        <Tab
          disabled
          label="Resúmenes anteriores"
          icon={<GetAppIcon />}
          id="business-tab-2"
        />
        <Tab
          disabled
          label="Mi Perfil"
          icon={<PersonPinIcon />}
          id="business-tab-3"
        />
      </Tabs>
      <BusinessDailyBalance
        value={value}
        index={0}
        style={{ minHeight: "400px" }}
      />
      <BusinessMonthlyBalance
        value={value}
        index={1}
        style={{ minHeight: "400px" }}
      />
      <BusinessPreviousBalances
        value={value}
        index={2}
        style={{ minHeight: "400px" }}
      />
      <BusinessProfile value={value} index={3} style={{ minHeight: "400px" }} />
    </Paper>
  );
}
