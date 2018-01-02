import { StackNavigator, TabNavigator } from 'react-navigation';
import Login from 'screens/Login';
import SignUp from 'screens/SignUp';
import HomeScreen from 'screens/HomeScreen';
import Restore from 'screens/Restore';
import Profile from 'screens/Profile';
import Welcome from 'screens/Welcome';
import Tabs from 'components/TabsNav';
import SelectAuto from 'components/SelectAuto';

const Main = TabNavigator({
  Welcome2: { getScreen: () => require('screens/Welcome').default },
  Login: { getScreen: () => require('screens/Login').default },
  Welcome: { getScreen: () => require('screens/Welcome').default },
  MyAuto: { getScreen: () => require('screens/MyAuto').default },
  Profile: { getScreen: () => require('screens/Profile').default },
}, {
  initialRouteName: 'MyAuto',
  tabBarComponent: Tabs,
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  animationEnabled: true,
  lazy: true,
});

export const REDIRECT_TO = "REDIRECT_TO";
export const screens = StackNavigator({
  Home: {
    screen: HomeScreen,
    path: 'home'
  },
  Login: {
    screen: Login,
    path: 'login'
  },
  SignUp: {
    screen: SignUp,
    path: 'sign-up'
  },
  Welcome: {
    screen: Welcome,
    path: 'Welcome'
  },
  Main: {
    screen: Main
  },
  Restore: {
    screen: Restore,
    path: 'Restore'
  },
  SelectAuto: {
    screen: SelectAuto
  }
},{
  headerMode: 'none'
  }
);

export default screens;