import React, { Component } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps"
import { scaleLinear } from 'd3-scale'
import ReactTooltip from "react-tooltip"

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto"
}

const cityScale = scaleLinear()
  .domain([0, 5000])
  .range([1, 35])



class WorldMap extends Component {

  constructor() {
    super()
    this.state = {
      countries: [],
      zoom: 1
    }
    this.fetchCountries = this.fetchCountries.bind(this)
    this.handleZoomIn = this.handleZoomIn.bind(this)
    this.handleZoomOut = this.handleZoomOut.bind(this)
    this.handleCountryClick = this.handleCountryClick.bind(this)
  }

  handleZoomIn() {
    console.log("zoom in");
    this.setState({
      zoom: this.state.zoom * 2
    })
  }
  handleZoomOut() {
    this.setState({
      zoom: this.state.zoom / 2
    })
  }

  componentDidMount() {
    this.fetchCountries()
    setTimeout(() => {
      ReactTooltip.rebuild()
    }, 100)
  }

  handleCountryClick(marker, event) {
    ReactTooltip.show(this.refs.foo)
  }


  fetchCountries() {
    fetch('/countries')
      .then(res => res.json())
      .then(data => {
        this.setState({ countries: data });
        console.log(this.state.countries);
      });
  }

  render() {
    return (
      <div>
        <div style={wrapperStyles}>
          <button onClick={this.handleZoomIn}>{"Zoom in"}</button>
          <button onClick={this.handleZoomOut}>{"Zoom out"}</button>
          <hr />
          <ComposableMap
            projectionConfig={{ scale: 205 }}
            width={980}
            height={551}
            style={{
              width: "100%",
              height: "auto",
            }}
          >
            <ZoomableGroup zoom={this.state.zoom} center={[0, 20]}>
              <Geographies geographyUrl="../../res/world-110m.json">
                {(geographies, projection) =>
                  geographies.map((geography, i) =>
                    geography.id !== "ATA" && (
                      <Geography
                        key={i}
                        data-tip={geography.properties.name}
                        geography={geography}
                        projection={projection}
                        style={{
                          default: {
                            fill: "#EFFFF5",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none",
                          },
                          hover: {
                            fill: "#00796B",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none",
                          },
                          pressed: {
                            fill: "#212121",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none",
                          },
                        }}
                      />
                    ))}
              </Geographies>
              <Markers>
                {
                  this.state.countries.map((country, i) => (
                    <Marker
                      key={i}
                      onClick={this.handleCountryClick}
                      marker={getCoordsForCountry(country.value)}
                    >
                      <circle
                        cx={0}
                        cy={0}
                        r={cityScale(country.count)}
                        fill="rgba(255,87,34,0.8)"
                        stroke="#607D8B"
                        strokeWidth="2"
                      />
                    </Marker>
                  ))
                }
              </Markers>
            </ZoomableGroup>
          </ComposableMap>

          <ReactTooltip />
        </div>
      </div>
    )
  }
}




function getCoordsForCountry(country) {
  // https://gist.github.com/sindresorhus/1341699 bless
  switch (country) {
    case "US": return { name: 'United States', coordinates: [-76.56631, 39.281049] }
    case "DE": return { name: "Germany", coordinates: [11.00, 51.00] }
    case "RU": return { name: "Russia", coordinates: [100.00, 60.00] }
    case "NL": return { name: "Netherlands", coordinates: [5.750, 52.500] }
    case "IT": return { name: "Italty", coordinates: [12.8333, 42.8333] }
    case "GB": return { name: "United Kingdom", coordinates: [-2.00, 54.00] }
    case "CN": return { name: "China", coordinates: [105.00, 35.00] }
    case "FR": return { name: "France", coordinates: [2.00, 46.00] }
    case "PL": return { name: "Poland", coordinates: [20.00, 52.00] }
    case "TR": return { name: "Turkey", coordinates: [35.00, 39.00] }
    default: return { coordinates: [40, -70] }
  }
}


export default WorldMap