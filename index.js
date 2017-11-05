import { AppRegistry } from 'react-native';
import App from './App';

if((process.env.NODE_ENV || '').toLowerCase() === 'production'){
  // disable console. log in production
  console.log = function () {};
  console.info = function () {};
  console.warn = function () {};
  console.error = function () {}
  console.debug = function () {}
}

AppRegistry.registerComponent('avtomapp', () => App);
