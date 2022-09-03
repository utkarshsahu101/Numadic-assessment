import React from "react";
import { Box } from "@mui/material";

const DrawerComponent = ({ data }) => {
  const getCurrencyList = (currencies) => {
    if (currencies)
      return Object.values(currencies).map((currency) => currency);
  };

  return (
    <Box sx={{ width: "auto", padding: "20px 10px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src={data.data.flags} alt="" width="70px" height="50px" />
        <div style={{ fontSize: "20px", fontWeight: "600" }}>
          {data.data.name}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          marginTop: "18px",
        }}
      >
        <div>Capital: {data.data.capital}</div>
        <div>CurrencyList: {getCurrencyList(data.data.currencies)}</div>
        <div>Population: {data.data.population}</div>
        <div>Region: {data.data.region}</div>
      </div>
    </Box>
  );
};

export default DrawerComponent;
