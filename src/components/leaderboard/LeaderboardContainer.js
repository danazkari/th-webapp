import React, { Component, PropTypes } from 'react';
import Leaderboard from './Leaderboard';
import Config from '../../shared/Config';

export default class LeaderboardContainer extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.actions.loadLeaderboard();
    }

    componentDidMount() {
        this._interval = setInterval(
            () => {
                const { index } = this.props.leaderboard.shownResults;
                if(index < this.props.leaderboard.fullResults.length - 1) {
                    this.props.actions.showNextPage();
                } else {
                    this.props.actions.loadLeaderboard();
                }
            },
            Config.pageDuration * 1000
        );
    }

    render() {
        let { leaderboard, actions } = this.props;
        return (
            <Leaderboard leaderboard={leaderboard} actions={actions} />
        );
    }
}

LeaderboardContainer.propTypes = {
    leaderboard: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};
