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
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

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

// Add more items
const ITEMS = [
  {
    title: "ACNE STUDIOS",
    description: "x Fjällräven Reversible down jacket",
    price: 1100,
    image:
      "https://cdn-images.farfetch-contents.com/13/48/73/95/13487395_15884280_1000.jpg",
    deadline: 10000
  },
  {
    title: "TOM WOOD",
    description: "metallic coin pendant sterling silver necklace",
    price: 317,
    image:
      "https://cdn-images.farfetch-contents.com/14/59/99/17/14599917_23150502_1000.jpg",
    deadline: 10000
  }
  // {
  //   title: "AMI PARIS",
  //   description: "Low Top Trainers",
  //   price: 306,
  //   image:
  //     "https://cdn-images.farfetch-contents.com/13/20/77/56/13207756_21549202_1000.jpg",
  //   deadline: 10000
  // }
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
  const userItem = getUserItem();

  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {});
    }
    setTimeout(() => {
      setData(LOCATIONS);
    }, 3000);
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
        {/* Scrollable GRID */}
        <Grid item xs={12}>
          {userItem && (
            <ItemBox
              onHoverEnter={onHover(0)}
              onHoverLeave={onLeave}
              onClick={() => {
                console.log("open modal");
                setModalOpen(true);
              }}
              {...userItem}
            />
          )}
          <div
            css={css`
              margin-top: 1rem;
              padding: 2rem 1rem 1rem;
            `}
          >
            You also may like:
          </div>
          {/* Add HR line */}
          {ITEMS.map((item, key) => (
            <ItemBox
              onHoverEnter={onHover(key + 1)}
              onHoverLeave={onLeave}
              onClick={() => {
                console.log("open modal");
                setModalOpen(true);
              }}
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
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isModalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <ModalInner>
          <h2 id="simple-modal-title">Are sure want to buy this item?</h2>
          <p id="simple-modal-description">
            You will need to ship this item yourself
          </p>
          <ModalButton
            css={css`
              margin-top: 3rem !important;
            `}
            variant="outlined"
            onClick={() => {
              setModalOpen(false);
            }}
          >
            PAY
          </ModalButton>
        </ModalInner>
      </Modal>
    </AppContainer>
  );
}

function getUserItem() {
  const query = qs.parse(window.location.search.substr(1));

  if (query.product_json) {
    const userItem = JSON.parse(query.product_json);

    console.log(userItem);
    return {
      title: userItem.brand,
      description: userItem.title,
      price: userItem.price,
      image: userItem.image_url,
      deadline: 10000,
      isUserItem: true
    };
  } else {
    return null;
  }
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

const ModalButton = styled(Button)`
  margin: 0 auto;
`;

const ModalInner = styled.div`
  background: white;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40vw;
  height: 30vh;
  outline: none;
`;

export default App;
