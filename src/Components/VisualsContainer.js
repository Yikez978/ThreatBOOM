import React, { Component } from 'react';
import MalwareBarChart from './MalwareBarChart';
import ThreatsPieChart from './ThreatsPieChart';
import RansomwareFeed from './RansomwareFeed';
import RansomwareBlurb from './RansomwareBlurb';
import ThreatsBlurb from './ThreatsBlurb';
import '../App.css';

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
            if(data !== undefined) {
                this.setState({
                    feed: data.feed,
                    countries: data.country,
                    malware: data.malware,
                    threats: data.threat
                })
            }
            })
    }


    render() {

        if(this.state.feed.length === 0)
            return null

        return (
            <div className="mdc-layout-grid__inner">
                <div className="mdc-layout-grid__cell--span-12 lightthemeBG">
                    <RansomwareBlurb />
                </div>
                <div className="mdc-layout-grid__cell--span-12 darkthemeBG">
                    <RansomwareFeed countries={this.state.countries} feed={this.state.feed} />
                </div>
                <div className="mdc-layout-grid__cell--span-6 lightthemeBG">
                    <ThreatsPieChart threats={this.state.threats} />
                    <ThreatsBlurb/>
                </div>
                <div className="mdc-layout-grid__cell--span-6 lightthemeBG">
                    <MalwareBarChart malware={this.state.malware} />
                </div>
            </div>
        );
    }



}


export default VisualsContainer;
