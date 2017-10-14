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
  title: string,
  white: boolean,
  textColor: Object,
  onPress: Function,
  disabled?: boolean,
}

class Button extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.disabled !== this.props.disabled) {
      return true;
    }
    return false;
  }

  render() {
    const { title, white, transparent, textColor, naked, onPress, disabled } = this.props;
    
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled}>        
        <View style={[ !transparent ? !naked ? style.root : style.naked : style.transparent, disabled && { opacity: 0.7 } ]}>
          <Text style={ !transparent ? !naked ? style.text : style.textTransparent : style.textTransparent }> { title } </Text>
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
    opacity: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    borderColor: colors.goblin,
    borderStyle: 'solid',
    borderRadius: 2,
    backgroundColor: 'transparent',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },

  textTransparent: {
    color: colors.goblin,
  },

  naked: {
    position: 'relative',
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