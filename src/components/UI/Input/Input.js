import React, { Component } from "react";
import { 
  Text,
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import { colors } from 'style';
import SvgUri from 'react-native-svg-uri';
import * as Animatable from 'react-native-animatable';

type Props = {
  label?: string,
  invalid?: boolean,
  valid?: boolean,
  label?: string,
  focused?: boolean,
};
export default class Input extends Component<Props> {
  constructor(props) {
    super(props);
  }

  props: Props

  static DefaultProps = {
    invalid: false,
    valid: false,
    label: null,
    focused: false
  }

  shouldComponentUpdate(nextProps) {
    if(nextProps.invalid !== this.props.invalid) {
      return true;
    }
    return false;
  }

  render() {
    const {
      label,
      invalid,
      valid,
      value,
      focused,
      ...props
    } = this.props;

    return (
      <View style={[
        style.root,
        !invalid && { borderColor: colors.white },
        valid && { borderColor: 'green' },
        focused && { borderColor: 'green' }
      ]}>
        {label && <Text>{label}</Text>}
        <TextInput
          ref="_inputText"
          style={style.inputWrapper}
          underlineColorAndroid="transparent"
          { ...props }
        />
        { !invalid &&
          <Animatable.View animation="fadeIn" style={ style.icon }>
            <SvgUri
              width="20"
              height="20"
              fill={ colors.show500}
              source={require('assets/icons/check.svg')} />
          </Animatable.View>
        }
      </View>
    );
  }
}

const style = StyleSheet.create({
  root: {
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 2,
    borderStyle: 'solid',
    backgroundColor: colors.white,
    height: 38,
    flexDirection: 'row',
    marginBottom: 10
  },

  inputWrapper: {
    paddingLeft: 10,
    paddingRight: 10,
    top: 3,
    includeFontPadding: true,
    textAlignVertical: 'center',
    flexGrow: 1,
    alignSelf: 'stretch',
    color: colors.darkG,
  },

  icon: {
    right: 10,
    top: 8,
    position: 'absolute',
  }
});