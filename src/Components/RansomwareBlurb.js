import React from 'react'
import ReactDOM from 'react-dom'
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

class RansomwareBlurb extends React.Component {

    render() {
        return (
            <div style={wrapperStyles} className="mdc-layout-grid" >
                <h1 className="mdc-typography--headline">ThreatBoom is a visualization tool for <a href="https://abuse.ch">Abuse.ch</a> ransomware tracker.</h1>
                <h2 className="mdc-typography--caption">Use the table view to see the raw data that populates these charts.</h2>
                <div className="mdc-layout-grid__inner">
                    <div className="mdc-layout-grid__cell--span-12">
                        <div style={definitionStyle}>
                            <span className="mdc-typography--subheading2 mdc-typography--adust-margin">
                                Ransomware - </span><span className="mdc-typography--caption mdc-typography--adjust-margin">
                                a type of malicious software from cryptovirology that threatens to publish the victim's data or perpetually block access to it unless a ransom is paid. 
                            <a href="https://en.wikipedia.org/wiki/Ransomware">wikipedia</a> </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RansomwareBlurb