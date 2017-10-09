import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import { getMarks, clearCarCache, MARKS } from "actions/auto";

import localize from "localize";
import { colors, theme } from 'style';
import Input from 'components/UI/Input';
import Button from 'components/UI/Button';

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
      <View>
        <View style={[ theme.padd, { marginBottom: 20 }]}>
          <Input
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
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20, }}>
          <View style={{ borderTopColor: '#82849B', borderTopWidth: 1, borderStyle: 'solid', flexGrow: 1 }} />
          <Text style={{ textAlign: 'center', color: '#82849B', paddingLeft: 10, paddingRight: 10 }}>və ya</Text>
          <View style={{ borderTopColor: '#82849B', borderTopWidth: 1, borderStyle: 'solid', flexGrow: 1 }} />
        </View>
        <View>
          <Button
            title="Sign up"
            transparent
          />
        </View>
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
