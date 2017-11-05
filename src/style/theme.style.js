import { StyleSheet, Dimensions, Platform } from 'react-native';

export const {height, width} = Dimensions.get('window');
export const android = Platform.OS === 'android';

export const colors = {
  borderColor: '#DBE2EB',
  white: '#FFFFFF',
  dark: '#38444c',
  darkG: '#273444',
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

  opatown: `rgba(255, 255, 255, 0.9)`
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
    backgroundColor: colors.opatown,
    position: 'absolute',
    zIndex: 10,
  },
  profileHeader: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'column',
    padding: 20,
  },
  profilePicture: {
    borderRadius: 100,
    width: 120,
    height: 120,
    marginBottom: 10,
    alignSelf: 'center',
  },
  mediumText: {
    color: colors.darkG,
    fontSize: 20
  },
  smallText: {
    fontSize: 12,
    color: colors.snow600
  },
  block: {
    backgroundColor: colors.snow200,
    width
  }
});

export default {
  colors,
  theme,
  width,
  android
}