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

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(DATA_URL)
      .then(response => response.json())
      .then(({ features }) => {
        setData(features);
      });

    window.update = () => {
      fetch(DATA_URL)
        .then(response => response.json())
        .then(({ features }) => {
          setData(features);
        });
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
        {data ? <Map data={data} /> : null}
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
