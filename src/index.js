import React from 'react';
import ReactDOM from 'react-dom';
/**
 * Import the stylesheet you want used! Here we just reference
 * the main SCSS file we have in the styles directory.
 */
import './styles/main.scss';

/**
 * Both configureStore and Root are required conditionally.
 * See configureStore.js and Root.js for more details.
 */
import { configureStore } from './store/configureStore';
import { Root } from './containers/Root';
import Config from './shared/Config';

const store = configureStore();

/**
 * Private object for the instance of the
 * chromecast object and message bus.
 */
window._shared = {};

if(typeof window.cast !== 'undefined') {
    const castReceiverManager = window.cast.receiver.CastReceiverManager.getInstance();
    const messageBus = castReceiverManager.getCastMessageBus(Config.messageBusName);
    window._shared = {
        ...window._shared,
        castReceiverManager,
        messageBus
    };

    // Start the Cast Receiver Manager.
    castReceiverManager.start();
    
    castReceiverManager.onSenderDisconnected = function(event) {
        if(castReceiverManager.getSenders().length === 0 &&
            event.reason === cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
                window.close();
            }
    }
}

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
