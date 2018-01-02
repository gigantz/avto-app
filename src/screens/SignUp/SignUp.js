import * as React from 'react';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Svg, { Circle } from 'react-native-svg';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Platform
} from 'react-native';

import { signup, facebookSignup } from 'actions/auth';

import localize from 'localize';
import { colors, theme, width, android } from 'style';
import { validator, rules, emailOrPhone } from 'utils/validation';
import Input from 'components/UI/Input';
import Button from 'components/UI/Button';
import Misc from 'components/UI/Misc';
import Loading from 'components/UI/Loading';

const { TextLine } = Misc;

type Props = {
  authenticated: boolean,
  locale: string
};

type State = {
  login?: string,
  fullname?: string,
  password?: string,
  repeatPassword?: string,
  validation: {
    login: boolean,
    fullname: boolean,
    password: boolean,
    repeatPassword: boolean
  }
};

export class SignUp extends React.Component<Props, State> {
  props: Props;
  state: State;

  constructor(props) {
    super(props);
    this.state = {
      login: '',
      fullname: '',
      password: '',
      repeatPassword: '',
      loginProp: '',
      validation: {
        login: false,
        fullname: false,
        password: false,
        repeatPassword: false,
      }
    };
  }

  componentDidMount() {
    this.setState(prev => ({
      ...prev
    }));
  }

  _changeText = (type, value) => {
    const loginProp = emailOrPhone(value) || 'email';
    this.setState(prev => ({
      ...prev,
      loginProp,
      [type]: value,
      validation: {
        ...this.state.validation,
        ...{ [type]: validator(type, value) }
      }
    }));
  };

  _passwordFocus = () => {
    this.setState(prev => ({
      ...prev,
      password: '',
      repeatPassword: '',
      validation: {
        ...this.state.validation,
        ...{ password: false, repeatPassword: false }
      }
    }));

    this._repeatPassword.refs._inputText.clear();
    this._password.refs._inputText.clear();
  };

  _focusNext = input => {
    this[input].refs._inputText.focus();
  };

  _login = () => {
    this.props.onRedirect({
      type: 'Navigation/NAVIGATE',
      routeName: 'Login'
    });
  };

  _signUp = () => {
    const {
      validation,
      login,
      password,
      repeatPassword,
      fullname
    } = this.state;
    const isValid =
      !!validation &&
      !Object.keys(validation)
        .map(key => validation[key])
        .includes(false) &&
      password === repeatPassword;
    if (isValid) {
      this.props.onSignUp(login, password, fullname);
    }
  };

  _FBsignup = () => {
    this.props.onFacebookSignup();
  }

  render() {
    const { locale, error, loading, authenticated } = this.props;
    const {
      login,
      fullname,
      password,
      repeatPassword,
      focused,
      validation,
      loginProp
    } = this.state;
    const isValid =
      validation &&
      !Object.keys(validation)
        .map(key => validation[key])
        .includes(false) &&
      password === repeatPassword;
    const isMail = loginProp === 'email' || emailOrPhone(login) === 'email';

    return (
      <ScrollView contentContainerStyle={theme.base}>
        {loading && <Loading />}
        <View style={[theme.footer, { top: 0 }]}>
          <Animatable.View
            animation="bounceInDown"
            useNativeDriver
            style={{ position: 'absolute', right: 0, left: 0 }}
          >
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                padding: 20,
                alignSelf: 'center',
                top: android ? -10 : 10
              }}
              onPress={this._login}
            >
              <Text style={theme.footerText}>Artıq üzvümüzsən?</Text>
              <Text style={theme.footerTextLink}>Daxil ol</Text>
            </TouchableOpacity>
            <Svg
              height="100"
              width={width}
              style={{
                position: 'absolute',
                zIndex: -1,
                top: android ? 0 : 20,
                left: 0,
                right: 0,
                alignSelf: 'center'
              }}
            >
              <Circle
                cx={width / 2 + 5}
                cy={-width + 85}
                r={width}
                fill={colors.goblin}
              />
            </Svg>
          </Animatable.View>
        </View>
        <View style={[theme.full, { backgroundColor: colors.white, opacity: 1, marginTop: 35}]}>
          <Text style={theme.label}>
            {emailOrPhone(login)
              ? localize[locale][loginProp]
              : localize[locale].loginInput}
          </Text>
          <Input
            placeholder={localize[locale].signup_email_phone}
            returnKeyType={'next'}
            invalid={!validation['login']}
            keyboardType={'email-address'}
            value={login}
            onSubmitEditing={() => this._focusNext('_fullname')}
            onChangeText={value => {
              this._changeText('login', value);
            }}
          />
          <Text style={theme.label}>
            {localize[locale].signup_fullname_label}
          </Text>
          <Input
            placeholder={localize[locale].signup_fullname}
            returnKeyType={'next'}
            invalid={!validation['fullname']}
            ref={c => (this._fullname = c)}
            value={fullname}
            onSubmitEditing={() => this._focusNext('_password')}
            onChangeText={value => {
              this._changeText('fullname', value);
            }}
          />
          <Text style={theme.label}>{localize[locale].passwordInput}</Text>
          <Input
            placeholder="•••••••"
            returnKeyType={'next'}
            secureTextEntry
            value={password}
            onSubmitEditing={() => this._focusNext('_repeatPassword')}
            invalid={!validation['password']}
            ref={c => (this._password = c)}
            onFocus={this._passwordFocus}
            onChangeText={value => {
              this._changeText('password', value);
            }}
          />
          <Text style={theme.label}>
            {localize[locale].passwordRepeatInput}
          </Text>
          <Input
            placeholder="•••••••"
            returnKeyType={'done'}
            secureTextEntry
            value={repeatPassword}
            onSubmitEditing={() => isValid && this._signUp()}
            invalid={!(password && password === repeatPassword)}
            ref={c => (this._repeatPassword = c)}
            onChangeText={value => {
              this._changeText('repeatPassword', value);
            }}
          />
          <Button
            black
            disabled={!loading && !isValid}
            title={localize[locale].signup_submit}
            onPress={this._signUp}
          />
          <Misc.TextLine text="və ya" size="medium" />
          <Button
            title={'Facebook ilə qeydiyytanda keç'}
            onPress={this._FBsignup}
            style={{ marginTop: 10 }}
            borderColor="#3b5998"
            facebook
          />
        </View>
        <StatusBar backgroundColor={colors.goblin} barStyle="light-content" />
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ user: { locale, loading, error, authenticated }, router }) => ({
  locale,
  loading,
  error,
  authenticated,
  router
});

const mapDispatchToProps = dispatch => ({
  onLoginCache: dispatcher => dispatch(dispatcher),
  onSignUp: (loginValue, password, fullname) =>
    dispatch(signup({ loginValue, password, fullname })),
  onRedirect: dispatcher => dispatch(dispatcher),
  onBack: () => dispatch({ type: 'Navigation/NAVIGATE', routeName: 'Login' }),
  onFacebookSignup: () => dispatch(facebookSignup()),  
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
