import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MalwareBarChart from './Components/MalwareBarChart';
import ThreatsPieChart from './Components/ThreatsPieChart';
import RansomwareFeed from './Components/RansomwareFeed';
import RansomwareBlurb from './Components/RansomwareBlurb';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>ThreatBoom</h2>
          <h1 className="App-title">A Ransomeware Visualizer</h1>
        </header>

        <div className="mdc-layout-grid">
          <div className="mdc-layout-grid__inner">+
            <div className="mdc-layout-grid__cell--span-12 lightthemeBG">
            <RansomwareBlurb />
            </div>
            <div className="mdc-layout-grid__cell--span-12 darkthemeBG">
            <RansomwareFeed />
            </div>
            <div className="mdc-layout-grid__cell--span-6 lightthemeBG">
              <ThreatsPieChart />
            </div>
            <div className="mdc-layout-grid__cell--span-6 lightthemeBG">
              <MalwareBarChart />
            </div>
          </div>
        </div>

        <script src="node_modules/material-components-web/dist/material-components-web.js"></script>
        <script>mdc.autoInit()</script>
      </div>
    );
  }
}

export default App;
