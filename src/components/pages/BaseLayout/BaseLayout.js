import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors, theme } from 'style';

export default class Main extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={ theme.base }>
        { this.props.children }
        { !this.props.authenticated &&
          <View style={ theme.footer }>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={ () => {} }>
            <Text style={ theme.footerText }>
              AvtoBirlikdə yenisən? 
            </Text>
            <Text style={ theme.footerTextLink }>
              Qeydiyyatdan keç
            </Text>
          </TouchableOpacity>
          </View>
        }
      </View>
    )
  }
}