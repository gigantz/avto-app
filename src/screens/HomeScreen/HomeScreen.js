import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, StatusBar } from "react-native";
import SVGUri from 'components/SVGUri';
import * as Animatable from 'react-native-animatable';
import config from 'config';
import { theme, colors } from 'style';
import Logo from 'assets/svg/Logo';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[ theme.base, { backgroundColor: colors.white }]}>
        <Logo />
        <StatusBar
        backgroundColor={colors.darkerG}
        barStyle="light-content" />
      </View>
    );
  }
}

export default Main;