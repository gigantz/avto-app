// @flow
import { Provider, connect } from 'react-redux';
import * as React from 'react';
import configureStore from './src/settings';
import AppNavigator from './src/router';
import { addNavigationHelpers, withNavigation } from 'react-navigation';
import { getStoragePromise, CACHED_USER } from 'utils/memory';
import { AsyncStorage } from "react-native";
import { REDIRECT_TO } from './src/router.js';
import socketAction from 'actions/socket';
import Socket from 'utils/websocket';

const store = configureStore();
type Props = {};

class App extends React.Component {
  componentWillMount() {
    AsyncStorage.getItem(CACHED_USER)
    .then(res => JSON.parse(res))
    .then(res => {
      console.log('cache', res);
      if(!res) {
        this.props.onRedirect({
          type: REDIRECT_TO,
          pathto: 'Login'
        })
        return false;
      }
      this.props.onRedirect({
        type: "LOGIN",
        payload: res,
        meta: {
          done: true,
          cache: true,
        }
      });
      if(res.token) {
        return this.props.onRedirect({
          type: REDIRECT_TO,
          pathto: 'Profile',
        })
      }
      this.props.onRedirect({
        type: REDIRECT_TO,
        pathto: 'Profile',
      })
    });
  }

  componentWillReceiveProps(nextProps) {
    // if(nextProps.userId !== this.props.userId && nextProps.user.get('authenticated')) {
    //   this.socket = new Socket({
    //     server: config.WS,
    //     userId: nextProps.userId || String(Math.random() + '(guest)').substr(3),
    //   });
    //   this.socket.listeners = action => this.props.onSocket(socketAction(action));
    //   this.socket.init();
    //   return false;
    // }

    // if(!nextProps.user.get('authenticated') && this.socket && this.socket.connected) {
    //   this.socket.closeConnection();
    // }
  }
  

  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.router,
      })} />
    );
  }
}

const mapStateToProps = ({ ui, user, router }) => ({
  user,
  page: ui.get('page'),
  authenticated: user.get('authenticated'),
  userId: user.get('userId'),
  router
})

const mapDispatchToProps = (dispatch) => ({
  onLoginCache: (dispatcher) => dispatch(dispatcher),
  onSocket: (dispatcher) => dispatch(dispatcher),
  onRedirect: (dispatcher) => dispatch(dispatcher),
});

const AppWithNavigationState = connect(mapStateToProps, mapDispatchToProps)(App);

class Root extends React.Component {  
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default Root;
