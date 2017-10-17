import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BarChart from './Components/BarChart';
import WorldMap from './Components/WorldMap';
import RansomwareFeed from './Services/RansomwareFeed'
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>ThreatBoom</h2>
          <h1 className="App-title">A security visualizer</h1>
        </header>


        <RansomwareFeed/>

        <div>
        <WorldMap>
          </WorldMap>
        </div>

      </div>
    );
  }
}

export default App;
