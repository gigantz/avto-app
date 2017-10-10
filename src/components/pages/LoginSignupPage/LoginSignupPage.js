import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, Image } from "react-native";
import { getMarks, clearCarCache, MARKS } from "actions/auto";

import localize from "localize";
import { colors, theme, width } from 'style';
import Input from 'components/UI/Input';
import Button from 'components/UI/Button';
import Misc from 'components/UI/Misc';
const { TextLine } = Misc;

class LoginSignupPage extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    selectedMarkValue: 0,
    selectedMark: ""
  };

  componentWillMount() {
    this.props.onGetMarks();
  }

  _selectHandler = (itemValue, itemIndex) => {
    const { auto } = this.props;
    const marks = auto.get("marks");

    this.setState({
      selectedMarkValue: itemValue,
      selectedMark: marks[itemIndex].label
    });
  };

  render() {
    const { auto, locale } = this.props;
    const marks = auto.get("marks");
    const { selectedMark, selectedMarkValue } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image style={{ width: 220, height: 80, marginBottom: 20 }} source={require('assets/img/logo_1000.png')} />
        <View style={[ theme.padd, { marginBottom: 20 }]}>
          <Input
            keyboardType="email-address"
            placeholder={ localize[locale].emailInput }
            onChangeText={() => {}}
          />
          <Input
            placeholder={ localize[locale].passwordInput }
            secureTextEntry
            onChangeText={() => {}}
          />
          <Button
            title={ localize[locale].loginBtn }
            transparent
          />
        </View>
        {/* {<TextLine text={ localize[locale].or } size="medium" />
        <View>
          <Button
            title="Sign up"
            transparent
          />
        </View>} */}
      </View>
    );
  }
}

const mapStateToProps = ({ auto, user }) => ({
  auto,
  locale: user.get('locale')
});

const mapDispatchToProps = dispatch => ({
  onGetMarks: () => dispatch(getMarks()),
  onClearCarCache: key => dispatch(clearCarCache(key))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignupPage);
