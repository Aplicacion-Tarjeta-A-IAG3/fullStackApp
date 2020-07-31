import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Tabs, Tab, Typography, Box } from "@material-ui/core";
import MoneyIcon from "@material-ui/icons/Money";
import GetAppIcon from "@material-ui/icons/GetApp";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import ClientMonthlyBalance from "./clients/clientMonthlyBalance";
import ClientPreviousBalances from "./clients/previousBalances";
import ClientProfile from "./clients/clientProfile";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

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
        <Tab
          disabled
          label="Resúmenes anteriores"
          icon={<GetAppIcon />}
          id="client-tab-1"
        />
        <Tab label="Mi Perfil" icon={<PersonPinIcon />} id="client-tab-2" />
      </Tabs>
      <ClientMonthlyBalance
        value={value}
        index={0}
        style={{ minHeight: "400px" }}
      />
      <ClientPreviousBalances
        value={value}
        index={1}
        style={{ minHeight: "400px" }}
      />
      <ClientProfile value={value} index={2} style={{ minHeight: "400px" }} />
    </div>
  );
}
