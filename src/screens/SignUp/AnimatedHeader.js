import * as React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import localize from "localize";
import { colors, theme, width } from 'style';
import * as Animatable from 'react-native-animatable';
import ua from 'ua-parser-js';
import SvgUri from 'react-native-svg-uri';

const loginPhoneSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="55"><path fill="#FFF" fill-rule="nonzero" d="M25.3.08L3.17 2.4c-1.85.2-3.2 1.93-3 3.85l4.7 44.73c.2 1.92 1.9 3.33 3.73 3.14l22.14-2.33c1.84-.2 3.2-1.93 2.98-3.85l-4.7-44.73C28.82 1.3 27.15-.12 25.3.08zM10.96 4.13l7.08-.74c.22-.04.43.13.45.37 0 .23-.15.44-.37.46l-7.08.75c-.23.02-.43-.15-.45-.38-.03-.24.13-.45.36-.47zM19.5 51.2c-.94.1-1.77-.6-1.87-1.56-.1-.97.56-1.83 1.5-1.92.92-.1 1.75.6 1.85 1.57.1.95-.57 1.8-1.5 1.9zm11.58-5.98L6.9 47.76 2.73 8.06 26.9 5.5l4.18 39.72zm-15.24-23.8c.77-.07 1.43.07 1.98.43.07-.18.18-.34.33-.48.15-.14.3-.22.48-.24.27-.02.5.05.68.23.2.17.3.38.32.6l.47 4.5c.05.6.18.97.4 1.13.2.15.44.2.74.18.73-.08 1.2-.47 1.37-1.17.18-.7.2-1.74.06-3.1-.18-1.7-.86-2.98-2.05-3.84-1.18-.86-2.8-1.2-4.85-.97-2.13.2-3.7 1-4.7 2.33s-1.4 3.08-1.16 5.25c.2 2.18.95 3.8 2.2 4.87 1.26 1.06 2.94 1.48 5.05 1.26.64-.05 1.18-.16 1.62-.3.44-.16.82-.3 1.13-.46.32-.15.6-.3.84-.4.24-.14.48-.22.7-.24.23-.03.4.05.53.23.1.17.18.36.2.56.03.22-.13.46-.48.7-.35.26-.78.5-1.3.7-.5.2-1.03.4-1.6.54-.56.15-1.04.25-1.44.3-1.16.12-2.26.04-3.3-.23s-1.96-.73-2.78-1.37c-.8-.64-1.48-1.46-2-2.46-.53-1-.87-2.18-1-3.52-.15-1.33-.07-2.55.23-3.65.3-1.1.8-2.06 1.45-2.87.66-.8 1.47-1.45 2.43-1.94.95-.5 2.02-.8 3.2-.93 1.2-.13 2.3-.08 3.33.15 1.03.23 1.92.6 2.67 1.15.75.54 1.36 1.22 1.83 2.05.46.83.75 1.78.87 2.84.18 1.8.04 3.22-.44 4.26-.48 1.04-1.4 1.64-2.78 1.78-.46.05-.9-.03-1.3-.23-.42-.2-.7-.45-.84-.72-.18.24-.46.52-.84.85-.4.32-.95.52-1.7.6-.47.05-.9 0-1.33-.18-.42-.17-.8-.42-1.12-.75-.32-.33-.6-.75-.82-1.24-.22-.5-.37-1.04-.43-1.64-.07-.7-.02-1.3.15-1.85.17-.54.4-1 .72-1.4.3-.4.67-.7 1.08-.92.4-.23.8-.36 1.2-.4h.04zm-1.15 4.35c.06.7.26 1.28.58 1.7.3.44.73.63 1.26.57 1.2-.12 1.7-1.03 1.52-2.72-.1-.86-.3-1.46-.64-1.78-.34-.33-.77-.46-1.3-.4-.6.06-1 .35-1.22.86-.2.52-.28 1.1-.2 1.77z"/></svg>`;
const loginSmileSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="55"><path fill="#FFF" fill-rule="nonzero" d="M25.5.35L3.34 2.68C1.5 2.88.17 4.6.37 6.52l4.7 44.73c.2 1.92 1.87 3.34 3.72 3.14l22.12-2.33c1.85-.2 3.2-1.92 3-3.85L29.2 3.5C29 1.56 27.3.15 25.48.34zM11.13 4.4l7.1-.74c.2-.02.4.15.44.38.02.24-.14.44-.37.47l-7.07.75c-.22.03-.42-.14-.45-.38-.02-.23.14-.44.36-.46zm8.53 47.08c-.92.1-1.76-.6-1.86-1.57-.1-.95.58-1.8 1.5-1.9.93-.1 1.76.6 1.87 1.56.1.97-.57 1.83-1.5 1.92zm11.6-5.98L7.08 48.04 2.9 8.34 27.1 5.77l4.16 39.72zM17.6 36.07c3.33-.35 6.32-1.98 8.43-4.6.3-.37.24-.92-.13-1.22-.4-.3-.94-.25-1.24.13-1.8 2.24-4.4 3.64-7.25 3.94-2.86.3-5.67-.53-7.9-2.35-.4-.3-.94-.25-1.24.13-.32.38-.26.93.12 1.24 2.6 2.1 5.86 3.08 9.2 2.73zm-3.65-13.8c-.13-1.18-1.17-2.03-2.34-1.9-1.17.12-2.02 1.17-1.9 2.34.13 1.18 1.17 2.03 2.34 1.9 1.17-.12 2.02-1.17 1.9-2.34zm8.27-.76c-.13-1.16-1.18-2-2.34-1.9-1.17.14-2.02 1.18-1.9 2.36.13 1.17 1.18 2.02 2.34 1.9 1.17-.13 2.02-1.18 1.9-2.35z"/></svg>`;
const loginLockSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="55"><path fill="#FFF" fill-rule="nonzero" d="M25.75.4L3.62 2.75c-1.85.2-3.2 1.92-3 3.84l4.7 44.73c.22 1.93 1.9 3.35 3.73 3.15l22.14-2.32c1.83-.2 3.18-1.92 2.97-3.85l-4.7-44.73C29.27 1.63 27.6.22 25.75.4zM11.4 4.48l7.1-.75c.22-.02.42.15.44.38.03.24-.14.44-.36.47l-7.08.74c-.23.04-.43-.13-.45-.37-.03-.23.14-.44.36-.46zm8.54 47.07c-.93.1-1.76-.6-1.86-1.57-.1-.96.56-1.82 1.5-1.92.92-.1 1.75.6 1.85 1.57.1.97-.57 1.83-1.5 1.92zm11.6-5.98L7.33 48.1 3.2 8.4l24.18-2.56 4.17 39.72zm-7.87-23l-.4.04-.2-1.9c-.37-3.53-3.45-6.18-6.92-5.88-.1 0-.3.03-.38.04-3.46.42-5.92 3.66-5.55 7.18l.2 1.9-.4.05c-.63.05-1.07.75-.98 1.55l1 9.56c.1.8.66 1.4 1.28 1.34L24.98 35c.62-.06 1.06-.77.97-1.57l-1-9.55c-.08-.8-.66-1.4-1.28-1.33zm-4.9 6.8l.3 2.88c.04.33-.2.63-.53.67l-1.35.15c-.34.04-.65-.2-.68-.55l-.3-2.88c-.35-.28-.6-.7-.64-1.18-.1-.92.53-1.78 1.4-1.9l.4-.05c.9-.07 1.67.65 1.77 1.56.05.48-.1.94-.38 1.3zm1.84-6.5l-3.57.4-.38.03-3.57.37-.2-1.9c-.22-2.1 1.28-4.02 3.36-4.24 2.07-.22 3.95 1.34 4.17 3.44l.2 1.9z"/></svg>`;

const AnimatedHeader = ({ focused, validation, locale, _animatedHeader }) => {
  return (
    <View>
      <Animatable.View style={[ theme.header, { opacity: focused ? 1 : 0 } ]} ref={(input) => { _animatedHeader(input); }}>
        <Animatable.View easing="ease-in" duration={200} animation={ focused === 'login' ? "slideInUp" : "slideOutUp"} style={ style.animationHeader }>
          <Animatable.View style={{ left: 15, top: 5 }} animation={ focused === 'login' ? "rubberBand" : ""}>
            <SvgUri
              width="46"
              height="90"
              fill={ !validation.login ? '#C37200' : '#FFFFFF'}
              svgXmlData={loginPhoneSVG} />
          </Animatable.View>
          <Text style={[ style.headerTitle]}>
            {localize[locale].signup_loginHeader}
          </Text>
        </Animatable.View>
        
        <Animatable.View easing="ease-in" duration={200} animation={ focused === 'fullname' ? "slideInUp" : "slideOutUp"}  style={ style.animationHeader }>
          <Animatable.View style={{ left: 15, top: 5 }} animation={ focused === 'fullname' ? "rubberBand" : ""}>
            <SvgUri
              width="46"
              height="90"
              fill={ !validation.fullname ? '#340F8F' : '#FFFFFF'}
              svgXmlData={loginSmileSVG} />
          </Animatable.View>
          <Text style={[ style.headerTitle ]}>
            {localize[locale].signup_fullnameHeader}
          </Text>
        </Animatable.View>

        <Animatable.View easing="ease-in" duration={200} animation={ focused === 'password' ? "slideInUp" : "slideOutUp"} style={ style.animationHeader }>
          <Animatable.View style={{ left: 15, top: 5 }} animation={ focused === 'password' ? "rubberBand" : ""}>
            <SvgUri
              width="46"
              height="90"
              fill={ !validation.password ? '#340F8F' : '#FFFFFF'}
              svgXmlData={loginLockSVG} />
          </Animatable.View>
          <Text style={ style.headerTitle }>
            {localize[locale].signup_passwordHeader}
          </Text>
        </Animatable.View>
        <StatusBar
        {...bgColors[focused]}
        barStyle="light-content" />
      </Animatable.View>
    </View>
  )
}

const backgroundChange = {
  from: {
    backgroundColor: colors.darkG,
  },
  to: {
    backgroundColor: colors.orange,
  },
};

Animatable.initializeRegistryWithDefinitions({
  backgroundChange
});

const bgColors = {
  default: {
    backgroundColor: colors.darkG
  },
  login: {
    backgroundColor: colors.orange,
  },
  fullname: {
    backgroundColor: colors.pony,
  },
  password: {
    backgroundColor: colors.purple,
  },
}

export const style = StyleSheet.create({
  ...bgColors,
  animationHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    position: 'absolute',
    width: '100%'
  },
  headerTitle: {
    color: colors.white,
    fontSize: 12,
    width: 160,
    marginLeft: 25,
    marginRight: 10,
    paddingTop: 15,
  }
});

export default AnimatedHeader;