// @flow

import * as React from 'React';
import { View, Text, StatusBar } from 'react-native';
import { theme, colors } from 'style';
import localize from 'localize';
import { connect } from 'react-redux';

import Button from 'components/UI/Button';
import SVGUri from 'components/SVGUri';
import * as Animatable from 'react-native-animatable';

const carSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="135" height="105" viewBox="0 0 135 105"><g fill="none" fill-rule="evenodd"><g fill-rule="nonzero"><path fill="#FFB47D" d="M128.6 74.97c-4.23-2.65-17.88-6.03-37.02-6.03l-10.1-11.96C79.32 54.45 76.2 53 72.93 53H42.67c-3.22 0-6.33 1.17-8.77 3.3L21.96 66.66 9.24 68.5c-1.8.27-3.28 1.62-3.73 3.42L4 78.06 37.68 94H132V81.12c0-2.5-1.3-4.83-3.4-6.15z"/><path fill="#FF9164" d="M132 83.2c0-4.6-6.74-9.2-38.18-9.2H6.25C5 74 4 75.03 4 76.3v13.8L46.67 97H132V83.2z"/><path fill="#FF7D5A" d="M132.74 91.5H26.84l-20.1-4.45c-1.2-.26-2.4.5-2.7 1.7-.26 1.22.5 2.43 1.73 2.7l20.33 4.5c.16.03.32.05.5.05h106.14c1.25 0 2.26-1 2.26-2.25 0-1.24-1-2.25-2.26-2.25z"/><circle cx="113.5" cy="91.5" r="11.5" fill="#EDEDEE"/><path fill="#504B5A" d="M112.5 105c-7.44 0-13.5-6.06-13.5-13.5S105.06 78 112.5 78 126 84.06 126 91.5s-6.06 13.5-13.5 13.5zm0-22.5c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9z"/><circle cx="112.5" cy="91.5" r="4.5" fill="#DCDBDE"/><circle cx="26.5" cy="91.5" r="11.5" fill="#EDEDEE"/><path fill="#504B5A" d="M26.5 105C19.06 105 13 98.94 13 91.5S19.06 78 26.5 78 40 84.06 40 91.5 33.94 105 26.5 105zm0-22.5c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9z"/><circle cx="27.5" cy="91.5" r="4.5" fill="#DCDBDE"/><path fill="#FF7D5A" d="M94.6 85.98H47.47c-1.24 0-2.24-.88-2.24-1.96 0-1.1 1-1.97 2.24-1.97H94.6c1.24 0 2.25.88 2.25 1.97 0 1.08-1 1.96-2.25 1.96zM132.76 85.98h-2.25c-1.23 0-2.23-.88-2.23-1.96 0-1.1 1-1.97 2.24-1.97h2.26c1.24 0 2.24.88 2.24 1.97 0 1.08-1 1.96-2.24 1.96z"/><path fill="#FF9164" d="M23 66.7l12-10.4c2.46-2.13 5.58-3.3 8.82-3.3h30.44c3.3 0 6.43 1.46 8.57 4L93 69H39.54c-2 0-3.98-.17-5.94-.5L23 66.7z"/><path fill="#625D6B" d="M71.32 56.68c-.86-1.06-2.14-1.68-3.48-1.68h-20.9c-1.2 0-2.36.5-3.2 1.37l-6.8 7c-.6.62-.94 1.45-.94 2.33 0 1.82 1.43 3.3 3.2 3.3h39.67c.96 0 1.48-1.15.87-1.9l-8.42-10.42z"/><path fill="#504B5A" d="M51.75 69H45l4.5-14H54"/><path fill="#EDEDEE" d="M129.9 76h-1.87c-1.12 0-2.03.9-2.03 2s.9 2 2.03 2H132c-.18-1.56-.9-2.96-2.1-4z"/><path fill="#625D6B" d="M81.7 56.74c-.55-.65-1.16-1.23-1.82-1.74h-3.73c-.97 0-1.5 1.15-.88 1.9l8.5 10.42c.87 1.06 2.15 1.68 3.5 1.68H92L81.7 56.74z"/><path fill="#FF6464" d="M4 76v2h4c1.1 0 2-.9 2-2s-.9-2-2-2H6c-1.1 0-2 .9-2 2z"/><circle cx="68" cy="43" r="4" fill="#FF4B4E"/><circle cx="27" cy="51" r="4" fill="#FFCA54"/><circle cx="86" cy="40" r="4" fill="#00CDB3"/><path fill="#57BAE5" d="M119.7 66.73c2.33 0 4.23-.86 4.23-3.16 0-2.3-1.9-4.16-4.24-4.16-2.35 0-4.25 1.87-4.25 4.17s1.9 3.16 4.24 3.16z"/><ellipse cx="44.49" cy="21.23" fill="#57BAE5" rx="4.24" ry="4.16"/><path fill="#F99830" d="M22.47 37.96c-2.24-.46-6.13-3.45-4.8-11.5.47-2.96-.12-3.2-3.37-4-3.16-.75-7.95-1.9-8.3-9.07-.06-1.26.85-2.33 2.02-2.4 1.18-.06 2.18.9 2.24 2.16.17 3.56 1.74 4.1 5 4.88 2.9.7 7.8 1.9 6.6 9.2-.92 5.52 1.4 6.25 1.4 6.25 1.16.23 1.92 1.42 1.7 2.65-.22 1.24-1.34 2.04-2.5 1.8z"/><circle cx="9" cy="45" r="3" fill="#57BAE5"/><circle cx="3" cy="60" r="3" fill="#FFCA54"/><path fill="#FF4B4E" d="M102.73 40.12c-.9-.85-.93-2.23-.05-3.1l3.2-3.12c.87-.86 2.32-.88 3.23-.04.92.84.94 2.22.06 3.1l-3.2 3.1c-.87.88-2.32.9-3.23.06zM40.73 38.9L36.5 37.3c-1.18-.45-1.75-1.72-1.27-2.84.47-1.12 1.8-1.66 2.98-1.2l4.25 1.62c1.17.45 1.74 1.73 1.27 2.85-.48 1.13-1.8 1.67-3 1.2z"/><path fill="#00CDB3" d="M61.14 32.84L57.3 31.2c-1.06-.44-1.58-1.72-1.15-2.83.43-1.12 1.64-1.66 2.7-1.2l3.85 1.62c1.06.44 1.58 1.72 1.15 2.83-.43 1.13-1.65 1.66-2.7 1.2z"/><path fill="#F99830" d="M87.4 1.88C87.16.64 86-.18 84.76.03c-1.23.22-2.05 1.4-1.83 2.64.6 3.5-.9 4.4-4.08 5.94-2.86 1.4-7.66 3.72-4.8 10.54 2.2 5.2-.06 6.44-.06 6.44-.63.42-2.63 1.17-1.78 3.2 1.48 3.54 10.64-.43 6.02-11.4-1.16-2.76-.6-3.13 2.58-4.67 3.1-1.5 7.8-3.78 6.57-10.82zM121.84 34.96c-1.02-.7-2.43-.46-3.15.57-1.66 2.38-1.98 5.22-2.26 7.72-.5 4.3-.68 5.92-5.16 5.63-4.94-.32-8.64.75-10.98 3.16-2.88 2.97-2.78 7.07-.06 7.12 2.26.03 2.4-2.4 2.4-2.4s.48-3.85 8.35-3.35c12.38.8 8.42-10.97 11.4-15.27.72-1.03.47-2.45-.56-3.17z"/></g></g></svg>`;

const Splash = ({ locale, firstname, navigation, start }) => (
  <View style={[theme.base]}>
    <Animatable.View useNativeDriver animation="fadeInUp">
      <SVGUri
        svgXmlData={carSvg}
        width="125"
        height="85"
        style={{ marginBottom: 20 }}
      />
    </Animatable.View>
    <Animatable.View useNativeDriver delay={200} animation="fadeInUp">
      <Text style={theme.h1}>
        {localize[locale].afterSignup}, {firstname}
      </Text>
    </Animatable.View>
    <Animatable.View
      animation="fadeIn"
      delay={300}
      useNativeDriver
      style={{ position: 'absolute', bottom: 0, width: '100%', padding: 20 }}
    >
      <Button onPress={start} title={localize[locale].getStarted} fullWidth />
    </Animatable.View>
    <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
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
