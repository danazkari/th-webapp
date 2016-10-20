import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { LeaderboardItem } from '../leaderboard-item';
import './leaderboard.scss';

export default class Leaderboard extends Component {
    constructor(props, context) {
        super(props, context);

        this.__renderItems = this.__renderItems.bind(this);
    }

    __renderItems() {
        const { results, index } = this.props.leaderboard.shownResults;
        const { average } = this.props.leaderboard.stats;
        return (
            <div key={index} className="items-wrapper">
                { results.map(result => (<LeaderboardItem key={result.userId} average={average} result={result} />)) }
            </div>
        );
    }

    render() {
        let { results } = this.props.leaderboard.shownResults;
        
        let spinner = (
            <div className="loader-bar"></div>
        );

        return (
            <ReactCSSTransitionGroup
                className="leaderboard-wrapper"
                transitionName="loaded-content"
                transitionEnterTimeout={600}
                transitionLeaveTimeout={600}
            >
                { results && results.length > 0 ? this.__renderItems() : spinner }
            </ReactCSSTransitionGroup>
        );
    }
}

Leaderboard.propTypes = {
    leaderboard: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};
