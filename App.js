// @flow

import { Provider, connect } from 'react-redux';
import * as React from 'react';
import store from './src/settings';
import AppNavigator from './src/router';
import { addNavigationHelpers, withNavigation } from 'react-navigation';
import { CACHED_USER, CACHED_AUTO } from 'utils/memory';
import { BackHandler, View, Linking, Platform } from "react-native";
import CacheStore from 'react-native-cache-store';
import { REDIRECT_TO } from './src/router.js';
import socketAction from 'actions/socket';
import Socket from 'utils/websocket';
import TabsNav from 'components/TabsNav';
import moment from 'moment-with-locales-es6';
import './ReactotronConfig';
import {FBLoginManager} from 'react-native-facebook-login';
import { getAutoCached, getAutoById } from 'actions/auto';
import axios from 'axios';
import DropdownAlert from 'react-native-dropdownalert';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Web); // defaults to Native

moment.locale('az');

type Props = {
  router: Object,
  onRedirect: Function,
  dispatcher: Function,
  onGetAutoById: Function,
};

class App extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    CacheStore.flushExpired();

    CacheStore.get('CACHED_USER')
    .then(res => JSON.parse(res))
    .then(res => {
      if(!res) {
        this.props.onRedirect({
          type: REDIRECT_TO,
          pathto: 'Login'
        })
        return false;
      }
      console.log(res);

      this.props.onRedirect({
        type: "LOGIN",
        payload: res,
        meta: {
          done: true,
          cache: true,
          error: false,
        }
      });
      
      if(res.token) {
        axios.defaults.headers.common['token'] = res.token;
        this.props.onRedirect({
          type: REDIRECT_TO,
          pathto: 'Main',
        })
      }

      CacheStore.get('CACHED_AUTO')
      .then(auto => JSON.parse(auto))
      .then(auto => {
        if(auto) {
          this.props.onGetAutoCached(auto);
        } else {
          this.props.onGetAutoById(res.user.autoId);
        }
      })

    })
    .catch(e => {
      this.props.onRedirect({
        type: REDIRECT_TO,
        pathto: 'Login',
      })
    })
  }

  componentDidMount() {
    Linking.getInitialURL().then((url) => {
      if (url) {
        console.log('Initial url is: ' + url);
      }
    }).catch(err => console.error('An error occurred', err));

    setTimeout(() => {
      this.props.dispatcher({
        type: 'NOTIFICATIONS'
      })
    }, 1000)

    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        this.navigate(url);
      });
    } else {
        Linking.addEventListener('url', this.handleOpenURL.bind(this));
      }
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL.bind(this));
  }

  handleOpenURL(event) {
    const route = event.url.replace(/.*?:\/\//g, '');
    if(route === 'forget/json') {
      this.props.onRedirect({
        type: REDIRECT_TO,
        pathto: 'Restore',
      })
    }
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
    //   this.socket.closeConnection();`
    // }
  }

  render() {
    // const config = {
    //   velocityThreshold: 0.3,
    //   directionalOffsetThreshold: 80
    // };

    return (
      <View style={{ flex: 1}}>
        {/* <GestureRecognizer
          onSwipeLeft={(state) => {
            const route = this.props.router && this.props.router.routes[0];
            if (route.routeName === 'Main' && route.index !== route.routes.length - 1) {
              this.props.dispatcher({ type: 'Navigation/NAVIGATE', routeName: route.routes[route.index+1].routeName })
            }
          }}
          onSwipeRight={(state) => {
            const route = this.props.router && this.props.router.routes[0];            
            if (route.routeName === 'Main' && route.index !== 0) {
              this.props.dispatcher({ type: 'Navigation/NAVIGATE', routeName: route.routes[route.index-1].routeName })
            }
          }}
          config={config}
          style={{
            flex: 1
          }}
          > */}
          <AppNavigator navigation={addNavigationHelpers({
            dispatch: this.props.dispatcher,
            state: this.props.router,
          })}
          />
        {/* </GestureRecognizer> */}
        <DropdownAlert ref={(ref) => global.alertDown = ref} tapToCloseEnabled={true} closeInterval={3000} inactiveStatusBarStyle="light-content" elevation={0} />
      </View>
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
  onGetAutoById: (autoId) => dispatch(getAutoById(autoId)),
  onGetAutoCached: (data) => dispatch(getAutoCached(data)),
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
