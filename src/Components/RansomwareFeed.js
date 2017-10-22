import React, { Component } from 'react';
import '../App.css';
import WorldMap from './WorldMap';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

const wrapperStyles = {
  width: "100%",
  maxWidth: 1280,
  margin: "0 auto"
}

const autoSize = {
    height: "auto"
}

const mdcStyle = "mdc-button mdc-button--raised"

class RansomwareFeed extends Component {

    constructor() {
        super()
        this.state = {
            feed: [],
            isVisible: false
        }

        this.handleToggleCharts = this.handleToggleCharts.bind(this)
    }

    componentDidMount() {
        fetch('/feed')
            .then(res => res.json())
            .then(data => {
                if (data != null && typeof data !== "undefined") {
                    console.log(data);
                    this.setState({ feed: data })
                    console.log(this.state.feed)
                }
            });
    }

    handleToggleCharts() {
        this.setState({ isVisible: !this.state.isVisible })
    }


    render() {

        const columns = [{
            Header: 'First Seen',
            accessor: 'first_seen'
        }, {
            Header: 'Threat',
            accessor: 'threat',
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

        const showTable = this.state.isVisible;
        let view = null
        if (showTable) {
            view =
                <ReactTable
                    data={this.state.feed}
                    columns={columns} />
        } else {
            view = <WorldMap />
        }


        return (
            <div className="mdc-card">
                <div style={wrapperStyles}>
                    <div style={autoSize} className="mdc-card__media-item">
                        {view}
                    </div>
                    <section className="mdc-card__primary">
                        <h1 className="mdc-card__title mdc-card__title--large">Top 10 Ransomware Site Countries</h1>
                        <h2 className="mdc-card__subtitle">
                            <button
                                data-mdc-auto-init="MDCRipple"
                                title="Toggle Charts"
                                className={mdcStyle}
                                onClick={this.handleToggleCharts}>Toggle Table</button>
                        </h2>
                    </section>
                </div>
            </div>
        );
    }
}

export default RansomwareFeed