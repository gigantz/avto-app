import { StyleSheet, Dimensions, Platform } from 'react-native';

export const {height, width} = Dimensions.get('window');
export const android = Platform.OS === 'android';

export const colors = {
  borderColor: '#DBE2EB',
  white: '#FFFFFF',
  dark: '#38444c',
  darkG: '#262D45',
  lighterG: '#414963',
  darkerG: '#161B29',
  darkG1: '#273444',
  darkG200: '#1F2A38',
  darkG500: '#1A2329',
  snow200: '#F8F9FB',
  snow300: '#ECF0F5',
  snow500: '#C2CCD9',
  snow600: '#788ba0',

  fizzy: '#4A5370',
  goblin: '#30C465',
  deadgoblin: '#47CB7A',
  horror: '#E53935',
  purple: '#9013FE',
  orange: '#FF9800',
  pony: '#6D1BFF',

  opatown: `rgba(255, 255, 255, 0.9)`,
  opatownBlack:  'rgba(38, 45, 69, 0.9)',
};

export const theme = StyleSheet.create({
  base: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  darkPage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.darkG
  },
  padd: {
    width: width - 40
  },
  full: {
    width: width,
    padding: 20,
  },
  signupPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width,
    height: 70,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: 40,
    left: 0,
    top: height - (android ? 60 : 40), 
    width: width,
  },
  footerText: {
    color: colors.white,
    backgroundColor: 'rgba(0,0,0,0)',
    marginRight: 5,
    padding: 15,
    paddingRight: 0,
    zIndex: 2,
    top: 10,
  },
  footerTextLink: {
    color: colors.white,
    backgroundColor: 'rgba(0,0,0,0)',
    padding: 15,
    paddingLeft: 0,
    zIndex: 2,
    top: 10,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    color: colors.snow600,
    marginBottom: 5
  },
  warning: {
    color: colors.horror,
    marginBottom: 10
  },
  h1: {
    fontSize: 20,
    width: '80%',
    fontWeight: 'bold',
    color: colors.darkG,
    marginBottom: 5,
    textAlign: 'center'
  },
  loading: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.opatownBlack,
    position: 'absolute',
    zIndex: 10,
  },
  profileHeader: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'column',
    padding: 20,
    marginTop: 10,
  },
  profilePicture: {
    borderRadius: 45,
    width: 90,
    height: 90,
    alignSelf: 'center',
  },
  mediumText: {
    color: colors.darkG,
    fontSize: 20,
    backgroundColor: 'transparent',
  },
  smallText: {
    fontSize: 12,
    color: colors.snow600,
    backgroundColor: 'transparent',
  },
  block: {
    width
  },

  selectItem: {
    padding: 15,
    fontSize: 15,
    backgroundColor: colors.white,
    width: '100%',
    color: colors.darkG,
  },

  separator: {
    width: '100%',
    borderColor: colors.snow300,
    borderWidth: 1,
    borderStyle: 'solid',
    borderBottomWidth: 0,
  },

  hiBlock: {
    alignItems: 'center',
    borderColor: colors.snow500,
    flexDirection: 'row',
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 20,
    borderRadius: 4
  },

  tag: {
    backgroundColor: colors.darkG,
    color: colors.white,
    padding: 5,
    borderRadius: 4,
    margin: 2,
    fontSize: 10,
  },

  rightTop: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 10,
  }
});

export const alertColors = {
  MAIN_INFO_COLOR: '#2B73B6',
  MAIN_WARN_COLOR: '#cd853f',
  MAIN_ERROR_COLOR: '#cc3232',
  MAIN_SUCCESS_COLOR: '#32A54A',
  MAIN_CUSTOM_COLOR: '#6441A4',
  MAIN_DISMISS_COLOR: '#748182',
}

export default {
  colors,
  theme,
  width,
  android,
  alertColors,
}