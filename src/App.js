import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
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
          <h2>ThreatBoom</h2>
          <h1 className="App-title">A Ransomeware Visualizer</h1>
        </header>
        <div className="mdc-layout-grid">
          <div className="mdc-layout-grid__inner">
            <VisualsContainer />
          </div>
        </div>
        <script>window.mdc.autoInit()</script>
      </div>
    );
  }
}

export default App;
