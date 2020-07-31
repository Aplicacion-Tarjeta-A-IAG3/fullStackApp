import React from "react";

export default function BusinessProfile(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`client-tab-${index}`}
      aria-labelledby={`client-tab-${index}`}
      style={{ minHeight: "40s0px" }}
      {...other}
    >
      Resumenes
    </div>
  );
}
