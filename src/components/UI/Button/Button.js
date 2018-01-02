import React, { PureComponent } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { colors, width } from 'style';
import FacebookIcon from './Facebook';
import Ripple from 'react-native-material-ripple';
import SVGUri from 'components/SVGUri';

type Props = {
  disabled?: boolean,
  title: string,
  white: boolean,
  textColor: Object,
  onPress: Function,
  disabled?: boolean,
  fullWidth: boolean,
}

class Button extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      style : styleProp,
      title,
      white,
      black,
      transparent,
      textColor,
      naked,
      onPress,
      disabled,
      buttonColor,
      borderColor,
      fullWidth,
      small,
      facebook,
      icon,
    } = this.props;

    const stateStyle = [
      style.root,
      transparent && style.transparent,
      naked && style.naked,
      white && style.white,
      black && style.black,
      fullWidth && { width: '100%' },
      small && { height: 25 },
      facebook && { backgroundColor: '#3b5998', borderColor: '#3b5998' },
      disabled && style.disabled,
    ];

    const stateTextStyle = [
      style.rootText,
      transparent && style.transparentText,
      naked && style.nakedText,
      white && style.whiteText,
      disabled && style.disabledText,
    ];
    
    return (
      <Ripple onPress={onPress} disabled={disabled}>
        <View style={[ stateStyle, buttonColor && { backgroundColor: buttonColor, borderColor }, styleProp, icon && { justifyContent: 'flex-start' } ]}>
          { facebook && <FacebookIcon /> }
          { icon && <SVGUri style={{ marginRight: 5 }} svgXmlData={icon} width="20" height="20" /> }
          <Text style={[ stateTextStyle, textColor && { color: textColor }, small && { fontSize: 12 } ]}> { title } </Text>
        </View>
      </Ripple>
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

  black: {
    borderColor: colors.darkG,
    backgroundColor: colors.darkG,
  },

  rootText: {
    color: colors.white,
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

  textWhite: {
    color: colors.goblin,
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

  transparentText: {
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

  nakedText: {
    color: colors.goblin,
  },

  disabled: {
    backgroundColor: colors.snow300,
    borderColor: colors.snow300,
  },

  disabledText: {
    color: colors.snow500
  },
});

export default Button;