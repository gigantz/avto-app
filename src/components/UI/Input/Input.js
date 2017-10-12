import React, { Component } from "react";
import { 
  Text,
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import { colors } from 'style';

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
        invalid && { borderColor: 'red' },
        valid && { borderColor: 'green' },
        focused && { borderColor: 'green' }
      ]}>
        {label && <Text>{label}</Text>}
        <TextInput
          style={style.inputWrapper}
          underlineColorAndroid="transparent"
          { ...props }
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  root: {
    position: 'relative',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 2,
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
});


