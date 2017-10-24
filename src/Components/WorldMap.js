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
const mdcStyle = "mdc-button mdc-button--stroked"

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto"
}


const zoomStyle= {
  margin: "5px"
}

const cityScale = scaleLinear()
  .domain([0, 5000])
  .range([1, 35])



class WorldMap extends Component {

  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      zoom: 1
    }
    this.handleZoomIn = this.handleZoomIn.bind(this)
    this.handleZoomOut = this.handleZoomOut.bind(this)
    this.handleCountryClick = this.handleCountryClick.bind(this)
  }

  handleZoomIn() {
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
    let ctry = this.props.countries
    this.setState({
      countries: ctry
    })
  }

  handleCountryClick(marker, event) {
    ReactTooltip.show(this.refs.count)
  }


  render() {

    if(this.state.countries.length === 0)
        return null


    return (
        <div style={wrapperStyles}>
          <h1 className="mdc-typography--headline">Top 10 Countries Hosting Ransomware <span className="mdc-typography--caption">(Country Code - Site Count)</span></h1>
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
                      marker={getCoordsForCountry(country)}
                    >
                      <circle
                        cx={0}
                        cy={0}
                        r={cityScale(country.count)}
                        fill="rgba(255,87,34,0.8)"
                        stroke="#607D8B"
                        strokeWidth="2"
                      />
                      <text
                        textAnchor="middle"
                        y={getOffSet(country)}
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          fill: "#fff",
                          fontSize: "12px",
                          textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
                        }}
                        >
                        {country.value} - {country.count}
                        </text>
                    </Marker>
                  ))
                }
              </Markers>
            </ZoomableGroup>
          </ComposableMap>

          <ReactTooltip />
           <button style={zoomStyle} className={mdcStyle} onClick={this.handleZoomIn}>{"Zoom in"}</button>
          <button style={zoomStyle} className={mdcStyle} onClick={this.handleZoomOut}>{"Zoom out"}</button>
        </div>
    )
  }
}


function getOffSet(country) {
  switch(country.value) {
        case "US": { return 15 }
    case "DE": { return 15 }
    case "RU": { return 15 }
    case "NL": { return -15 }
    case "IT": { return 15 }
    case "GB": { return -15 }
    case "CN": { return 15 }
    case "FR": { return 15 }
    case "PL": { return -10 }
    case "TR": { return 15 }
    default: return { coordinates: [40, -70] }
  }
}


function getCoordsForCountry(country) {
  // https://gist.github.com/sindresorhus/1341699 bless
  switch (country.value) {
    case "US": return { name: 'United States', coordinates: [-76.56631, 39.281049] }
    case "DE": return { name: "Germany", count: country.count,coordinates: [11.00, 51.00] }
    case "RU": return { name: "Russia", count: country.count, coordinates: [100.00, 60.00] }
    case "NL": return { name: "Netherlands",count: country.count, coordinates: [5.750, 52.500] }
    case "IT": return { name: "Italty", count: country.count, coordinates: [12.8333, 42.8333] }
    case "GB": return { name: "United Kingdom", count: country.count, coordinates: [-2.00, 54.00] }
    case "CN": return { name: "China", count: country.count, coordinates: [105.00, 35.00] }
    case "FR": return { name: "France", count: country.count, coordinates: [2.00, 46.00] }
    case "PL": return { name: "Poland", count: country.count, coordinates: [20.00, 52.00] }
    case "TR": return { name: "Turkey", count: country.count, coordinates: [35.00, 39.00] }
    default: return { coordinates: [40, -70] }
  }
}


export default WorldMap