import React from 'React';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { colors } from 'style';

/*
* Text Line Component
*/

type TextLineProps = {
  text: string,
  size: string
};

const fontSizes = {
  small: {
    fontSize: 10,
  },
  medium: {
    fontSize: 14,
  },
  large: {
    fontSize: 20
  }
}

export const TextLine = ({ text, size }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20, paddingLeft: 20, paddingRight: 20,}}>
    <View style={ style.viewLine } />
    <Text style={[style.textLine, fontSizes[size] ]}>{text}</Text>
    <View style={ style.viewLine } />
  </View>
)

const style = StyleSheet.create({
  viewLine: {
    borderTopColor: colors.snow200,
    borderTopWidth: 1,
    borderStyle: 'solid',
    flexGrow: 1
  },
  textLine: {
    textAlign: 'center',
    color: colors.snow500,
    paddingLeft: 10,
    paddingRight: 10
  }
});

export default {
  TextLine
};