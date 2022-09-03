import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import "./App.css";
import { Drawer } from "@material-ui/core";
import DrawerComponent from "./components/DrawerComponent";

// const countriesURL = "https://restcountries.eu/rest/v2/all";
const countriesURL = "https://restcountries.com/v3.1/all";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const drawerDirection = "right";

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [drawerState, setDrawerState] = React.useState({
    active: false,
    data: "",
  });
  const classes = useStyles();

  const parseCurrency = (currencies) => {
    let parsedCurrency = {}
    for(const key in currencies) {
      parsedCurrency[key] = `${currencies[key]['symbol']} ${currencies[key]['name']}`
    }

    return parsedCurrency
  }

  const extractAPIData = (countriesData) => {
    const tempCountriesData = countriesData.map((countryData) => {
      const tempCountryData = {};
      const { name, capital, population, region, flags,currencies } = countryData;
      tempCountryData["name"] = name?.common;
      tempCountryData["capital"] = capital?.join();
      tempCountryData["population"] = population;
      tempCountryData["region"] = region;
      tempCountryData["flags"] = flags?.["png"];
      tempCountryData["currencies"] = parseCurrency(currencies);
      return tempCountryData;
    });
    setCountriesData(tempCountriesData);
  };

  const getCountriesWithAxios = async () => {
    const { status, data: countriesData } = await axios.get(countriesURL);
    if (status === 200) {
      extractAPIData(countriesData);
    }
  };

  useEffect(() => {
    getCountriesWithAxios();
  }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Flag</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Capital</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Population</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Region</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {countriesData.map((country) => (
                  <TableRow
                    key={country.name}
                    onClick={() =>
                      setDrawerState({
                        ...drawerState,
                        active: true,
                        data: country,
                      })
                    }
                  >
                    <TableCell component="th" scope="row">
                      {country.capital}
                    </TableCell>
                    <TableCell align="right">
                      <img src={country.flags} alt="" width="32px" />
                    </TableCell>
                    <TableCell align="right">{country.name}</TableCell>
                    <TableCell align="right">{country.population}</TableCell>
                    <TableCell align="right">{country.region}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Drawer
            anchor={drawerDirection}
            open={drawerState.active}
            onClose={() =>
              setDrawerState({
                active: false,
                data: '',
              })
            }
          >
            <DrawerComponent data={drawerState} />
          </Drawer>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
