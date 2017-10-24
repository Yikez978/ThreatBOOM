import React, { Component } from "react"
import PieChart from "react-svg-piechart"

const wrapperStyles = {
    width: "100%",
    maxWidth: 400,
    margin: "0 auto"
}


class ThreatsPieChart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            threats: [],
            expandedSector: null,
            total: 0
        }
        this.handleMouseEnterOnSector = this.handleMouseEnterOnSector.bind(this)
    }

    componentDidMount() {
        let threats = this.props.threats
        let formatData = []
        let newTotal = 0;
        threats.forEach((item) => {
            formatData.push(
                {
                    "label": item.value,
                    "value": item.count,
                }
            )
            newTotal += item.count
            
        })
        this.setState({ threats: formatData })
        this.setState({ total: newTotal })
    }

handleMouseEnterOnSector(sector) {
    this.setState({ expandedSector: sector })
}


render() {

    if(this.state.total <= 0)
        return null

    const data = this.state.threats;
    return (
        <div className="mdc-card">
            <div className="mdc-card__media-item autoSize">
                <div style={wrapperStyles}>
                    <PieChart
                        data={this.state.threats}
                        expandedSector={this.state.expandedSector}
                        onSectorHover={this.handleMouseEnterOnSector}
                        sectorStrokeWidth={2}
                        expandOnHover
                        shrinkOnTouchEnd
                        viewBoxWidth={200}
                    />
                </div>
                <section className="mdc-card__primary">
                    <h1 className="mdc-card__title mdc-card__title--large">Ransomware Site Types</h1>
                    <h2 className="mdc-card__subtitle">
                        <div>
                            {
                                data.map((element, i) => (
                                    <div key={i}>
                                        <span style={{ background: element.color }}></span>
                                        <span style={{ fontWeight: this.state.expandedSector === i ? "bold" : null }}>
                                            {element.label} : {Math.floor((element.value / this.state.total) * 100) + '%' + ' (' + element.value + ')'}
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                    </h2>
                </section>
            </div>
        </div>
    );
}

}

export default ThreatsPieChart