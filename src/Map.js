/* global fetch */
import React, { Component } from "react";
import { render } from "react-dom";
import { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { GeoJsonLayer, ArcLayer } from "@deck.gl/layers";
import { scaleQuantile } from "d3-scale";

// Set your mapbox token here
const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZ2FyeWFuaWtpbiIsImEiOiJjazMxa2M4aW8wNzhzM2JwOWdiYW94dmZqIn0.41wPlZxL13A9TVP2hkF9Zw";

const DEFAULT_COLOR = [130, 130, 130];
const HIGHLIGHTED_COLOR = [255, 136, 0];
const USER_ITEM_COLOR = [255, 81, 100];

const INITIAL_VIEW_STATE = {
  zoom: 11,
  maxZoom: 15,
  pitch: 30,
  bearing: 30
};

/* eslint-disable react/no-deprecated */
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // hoveredCounty: null,
      // Set default selection to San Francisco
      // selectedCounty: null,
      isMounted: false
    };
    // this._onHoverCounty = this._onHoverCounty.bind(this);
    // this._onSelectCounty = this._onSelectCounty.bind(this);
    // this._renderTooltip = this._renderTooltip.bind(this);
  }

  // componentDidMount() {
  //   if (!this.state.isMounted) {
  //     this.setState({ isMounted: true });
  //     this._recalculateArcs(this.props.data);
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.data !== this.props.data && this.state.isMounted) {
  //     this._recalculateArcs(nextProps.data);
  //   }
  // }

  // _onHoverCounty({ x, y, object }) {
  //   this.setState({ x, y, hoveredCounty: object });
  // }

  // _onSelectCounty({ object }) {
  //   this._recalculateArcs(this.props.data, object);
  // }

  // _renderTooltip() {
  //   const { x, y, hoveredCounty } = this.state;
  //   return (
  //     hoveredCounty && (
  //       <div className="tooltip" style={{ left: x, top: y }}>
  //         {hoveredCounty.properties.name}
  //       </div>
  //     )
  //   );
  // }

  // _recalculateArcs(data, selectedCounty = this.state.selectedCounty) {
  //   if (!data) {
  //     return;
  //   }
  //   if (!selectedCounty) {
  //     selectedCounty = data.find(f => f.properties.name === "Los Angeles, CA");
  //   }
  //   const { flows, centroid } = selectedCounty.properties;

  //   const arcs = Object.keys(flows).map(toId => {
  //     const f = data[toId];
  //     return {
  //       source: centroid,
  //       target: f.properties.centroid,
  //       value: flows[toId]
  //     };
  //   });

  //   const scale = scaleQuantile()
  //     .domain(arcs.map(a => Math.abs(a.value)))
  //     .range(inFlowColors.map((c, i) => i));

  //   arcs.forEach(a => {
  //     a.gain = Math.sign(a.value);
  //     a.quantile = scale(Math.abs(a.value));
  //   });

  //   if (this.props.onSelectCounty) {
  //     this.props.onSelectCounty(selectedCounty);
  //   }

  //   this.setState({ arcs, selectedCounty });
  // }

  _renderLayers() {
    const { data, strokeWidth = 4 } = this.props;

    return [
      new ArcLayer({
        id: "arc",
        data,
        coef: 0.5,
        getSourcePosition: d => d.from,
        getTargetPosition: d => d.to,
        getSourceColor: d =>
          d.isUsetItem
            ? USER_ITEM_COLOR
            : d.highlighted
            ? HIGHLIGHTED_COLOR
            : DEFAULT_COLOR,
        getTargetColor: d =>
          d.isUsetItem
            ? USER_ITEM_COLOR
            : d.highlighted
            ? HIGHLIGHTED_COLOR
            : DEFAULT_COLOR,
        getWidth: strokeWidth
      })
    ];
  }

  render() {
    const {
      mapStyle = "mapbox://styles/mapbox/light-v9",
      userLocation
    } = this.props;

    return (
      <DeckGL
        layers={this._renderLayers()}
        initialViewState={{
          ...INITIAL_VIEW_STATE,
          longitude: userLocation[0],
          latitude: userLocation[1]
        }}
        controller={true}
      >
        <StaticMap
          reuseMaps
          mapStyle={mapStyle}
          preventStyleDiffing={true}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        />

        {this._renderTooltip}
      </DeckGL>
    );
  }
}

export default Map;
