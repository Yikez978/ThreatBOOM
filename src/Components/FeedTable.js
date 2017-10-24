import React, { Component } from "react"
import PieChart from "react-svg-piechart"
import '../App.css';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

const wrapperStyles = {
    width: "100%",
    margin: "0 auto"
}

class FeedTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            feed: [],
            storedFeed: [],
            searchTerm: undefined
        }

        this.handleSearch = this.handleSearch.bind(this)
    }

    componentDidMount() {
        let data = this.props.feed
        if (data !== undefined) {
            this.setState({ feed: data, storedFeed: data })
        } else {
            console.log("No feed data from props, RansomwareFeed->FeedTable");
        }
    }

    handleSearch(event) {
        let searchTerm = event.target.value.toLowerCase();
        if (searchTerm !== undefined && searchTerm !== "") {
            this.setState({
                feed: this.state.storedFeed.filter((item) => {
                    return (
                        (item.first_seen !== undefined && item.first_seen.toLowerCase().includes(searchTerm)) ||
                        (item.threat !== undefined && item.threat.toLowerCase().includes(searchTerm)) ||
                        (item.malware !== undefined && item.malware.toLowerCase().includes(searchTerm)) ||
                        (item.host !== undefined && item.host.toLowerCase().includes(searchTerm)) ||
                        (item.url !== undefined && item.url.toLowerCase().includes(searchTerm)) ||
                        (item.status !== undefined && item.status.toLowerCase().includes(searchTerm)) ||
                        (item.registrar !== undefined && item.registrar.toLowerCase().includes(searchTerm)) ||
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
        this.setState({ feed: this.state.storedFeed })
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


        return (
            <div style={wrapperStyles}>
                <label htmlFor="textfield-no-js">Search: </label>
                <div className="mdc-textfield">
                    <input type="text" id="textfield-no-js"
                        className="mdc-textfield__input longText"
                        placeholder="Country Code, Threat Type, etc"
                        onChange={this.handleSearch} />
                    <div className="mdc-textfield__bottom-line"></div>
                </div>
                <ReactTable
                    data={this.state.feed}
                    columns={columns} />
            </div>
        );
    }
}


export default FeedTable;









