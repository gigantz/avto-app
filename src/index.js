import React from 'react';
import { View, Text, Button, StatusBar, AsyncStorage } from "react-native";
import { connect } from 'react-redux';
import socketAction from 'actions/socket';
import { withNavigation } from 'react-navigation';
import { getStoragePromise, CACHED_USER } from 'utils/memory';
import Socket from 'utils/websocket';
import config from 'config';

import { colors } from 'style';
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'splash',
    }
  }

  componentWillMount() {
    
    AsyncStorage.getItem(CACHED_USER)
    .then(res => JSON.parse(res))
    .then(res => {
      if(!res) {
        this.setState(prev => ({
          ...prev,
          currentPage: 'signup'
        }))
        return false;
      }
      this.props.onLoginCache({
        type: "LOGIN",
        payload: res,
        meta: {
          done: true,
          cache: true,
        }
      });
      if(res.token) {
        this.props.onLoginCache({
          type: "REDIRECT_TO",
          payload: 'profile'
        })
      }
      this.setState(prev => ({
        ...prev,
        currentPage: 'profile'
      }))
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.page !== this.props) {
      this.setState(prev => ({
        ...prev,
        currentPage: nextProps.page
      }))
    }

    if(nextProps.userId !== this.props.userId && nextProps.authenticated) {
      this.socket = new Socket({
        server: config.WS,
        userId: nextProps.userId || String(Math.random() + '(guest)').substr(3),
      });
      this.socket.listeners = action => this.props.onSocket(socketAction(action));
      this.socket.init();
      return false;
    }

    if(!nextProps.user.authenticated && this.socket && this.socket.connected) {
      this.socket.closeConnection();
    }
  }
  
  render() {
    const { currentPage } = this.state;
    const { page, authenticated } = this.props;

    return (
        <View>
          <Button title="salam" onPress={()=>{    this.props.navigation.navigate('login')} } />
        </View>
    );
  }
}

const mapStateToProps = ({ ui, user }) => ({
  user,
  authenticated: user.authenticated,
  userId: user.userId,
})

const mapDispatchToProps = (dispatch) => ({
  onLoginCache: (dispatcher) => dispatch(dispatcher),
  onSocket: (dispatcher) => dispatch(dispatcher),
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Main));