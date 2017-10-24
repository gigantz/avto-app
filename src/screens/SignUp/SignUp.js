import * as React from 'react';
import { Text, View, ScrollView, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import localize from "localize";
import { colors, theme, width } from 'style';
import Input from 'components/UI/Input';
import Button from 'components/UI/Button';
import Misc from 'components/UI/Misc';
import { validator, rules } from 'utils/validation';
import ua from 'ua-parser-js';
import AnimatedHeader, {style} from './AnimatedHeader';
import * as Animatable from 'react-native-animatable';
import Svg,{ Circle } from 'react-native-svg';

const { TextLine } = Misc;

console.log(ua());

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      fullname: '',
      password: '',
      repeatPassword: '',
      validation: {
        login: false,
        fullname: false,
        password: false,
        repeatPassword: false,
      }
    }
  }

  _changeText = (type, value) => {
    let loginProp;
    if(type === "login" && value && !value[0].match(/[9+]/gi)) {
      loginProp = "email";
    } else if(type === "login" && value && value[0].match(/[0-9+]/gi)) {
      loginProp = "phone";  
    }
    
    this.setState(prev => ({
      ...prev,
      loginProp,
      [type]: value,
      validation: { ...this.state.validation, ...{ [type]: validator(type, value) }}
    }));
  }

  _passwordFocus = () => {
    this.setState(prev => ({
      ...prev,
      password: '',
      repeatPassword: '',
      validation: { ...this.state.validation, ...{ password: false, repeatPassword: false }}
    }));
    
    this._repeatPassword.refs._inputText.clear();
    this._password.refs._inputText.clear();
  }

  _focusNext = input => {
    this[input].refs._inputText.focus();
  }

  _login = () => {
    this.props.onRedirect({
      type: "REDIRECT_TO_LOGIN",
      pathto: "Login"
    })
  }

  render() {
    const { locale, error, loading, authenticated } = this.props;
    const { login, fullname, password, repeatPassword, focused, validation, loginProp } = this.state;
    const isValid = validation && !Object.keys(validation).map(key => validation[key]).includes(false);
    const isMail = loginProp === "mail";

    return (
      <ScrollView contentContainerStyle={theme.base}>
        {/* {<AnimatedHeader _animatedHeader={ input => this.signupView = input } focused={focused} validation={validation} locale={locale} />} */}
        <View style={ [theme.footer, { top: 0 }] }>
          <Animatable.View animation="bounceInDown" style={{ position: 'absolute', right: 0, left: 0 }}>
          <TouchableOpacity style={{ flexDirection: 'row', padding: 20, alignSelf: 'center', top: -10 }} onPress={ this._login }>
            <Text style={ theme.footerText }>
              Artıq üzvümüzsən? 
            </Text>
            <Text style={ theme.footerTextLink }>
              Daxil ol
            </Text>
          </TouchableOpacity>
          <Svg
              height="100"
              width={width}
              style={{ position: 'absolute', zIndex: -1, top: 0, left: 0, right: 0, alignSelf: 'center', }}
          >
              <Circle
                  cx={width/2+5}
                  cy={-width+85}
                  r={width}
                  fill={ colors.goblin }
              />
          </Svg>
          </Animatable.View>
        </View>
        <View style={[theme.full, { backgroundColor: colors.white }]}>
          <Text style={theme.label}>{!loginProp ? localize[locale].loginInput : localize[locale][loginProp]}</Text>
          <Input
            placeholder={localize[locale].signup_email_phone}
            returnKeyType = {"next"}
            invalid={ !validation['login'] }
            keyboardType={ isMail ? "email-address" : "phone-pad"}
            value={login}
            onSubmitEditing={ () => this._focusNext('_fullname') }
            onChangeText={value => { this._changeText("login", value); }} />
          <Text style={theme.label}>{localize[locale].signup_fullname_label}</Text>
          <Input
            placeholder={localize[locale].signup_fullname}
            returnKeyType = {"next"}
            invalid={ !validation['fullname'] }
            ref={c => this._fullname = c}
            value={fullname}
            onSubmitEditing={ () => this._focusNext('_password') }
            onChangeText={value => { this._changeText("fullname", value); }} />
          <Text style={theme.label}>{localize[locale].passwordInput}</Text>
          <Input
            placeholder="•••••••"
            returnKeyType = {"next"}
            secureTextEntry
            value={password}
            onSubmitEditing={ () => this._focusNext('_repeatPassword') }
            invalid={ !validation['password'] }
            ref={c => this._password = c}
            onFocus={ this._passwordFocus }
            onChangeText={value => { this._changeText("password", value); }} />
          <Text style={theme.label}></Text>
          <Text style={theme.label}>{localize[locale].passwordRepeatInput}</Text>
          <Input
            placeholder="•••••••"
            returnKeyType = {"done"}
            secureTextEntry
            value={repeatPassword}
            onSubmitEditing={() => isValid && this._login()}
            invalid={ !(password && password === repeatPassword) }
            ref={c => this._repeatPassword = c}
            onChangeText={value => { this._changeText("repeatPassword", value); }} />
          <Text style={theme.label}></Text>
          <Button black disabled={!isValid} title={localize[locale].signup_submit} onPress={this._login} />
        </View>
        <StatusBar
        backgroundColor={colors.goblin}
        barStyle="light-content" />
      </ScrollView>
    )
  }
}

const mapStateToProps = ({ ui, user }) => ({
  page: ui.get('page'),
  authenticated: user.get('authenticated'),
  locale: user.get('locale') || 'az',
})

const mapDispatchToProps = (dispatch) => ({
  onLoginCache: (dispatcher) => dispatch(dispatcher),
  onSocket: (dispatcher) => dispatch(dispatcher),
  onRedirect: (dispatcher) => dispatch(dispatcher),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);