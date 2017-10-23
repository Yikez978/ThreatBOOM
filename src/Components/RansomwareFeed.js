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
            storedFeed: [],
            searchTerm: undefined,
            isVisible: false
        }

        this.handleToggleCharts = this.handleToggleCharts.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.resetSearch = this.resetSearch.bind(this)
    }

    componentDidMount() {
        fetch('/feed')
            .then(res => res.json())
            .then(data => {
                if (data != null && typeof data !== "undefined") {
                    this.setState({ feed: data, storedFeed: data })
                }
            });
    }

    handleToggleCharts() {
        this.setState({ isVisible: !this.state.isVisible })
    }

    handleSearch(event) {
        let searchTerm = event.target.value.toLowerCase();
        if(searchTerm !== undefined && searchTerm !== "") {
            this.setState({
                feed: this.state.storedFeed.filter( (item) => {
                    return (
                    (item.first_seen !== undefined && item.first_seen.toLowerCase().includes(searchTerm)) ||
                    (item.threat !== undefined && item.threat.toLowerCase().includes(searchTerm)) ||
                    (item.malware !== undefined && item.malware.toLowerCase().includes(searchTerm) )||
                    (item.host !== undefined && item.host.toLowerCase().includes(searchTerm)) ||
                    (item.url !== undefined && item.url.toLowerCase().includes(searchTerm)) ||
                    (item.status !== undefined && item.status.toLowerCase().includes(searchTerm)) ||
                    (item.registrar !== undefined && item.registrar.toLowerCase().includes(searchTerm) ) ||
                    (item.asn !== undefined && item.asn.toLowerCase().includes(searchTerm)) ||
                    (item.country !== undefined && item.country.toLowerCase().includes(searchTerm))
                    )
                })
            })
        } else {
            this.resetSearch()
        }
    }

    resetSearch() {
        this.setState({feed: this.state.storedFeed})
        console.log("reset search")
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
                        <label htmlFor="textfield-no-js">Search: </label>
                        <div className="mdc-textfield">
                            <input type="text" id="textfield-no-js" 
                            className="mdc-textfield__input" 
                            placeholder="Country Code, Threat Type, etc"
                            onChange={this.handleSearch} />
                            <div className="mdc-textfield__bottom-line"></div>
                        </div>
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