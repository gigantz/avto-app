import React, { Component } from 'react';
import { View, Text, Button, StatusBar, AsyncStorage } from "react-native";
import Login from 'components/pages/Login';
import Profile from 'components/pages/Profile';
import Tabs from 'components/Tabs';
import BaseLayout from 'components/pages/BaseLayout';
import { connect } from 'react-redux';
import { colors } from 'style';
import { getStoragePromise, CACHED_USER } from 'utils/memory';
class Main extends Component {
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
      console.log(res);
      if(!res) {
        this.setState(prev => ({
          ...prev,
          currentPage: 'login'
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
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.page !== this.props) {
      this.setState(prev => ({
        ...prev,
        currentPage: nextProps.page
      }))
    }
  }
  
  render() {
    const { currentPage } = this.state;
    const { page, authenticated } = this.props;

    return (
        <BaseLayout authenticated={authenticated}>
          {
            currentPage === 'login' &&
            <Login />
          }
          {
            currentPage === 'profile' && authenticated &&
            <Profile />
          }
        <StatusBar
          backgroundColor={colors.darkG}
          barStyle="light-content" />  
        </BaseLayout>
    );
  }
}

const mapStateToProps = ({ ui, user }) => ({
  page: ui.get('page'),
  authenticated: user.get('authenticated')
})

const mapDispatchToProps = (dispatch) => ({
  onLoginCache: (dispatcher) => dispatch(dispatcher)
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);