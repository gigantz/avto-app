import { StyleSheet, Dimensions } from 'react-native';

const {height, width} = Dimensions.get('window');

export const colors = {
  borderColor: '#DBE2EB',
  white: '#FFFFFF',
  darkG: '#273444',
  darkG500: '#1A2329',
  snow200: '#F8F9FB',
  snow300: '#ECF0F5',
  snow500: '#C2CCD9',

  fizzy: '#4A5370',
  goblin: '#30C465'
};

export const theme = StyleSheet.create({
  base: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.fizzy,
  },
  padd: {
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 2,
    width: width - 40
  }
});

export default {
  colors,
  theme
}