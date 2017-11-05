import { StackNavigator, TabNavigator } from 'react-navigation';
import Login from 'screens/Login';
import SignUp from 'screens/SignUp';
import HomeScreen from 'screens/HomeScreen';
import Profile from 'screens/Profile';
import Welcome from 'screens/Welcome';
import Tabs from 'components/TabsNav';

const Main = TabNavigator({
  Welcome2: { screen: Welcome },
  Login: { screen: Login },
  Welcome: { screen: Welcome },
  Avto: { screen: Welcome },
  Profile: { screen: Profile },
}, {
  initialRouteName: 'Profile',
  tabBarComponent: Tabs,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
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
  }
},{
  headerMode: 'none'
  }
);

export default screens;