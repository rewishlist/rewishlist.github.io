import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
/** @jsx jsx */
import { Global, css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import Map from "./Map.js";

// Source data GeoJSON
const DATA_URL =
  "https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/arc/counties.json"; // eslint-disable-line

const MY_LOCATION = [24.8254933, 60.1866719];

const LOCATION_1 = [24.804905, 60.182799];
const LOCATION_2 = [24.852896, 60.179485];
const LOCATION_3 = [24.934519, 60.16687];

function App() {
  const [data, setData] = useState([
    { from: MY_LOCATION, to: LOCATION_1 },
    { from: MY_LOCATION, to: LOCATION_2 },
    { from: MY_LOCATION, to: LOCATION_3 }
  ]);
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position.coords.latitude, position.coords.longitude);
      });
    }

    window.update = () => {
      setData([
        { from: MY_LOCATION, to: LOCATION_1 },
        { from: MY_LOCATION, to: LOCATION_2, highlighted: true },
        { from: MY_LOCATION, to: LOCATION_3 }
      ]);
    };
  }, []);

  return (
    <AppContainer container spacing={3}>
      <Global styles={GlobalStyles} />
      <Grid item xs={3}>
        <ItemContainer item xs={12}>
          <TextField
            id="outlined-helperText"
            label="Search"
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </ItemContainer>
        <Grid item xs={12}>
          <ItemBox item xs={12}>
            item
          </ItemBox>
          <ItemBox item xs={12}>
            item
          </ItemBox>
        </Grid>
      </Grid>
      <MapContainer item xs={9}>
        {data ? <Map data={data} userLocation={MY_LOCATION} /> : null}
      </MapContainer>
    </AppContainer>
  );
}

const GlobalStyles = {
  html: {
    height: "100%"
  },
  body: {
    margin: 0,
    padding: 0,
    height: "100%"
  },
  "#root": {
    height: "100vh"
  }
};

const AppContainer = styled(Grid)`
  height: 100%;
`;

const ItemContainer = styled(Grid)`
  background: white;
  padding-left: 1rem;
`;
const ItemBox = styled(Grid)``;

const MapContainer = styled(Grid)`
  position: relative;
`;

export default App;
