import React, { Component } from "react"
import PieChart from "react-svg-piechart"
import '../App.css';
const definitionStyle = {
    width: '100%',
    maxWidth: '350',
    margin: 'auto',
    align: 'left'
}

const wrapperStyles = {
    width: "100%",
    maxWidth: 1280,
    margin: "0 auto"
}

class ThreatsBlurb extends Component {

    constructor(props) {
        super(props)
        this.state = {
            threats: [],
            expandedSector: null,
            total: 0
        }
    }


    render() {
        return (
          <div style={wrapperStyles} className="mdc-layout-grid" >
              <h1 className="mdc-typography--headline">Site Type Definitions</h1>
                <div className="mdc-layout-grid__inner">
                    <div className="mdc-layout-grid__cell">
                        <div style={definitionStyle}>
                            <span className="mdc-typography--subheading2 mdc-typography--adust-margin">
                                Distribution Site - </span><span className="mdc-typography--caption mdc-typography--adjust-margin">
                                a site that infects it's users with ransomware. These site distribute the ransomware.
                            </span>
                        </div>
                    </div>
                    <div className="mdc-layout-grid__cell">
                        <div style={definitionStyle}>
                            <span className="mdc-typography--subheading2 mdc-typography--adust-margin">
                                Payment Site - </span><span className="mdc-typography--caption mdc-typography--adjust-margin">
                                typically temporary sites that are used on infected ransomware victims. Victims are told to go to these sites to pay for the ransomware unlock process.
                            </span>
                        </div>
                    </div>
                    <div className="mdc-layout-grid__cell">
                        <div style={definitionStyle}>
                            <span className="mdc-typography--subheading2 mdc-typography--adust-margin">
                                Botnet C&C (C2) - </span><span className="mdc-typography--caption mdc-typography--adjust-margin">
                                servers that are able to send commands and recieve messages of any machine part of a botnet, or in this case infected with ransomware.
                            </span>
                        </div>
                    </div>
                </div>
            </div>  
        );
    }
}


export default ThreatsBlurb;
