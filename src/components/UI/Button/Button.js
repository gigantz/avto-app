import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { colors } from 'style';

type Props = {
  disabled?: boolean,
  title: string
}

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, white, transparent } = this.props;
    
    return (
      <TouchableOpacity onPress={this._onPressButton}>        
        <View style={ !transparent ? style.root : style.transparent }>
          <Text style={ !transparent ? style.text : style.text }> { title } </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const style = StyleSheet.create({
  root: {
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.goblin,
    borderRadius: 2,
    borderStyle: 'solid',
    backgroundColor: colors.goblin,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },

  white: {
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.goblin,
    borderRadius: 2,
    borderStyle: 'solid',
    backgroundColor: colors.white,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },

  transparent: {
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 2,
    backgroundColor: 'transparent',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },

  textWhite: {
    color: colors.goblin,
  },

  text: {
    color: colors.white,
  },
});

export default Button;