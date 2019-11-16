import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
/** @jsx jsx */
import { Global, css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import Map from "./Map";
import ItemBox from "./ItemBox";
import Fuse from "fuse.js";
import qs from "qs";

const OPTIONS = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["title", "description"]
};

// Source data GeoJSON
const DATA_URL =
  "https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/arc/counties.json"; // eslint-disable-line

const MY_LOCATION = [24.8254933, 60.1866719];

const LOCATION_1 = [24.804905, 60.182799];
const LOCATION_2 = [24.852896, 60.179485];
const LOCATION_3 = [24.934519, 60.16687];

const ITEMS = [
  {
    title: "TOM WOOD",
    description: "metallic coin pendant sterling silver necklace",
    price: 317,
    image:
      "https://cdn-images.farfetch-contents.com/14/59/99/17/14599917_23150502_1000.jpg",
    deadline: 100
  },
  {
    title: "AMI PARIS",
    description: "Low Top Trainers",
    price: 306,
    image:
      "https://cdn-images.farfetch-contents.com/13/20/77/56/13207756_21549202_1000.jpg",
    deadline: 100
  },
  {
    title: "TOM WOOD",
    description: "silver Ice band ring",
    price: 388,
    image:
      "https://cdn-images.farfetch-contents.com/13/54/98/80/13549880_17274963_1000.jpg",
    deadline: false
  }
];

const LOCATIONS = [
  { from: MY_LOCATION, to: LOCATION_1 },
  { from: MY_LOCATION, to: LOCATION_2 },
  { from: MY_LOCATION, to: LOCATION_3 }
];

function App() {
  const [search, setSearch] = useState(null);
  const [data, setData] = useState([]);
  var fuse = new Fuse(ITEMS, OPTIONS);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {});
    }

    setTimeout(() => {
      setData(LOCATIONS);
    }, 2000);
  }, []);

  const onHover = key => {
    return () => {
      const newLocations = LOCATIONS.map((item, itemKey) =>
        key === itemKey ? { ...item, highlighted: true } : { ...item }
      );
      setData(newLocations);
    };
  };

  const onLeave = () => {
    setData([...LOCATIONS]);
  };

  // const onChange = event => {
  //   console.log("value", event.target.value);
  //   setSearch(event.target.value);
  //   console.log("search", search);
  // };

  const userItem = getUserItem();

  return (
    <AppContainer container spacing={3}>
      <Global styles={GlobalStyles} />
      <Grid item xs={3}>
        <ItemContainer item xs={12}>
          <TextField
            // onChange={onChange}
            id="outlined-helperText"
            label="Search"
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </ItemContainer>
        <Grid item xs={12}>
          {userItem && (
            <ItemBox
              onHoverEnter={onHover("user")}
              onHoverLeave={onLeave}
              {...userItem}
            />
          )}
          {ITEMS.map((item, key) => (
            <ItemBox
              onHoverEnter={onHover(key)}
              onHoverLeave={onLeave}
              {...item}
            />
          ))}
          {/* {(search ? fuse.search(search) : ITEMS).map((item, key) => (
            // <ItemBox
            //   onHoverEnter={onHover(key)}
            //   onHoverLeave={onLeave}
            //   {...item}
            // />
          ))} */}
        </Grid>
      </Grid>
      <MapContainer item xs={9}>
        <Map data={data} userLocation={MY_LOCATION} />
      </MapContainer>
    </AppContainer>
  );
}

function getUserItem() {
  console.log(qs.parse(window.location.search.substr(1)));
}

const GlobalStyles = {
  html: {
    height: "100%"
  },
  body: {
    margin: 0,
    padding: 0,
    height: "100%",
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`
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

const MapContainer = styled(Grid)`
  position: relative;
`;

export default App;
