import { StackNavigator } from 'react-navigation';
import Login from 'screens/Login';
import SignUp from 'screens/SignUp';
import HomeScreen from 'screens/HomeScreen';
import Profile from 'screens/Profile';

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
  Profile: {
    screen: Profile,
    path: 'profile'
  },
},{ headerMode: 'none' }
);

export default screens;