// @flow
import {Provider, connect} from 'react-redux'
import React, { Component } from 'react';
import configureStore from './src/settings';
import Main from './src';
import { login } from 'actions/auth';

const store = configureStore();
type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}