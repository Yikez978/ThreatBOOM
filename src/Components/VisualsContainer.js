import React, { Component } from 'react';
import MalwareBarChart from './MalwareBarChart';
import ThreatsPieChart from './ThreatsPieChart';
import RansomwareFeed from './RansomwareFeed';
import RansomwareBlurb from './RansomwareBlurb';
import '../App.css';
const wrapperStyles = {
    width: "100%",
    margin: "0 auto"
}

class VisualsContainer extends Component {

    constructor() {
        super()
        this.state = {
            feed: [],
            countries: [],
            threats: [],
            malware: []
        }
    }

    componentDidMount() {
        fetch('/feed')
            .then(res => res.json())
            .then((data) => {
                console.log(data.feed);
                console.log(data.threat);
                console.log(data.malware);
                console.log(data.country);
                this.setState({
                    feed: data.feed,
                    countries: data.country,
                    malware: data.malware,
                    threats: data.threat
                })
            })
    }


    render() {
        return (
            <div style={wrapperStyles}>
                <div className="mdc-layout-grid__cell--span-12 lightthemeBG">
                    <RansomwareBlurb />
                </div>
                <div className="mdc-layout-grid__cell--span-12 darkthemeBG">
                    <RansomwareFeed countries={this.state.country} feed={this.state.feed}/>
                </div>
                <div className="mdc-layout-grid__cell--span-6 lightthemeBG">
                    <ThreatsPieChart threats={this.state.threats}/>
                </div>
                <div className="mdc-layout-grid__cell--span-6 lightthemeBG">
                    <MalwareBarChart malware={this.state.malware}/>
                </div>
            </div>
        );
    }



}


export default VisualsContainer;
