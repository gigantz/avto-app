import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { theme } from 'style';

export default class Main extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={ theme.base }>
        { this.props.children }
      </View>
    )
  }
}