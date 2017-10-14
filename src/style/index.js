import { StyleSheet, Dimensions } from 'react-native';

const {height, width} = Dimensions.get('window');

export const colors = {
  borderColor: '#DBE2EB',
  white: '#FFFFFF',
  darkG: '#273444',
  darkG200: '#1F2A38',
  darkG500: '#1A2329',
  snow200: '#F8F9FB',
  snow300: '#ECF0F5',
  snow500: '#C2CCD9',

  fizzy: '#4A5370',
  goblin: '#30C465',
  horror: '#FFEB3B',
};

export const theme = StyleSheet.create({
  base: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkG,
  },
  padd: {
    borderRadius: 4,
    width: width - 40
  },
  footer: {
    position: 'absolute',
    padding: 15,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.darkG500,
    flex: 1,
    flexDirection: 'row',
  },
  footerText: {
    color: colors.snow500,
    marginRight: 5,
  },
  footerTextLink: {
    color: colors.goblin,
  },
  label: {
    fontSize: 10,
    color: colors.borderColor,
    marginBottom: 5
  },
  warning: {
    color: colors.horror,
    marginBottom: 10
  }
});

export default {
  colors,
  theme,
  width
}