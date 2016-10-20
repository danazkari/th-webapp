import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { UPDATE_LEADERBOARD_URL } from '../constants/CastMessageTypes';
import Config from '../shared/Config';
import * as LeaderboardActions from '../actions/LeaderboardActions';
import * as CastActions from '../actions/CastActions';
import { LeaderboardContainer } from '../components/leaderboard';
import chromeCastImage from '../images/google-cast-logo.png';

export class App extends Component {
    constructor(props) {
        super(props);

        this.__initializeCastAPI = this.__initializeCastAPI.bind(this);
        this.__renderCastLogo = this.__renderCastLogo.bind(this);
        this.__handleCastAppButton = this.__handleCastAppButton.bind(this);

        if(!process.env.CAST_BUILD) {
            this.__initializeCastAPI();
        }
    }

    __initializeCastAPI() {
        const initializeCastApi = () => {
            const sessionRequest = new chrome.cast.SessionRequest(process.env.APPLICATION_ID);
            const apiConfig = new chrome.cast.ApiConfig(sessionRequest,
                (event) => {
                    console.log('Session listener', event);
                },
                (event) => {
                    const { AVAILABLE, UNAVAILABLE } = chrome.cast.ReceiverAvailability;
                    // Receiver Listener
                    const events = {
                        [AVAILABLE]: () => this.props.actions.readyToCast(),
                        [UNAVAILABLE]: () => this.props.actions.castUnavailable()
                    };
                    
                    if(events[event]) {
                        events[event]();
                    }
                }
            );
            chrome.cast.initialize(apiConfig, (e) => console.log('Cast Application Initialized'), (error) => console.error(error));
        };
        window['__onGCastApiAvailable'] = (loaded, errorInfo) => {
            if (loaded) {
                initializeCastApi();
            } else {
                console.log(errorInfo);
            }
        };
    }
    
    componentDidMount() {
        const { messageBus } = window._shared;
        // TODO: Refactor this messageBus listener elsewhere more appropiate.
        if(messageBus) {
            messageBus.onMessage = event => {
                const { data } = event;
                const messageTypes = {
                    [UPDATE_LEADERBOARD_URL]: () => {
                        Config.leaderboardUrl = data.leaderboardUrl;
                    }
                };
            };
        }
    }

    __handleCastAppButton() {
        const onRequestSessionSuccess = (session) => {
            window._shared = session;
        };
        const onLaunchError = (error) => console.error('Cast launch error: ', error);

		chrome.cast.requestSession(onRequestSessionSuccess, onLaunchError);
    }

    __renderCastLogo() {
        return (
            <button className="cast-app-button" onClick={this.__handleCastAppButton}>
                <img src={chromeCastImage} alt="Cast this app" className="cast-icon" />
            </button>
        )
    }

    render() {
        const { leaderboard, cast, actions } = this.props;
        
        return (
            <div className="main-app-container">
                <div className="main-header">
                    <img className="logo" src="http://gainz.trainheroic.com/assets/images/icons/trainheroic/h.png" alt="TrainHeroic Logo" />
                    <h1>Leaderboard</h1>
                    { cast.castAvailable ? this.__renderCastLogo() : '' }
                </div>
                {/* notice that we then pass those unpacked props into the Counter component */}
                <LeaderboardContainer leaderboard={leaderboard} actions={actions}/>
            </div>
        );
    }
}

App.propTypes = {
    leaderboard: PropTypes.object.isRequired,
    cast: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

/**
 * Keep in mind that 'state' isn't the state of local object, but your single
 * state in this Redux application. 'counter' is a property within our store/state
 * object. By mapping it to props, we can pass it to the child component Counter.
 */
function mapStateToProps(state) {
    return {
        leaderboard: state.leaderboard,
        cast: state.cast
    };
}

/**
 * Turns an object whose values are 'action creators' into an object with the same
 * keys but with every action creator wrapped into a 'dispatch' call that we can invoke
 * directly later on. Here we imported the actions specified in 'CounterActions.js' and
 * used the bindActionCreators function Redux provides us.
 *
 * More info: http://redux.js.org/docs/api/bindActionCreators.html
 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            ...LeaderboardActions,
            ...CastActions
        }, dispatch)
    };
}

/**
 * 'connect' is provided to us by the bindings offered by 'react-redux'. It simply
 * connects a React component to a Redux store. It never modifies the component class
 * that is passed into it, it actually returns a new connected componet class for use.
 *
 * More info: https://github.com/rackt/react-redux
 */

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
