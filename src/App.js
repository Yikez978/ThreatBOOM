import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
<<<<<<< HEAD
=======
import MalwareBarChart from './Components/MalwareBarChart';
import ThreatsPieChart from './Components/ThreatsPieChart';
import RansomwareFeed from './Components/RansomwareFeed';
import RansomwareBlurb from './Components/RansomwareBlurb';
import ThreatsBlurb from './Components/ThreatsBlurb';
>>>>>>> master
import 'material-components-web/dist/material-components-web.js';
import VisualsContainer from './Components/VisualsContainer';

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto"
}



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="../../res/logo.png" alt="logo" />
          <h1 className="App-title">A Ransomeware Visualizer</h1>
        </header>
        <div className="mdc-layout-grid">
          <div className="mdc-layout-grid__inner">
<<<<<<< HEAD
            <VisualsContainer />
=======
            <div className="mdc-layout-grid__cell--span-12 lightthemeBG">
            <RansomwareBlurb />
            </div>
            <div className="mdc-layout-grid__cell--span-12 darkthemeBG">
            <RansomwareFeed />
            </div>
            <div className="mdc-layout-grid__cell--span-6 lightthemeBG">
              <ThreatsPieChart />
              <ThreatsBlurb/>
            </div>
            <div className="mdc-layout-grid__cell--span-6 lightthemeBG">
              <MalwareBarChart />
            </div>
>>>>>>> master
          </div>
        </div>
        <script>window.mdc.autoInit()</script>
      </div>
    );
  }
}

export default App;
