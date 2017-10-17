import React, { Component } from 'react';
import '../App.css';

class RansomwareFeed extends Component {


    componentDidMount() {
        fetch('/feed')
            .then(data => {
            });
    }


    render() {
        return(
        <div>
        <h1>Ransomware Activity</h1>
        </div>
        );
    }
}

export default RansomwareFeed