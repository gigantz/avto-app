// @flow

import * as React from 'React';
import { View, Text, StatusBar } from 'react-native';
import { theme, colors } from 'style';
import localize from 'localize';
import { connect } from 'react-redux';

import Button from 'components/UI/Button';
import * as Animatable from 'react-native-animatable';

const Splash = ({ locale, firstname, navigation, start }) => (
  <View style={[theme.base]}>
    <Text>
      Reset password
    </Text>
  </View>
);

export default connect(
  ({ user: { locale, firstname } }) => ({
    locale,
    firstname,
  }),
  dispatch => ({
    start: () => {
      dispatch({ type: 'REDIRECT_TO', pathto: 'Main' });
      global.alertDown.alertWithType('success', `Yeni dostumuz,`, 'Xoş gəldin buralara!');
    }
  })
)(Splash);
