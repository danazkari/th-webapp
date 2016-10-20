import React, { Component, PropTypes } from 'react';
import './leaderboard-item.scss';


export default class LeaderboardItem extends Component {
    constructor(props, context) {
        super(props, context);

        this.__getAverageComparison = this.__getAverageComparison.bind(this);
    }

    _getResizedProfileImage(url, size) {
        // NOTE: Pattern taken from http://stackoverflow.com/a/6168286
        const pattern = RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?");
        const matches = url.match(pattern);
        const urlParts = {
            scheme: matches[2],
            authority: matches[4],
            path: matches[5],
            query: matches[7],
            fragment: matches[9]
        };
        return `http://${urlParts.authority}.rsz.io${urlParts.path}?width=${size}`;
    }

    __getAverageComparison() {
        const { average } = this.props;
        const { value, rx_bool: isRx } = this.props.result.userTests[0];

        const preposition = isRx && +value >= average ? 'Above' : 'Below';

        return `${preposition} average`;
    }

    render() {
        const { result } = this.props;

        return (
            <div className="leaderboard-item">
                <div className="rank">
                    <span>{ result.rank }</span>
                </div>
                <div className="profile">
                    <img
                        src={ this._getResizedProfileImage(result.profileImg, 100) }
                        alt={ `${result.username}'s profile picture` }
                    />
                </div>
                <div className="name">
                    <span>{ `${result.userFirstName} ${result.userLastName}` }</span>
                </div>
                <div className="resultNumber">
                    <span>{ result.tests[0] }</span>
                </div>
                <div className="resultNumber">
                    <span>{ this.__getAverageComparison() }</span>
                </div>
            </div>
        );
    }
}

LeaderboardItem.propTypes = {
    result: PropTypes.object.isRequired,
    average: PropTypes.number.isRequired
};
