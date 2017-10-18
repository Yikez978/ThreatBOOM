import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MalwareBarChart from './Components/MalwareBarChart';
import ThreatsPieChart from './Components/ThreatsPieChart';
import WorldMap from './Components/WorldMap';
import RansomwareFeed from './Services/RansomwareFeed'
import 'react-table/react-table.css'

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
          <ThreatsPieChart/>
        </div>


        <div>
        <WorldMap>
          </WorldMap>
        </div>
        
        <div>
          <MalwareBarChart/>
        </div>

   
      </div>
    );
  }
}

export default App;
