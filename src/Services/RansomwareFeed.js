import React, { Component } from 'react';
import '../App.css';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

const wrapperStyles = {
  width: "100%",
  maxWidth: 1500,
  margin: "0 auto"
}

class RansomwareFeed extends Component {

    constructor() {
        super()
        this.state = {
            feed: []
        }
    }

    componentDidMount() {
        fetch('/feed')
            .then(res => res.json())
            .then(data => {
                if(data != null && typeof data !== "undefined") {
                    console.log(data);
                this.setState({feed:data})
                console.log(this.state.feed)
                }
            });
    }


    render() {

        const columns = [{
            Header: 'First Seen',
            accessor: 'first_seen'
        }, {
            Header: 'Threat',
            accessor: 'threat'
        }, {
            Header: 'Malware',
            accessor: 'malware'
        }, {
            Header: 'Host',
            accessor: 'host'
        }, {
            Header: 'URL',
            accessor: 'url'
        }, {
            Header: 'Status',
            accessor: 'status'
        }, {
            Header: 'Registrar',
            accessor: 'registrar',
        }, {
            Header: 'ASN',
            accessor: 'asn'
        }, {
            Header: 'Country',
            accessor: 'country'
        }]

        return(
        <div>
        <h1>Ransomware Activity</h1>

     <div style={wrapperStyles}>
        <ReactTable
        data={this.state.feed}
        columns={columns}/>
            </div>
        </div>
        );
    }
}

export default RansomwareFeed