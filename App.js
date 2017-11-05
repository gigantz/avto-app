// @flow

import { Provider, connect } from 'react-redux';
import * as React from 'react';
import configureStore from './src/settings';
import AppNavigator from './src/router';
import { addNavigationHelpers, withNavigation } from 'react-navigation';
import { CACHED_USER } from 'utils/memory';
import { BackHandler, View } from "react-native";
import CacheStore from 'react-native-cache-store';
import { REDIRECT_TO } from './src/router.js';
import socketAction from 'actions/socket';
import Socket from 'utils/websocket';
import TabsNav from 'components/TabsNav';
import moment from 'moment-with-locales-es6';
import './ReactotronConfig';

moment.locale('az');

const store = configureStore();
type Props = {
  router: Object,
  onRedirect: Function,
  dispatcher: Function
};

class App extends React.Component<Props> {
  componentWillMount() {
    CacheStore.flushExpired();

    CacheStore.get(CACHED_USER)
    .then(res => JSON.parse(res))
    .then(res => {
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
          pathto: 'Main',
        })
      }
    })
    .catch(e => {
      this.props.onRedirect({
        type: REDIRECT_TO,
        pathto: 'Login',
      })
    })
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
          dispatch: this.props.dispatcher,
          state: this.props.router,
        })} />
    );
  }
}

const mapStateToProps = ({ ui, user, router }) => ({
  user,
  authenticated: user.authenticated,
  userId: user.userId,
  router
})

const mapDispatchToProps = (dispatch) => ({
  onLoginCache: (dispatcher) => dispatch(dispatcher),
  onSocket: (dispatcher) => dispatch(dispatcher),
  onRedirect: (dispatcher) => dispatch(dispatcher),
  dispatcher: dispatch
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
