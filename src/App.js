import React, { Component } from 'react';
import './App.css';
import 'material-components-web/dist/material-components-web.js';
import VisualsContainer from './Components/VisualsContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="../../res/logo.png" alt="logo" />
          <h1 className="App-title">A Ransomeware Visualizer</h1>
        </header>
        <div className="mdc-layout-grid">
            <VisualsContainer />
        </div>
        <script>window.mdc.autoInit()</script>
      </div>
    );
  }
}

export default App;
