import React, { Component } from 'react';
import '../App.css';
import WorldMap from './WorldMap';
import FeedTable from './FeedTable';

const wrapperStyles = {
    width: "100%",
    maxWidth: 1280,
    margin: "0 auto"
}

const autoSize = {
    height: "auto"
}

const marginStyle = {
    margin: "15px"
}

const mdcStyle = "mdc-button mdc-button--raised"

class RansomwareFeed extends Component {

    constructor(props) {
        super(props)
        this.state = {
            feed: [],
            countries: [],
            isVisible: false
        }

        this.handleToggleCharts = this.handleToggleCharts.bind(this)
     
    }

    componentDidMount() {
    let cntry = this.props.countries
    let feedData = this.props.feed
    this.setState({ 
        feed: feedData,
        countries: cntry
     })
    }


    handleToggleCharts() {
        this.setState({ isVisible: !this.state.isVisible })
    }

    render() {

        if(this.state.feed.length === 0 || this.state.countries.length === 0)
            return null

        const showTable = this.state.isVisible;
        let view = null
        if (showTable) {
            view = <FeedTable feed={this.state.feed}/>
        } else {
            view = <WorldMap countries={this.state.countries}/>
        }


        return (
            <div className="mdc-card">
                <div style={wrapperStyles}>
                    <div style={autoSize} className="mdc-card__media-item">
                        {view}
                    </div>
                    <section className="mdc-card__primary">
                        <h2 className="mdc-card__subtitle">
                            <button
                                data-mdc-auto-init="MDCRipple"
                                title="Toggle Charts"
                                className={mdcStyle}
                                style={marginStyle}
                                onClick={this.handleToggleCharts}>Toggle Table View</button>
                        </h2>
                    </section>
                </div>
            </div>
        );
    }
}

export default RansomwareFeed