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
    if(nextProps.value !== this.props.value) {
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
        !invalid && { borderColor: colors.snow200, backgroundColor: colors.snow200 },
        valid && { borderColor: 'green' },
        focused && { borderColor: 'green' }
      ]}>
        {label && <Text>{label}</Text>}
        <TextInput
          ref="_inputText"
          value={value}
          style={style.inputWrapper}
          underlineColorAndroid="transparent"
          placeholderTextColor={colors.snow500}
          { ...props }
        />
        { !invalid &&
          <Animatable.View animation="fadeIn" style={ style.icon }>
            <SvgUri
              width="20"
              height="20"
              fill={ colors.show500}
              svgXmlData={`<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 191.667 191.667" style="enable-background:new 0 0 191.667 191.667;" xml:space="preserve"><path d="M95.833,0C42.991,0,0,42.99,0,95.833s42.991,95.834,95.833,95.834s95.833-42.991,95.833-95.834S148.676,0,95.833,0z	 M150.862,79.646l-60.207,60.207c-2.56,2.56-5.963,3.969-9.583,3.969c-3.62,0-7.023-1.409-9.583-3.969l-30.685-30.685	c-2.56-2.56-3.97-5.963-3.97-9.583c0-3.621,1.41-7.024,3.97-9.584c2.559-2.56,5.962-3.97,9.583-3.97c3.62,0,7.024,1.41,9.583,3.971	l21.101,21.1l50.623-50.623c2.56-2.56,5.963-3.969,9.583-3.969c3.62,0,7.023,1.409,9.583,3.969	C156.146,65.765,156.146,74.362,150.862,79.646z" fill="#273444"/></svg>`} />
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
    borderColor: colors.borderColor,
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